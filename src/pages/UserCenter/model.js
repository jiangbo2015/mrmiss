import * as api from '@/apis/user';
import * as businessApi from '@/apis/business';
import lodash from 'lodash';
export default {
    namespace: 'usercenter',
    state: {
        userinfo: {},
        userOrder: {
            shop: [],
            capsule: [],
        },
        myDiyOrder: [],
        editOrderGroupList: [],
        currentShopOrderData: [],
        currentOrder: {},
    },
    reducers: {
        setUserInfo(state, action) {
            return {
                ...state,
                userinfo: action.payload,
            };
        },
        setMyDiyOrder(state, action) {
            return {
                ...state,
                myDiyOrder: action.payload,
            };
        },
        setUserOrder(state, action) {
            return {
                ...state,
                userOrder: {
                    ...state.userOrder,
                    ...action.payload,
                },
            };
        },
        setCurrentOrder(state, action) {
            return {
                ...state,
                currentOrder: action.payload,
            };
        },
        setEditOrderGroupList(state, action) {
            return {
                ...state,
                editOrderGroupList: action.payload,
            };
        },
        setCurrentShopOrderData(state, action) {
            return {
                ...state,
                currentShopOrderData: action.payload,
            };
        },
    },
    effects: {
        *saveSetting({ payload }, { call, put }) {
            const { data } = yield call(api.saveSetting, payload);
            if (data) {
                yield put({
                    type: 'setUserInfo',
                    payload: data,
                });
                // history.push('/main');
            }
        },
        *fetchMyDiyOrder(_, { call, put }) {
            const { data } = yield call(api.getMyOrderList, { isSend: 1 });
            if (data) {
                yield put({
                    type: 'setMyDiyOrder',
                    payload: data,
                });
            }
        },
        *delMyDiyOrder({ payload }, { call, put }) {
            const { data } = yield call(api.delOrder, payload);
            if (data) {
                yield put({
                    type: 'fetchMyDiyOrder',
                });
            }
        },
        *getUserOrder(_, { call, put }) {
            const { data } = yield call(api.getCurrentUserOrder);
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setUserOrder',
                    payload: data,
                });
            }
        },
        *getUserShopOrder(_, { call, put }) {
            const { data } = yield call(api.getUserShopOrderList);
            if (data) {
                yield put({
                    type: 'setUserOrder',
                    payload: {
                        shop: data,
                    },
                });
            }
        },
        *getUserCapsuleOrder({ payload }, { call, put }) {
            const { data } = yield call(api.getUserCapsuleOrderList, payload);
            if (data) {
                yield put({
                    type: 'setUserOrder',
                    payload: {
                        capsule: data,
                    },
                });
            }
        },
        *delCapsuleOrder({ payload }, { call, put }) {
            const { data } = yield call(api.delCapsuleOrder, payload);
            if (data) {
                yield put({
                    type: 'getUserCapsuleOrder',
                    payload: {
                        isSend: 1,
                    },
                });
            }
        },
        *delShopOrder({ payload }, { call, put }) {
            const { data } = yield call(api.delShopOrder, payload);
            if (data) {
                yield put({
                    type: 'getUserShopOrder',
                });
            }
        },

        *createCurrentOrderToGroupList({ payload }, { call, put, select }) {
            const { selectFavoriteList, currentGood } = yield select(state => state.diy);
            let res = {};

            switch (payload.orderType) {
                case 'order':
                    {
                        res = yield call(businessApi.getOrderDetail, { _id: payload._id });
                    }
                    break;
                case 'capsule':
                    {
                        res = yield call(businessApi.getCapsuleOrderDetail, { _id: payload._id });
                    }
                    break;
                case 'shop':
                    {
                        res = yield call(businessApi.getShopOrderDetail, { _id: payload._id });
                    }
                    break;
            }
            // console.log('createCurrentOrderToGroupList', res);
            let saveOrder = [];
            if (res?.data?.children?.length > 0) {
                for (let i = 0; i < res.data.children.length; i++) {
                    const itemOrder = res.data.children[i];
                    const items = res.data.children[i].orderData.map(x => ({
                        ...x,
                        originId: itemOrder._id,
                        originNo: itemOrder.orderNo,
                    }));
                    saveOrder.push(...items);
                }
                // res?.data?.children
            }

            if (res?.data?.orderData?.length > 0) {
                for (let i = 0; i < res.data.orderData.length; i++) {
                    const itemOrderDate = res.data.orderData[i];
                    itemOrderDate.originId = res.data._id;
                    itemOrderDate.originNo = res.data.orderNo;
                    saveOrder.push(itemOrderDate);
                }
                // res?.data?.children
            }

            // const gourpByStyle = lodash.groupBy(selectFavoriteList, f => f.styleAndColor.map(sc => sc.style._id).join('-'));
            // // console.log('gourpByStyle', gourpByStyle);
            // for (var key in gourpByStyle) {
            //     let price = lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.price);
            //     let size = gourpByStyle[key][0].styleAndColor[0].size;
            //     let styleNos = gourpByStyle[key][0].styleAndColor.map(sc => sc.style.styleNo).join(',');

            //     gourpByStyle[key] = {
            //         list: gourpByStyle[key].map(x => ({ ...x, price: _.sumBy(x.styleAndColor, sc => sc.style.price) })),
            //         key,
            //         sizes: gourpByStyle[key][0].styleAndColor[0].style.size?.split('/'),
            //         weight: lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.weight),
            //         styleNos,
            //         price,
            //         size,
            //     };
            // }
            const saveItems = saveOrder?.map((o, k) => {
                let item = o.items[0];
                let key = `${k}-${item.favorite.styleAndColor
                    .map(sc => (sc.style?._id ? sc.styleId : sc.styleId._id))
                    .join('-')}`;
                // let sizeArr = item.favorite.styleAndColor[0].styleId.size?.split('/');
                let weight = lodash.sumBy(item.favorite.styleAndColor, sc =>
                    sc.style?._id ? sc.style?.weight : sc.styleId.weight,
                );
                // console.log('weight', weight);
                let sizeObjInit = {};
                // let sizeArr = [];
                // let size = Object.keys(item.sizeInfoObject);
                let sizeArr = Object.keys(item.sizeInfoObject)
                sizeArr?.map(s => {
                    sizeObjInit[s] = 0;
                });

                // // console.log('sizeObjInit', sizeObjInit);
                return {
                    list: o.items.map(i => {
                        // console.log('i.sizeInfoObject', i.sizeInfoObject)
                        return {
                        ...i.favorite,
                        parte: i.parte,
                        price: _.sum(i.favorite.styleAndColor.map(sc => (sc?.style?.price ? sc.style.price : sc.styleId.price))),
                        sizeInfoObject: i.sizeInfoObject ? i.sizeInfoObject : sizeObjInit,
                        styleAndColor: i.favorite.styleAndColor.map(sc => ({
                            colorIds: sc.colorIds.filter(c => c),
                            styleId: sc.style ? sc.style._id : sc.styleId._id,
                            style: sc.style ? sc.style : sc.styleId,
                        })),
                    }}),
                    key,
                    pickType: o.pickType,
                    rowRemarks: o.rowRemarks,
                    isSelect: false,
                    weight: weight ? weight : 0,
                    sizes: sizeArr,
                    styleNos: o.styleNos,
                    price: o.price,
                    size: o.size,
                    originId: o.originId,
                    originNo: o.originNo,
                };
            });

            yield put({
                type: 'setCurrentOrder',
                payload: payload,
            });
            yield put({
                type: 'setEditOrderGroupList',
                payload: saveItems,
            });
        },

        *createCurrentShopOrderToGroupList({ payload }, { call, put, select }) {
            const res = yield call(businessApi.getShopOrderDetail, { _id: payload._id });

            // console.log('createCurrentShopOrderToGroupList', res);
            let saveOrder = [];
            if (res?.data?.children?.length > 0) {
                for (let i = 0; i < res.data.children.length; i++) {
                    const itemOrder = res.data.children[i];
                    const items = res.data.children[i].orderData.map(x => ({
                        ...x,
                        originId: itemOrder._id,
                        originNo: itemOrder.orderNo,
                    }));
                    saveOrder.push(...items);
                }
                // res?.data?.children
            }

            if (res?.data?.orderData?.length > 0) {
                for (let i = 0; i < res.data.orderData.length; i++) {
                    const itemOrderDate = res.data.orderData[i];
                    itemOrderDate.originId = res.data._id;
                    itemOrderDate.originNo = res.data.orderNo;
                    saveOrder.push(itemOrderDate);
                }
                // res?.data?.children
            }

            // console.log('saveOrder', saveOrder);
            yield put({
                type: 'setCurrentOrder',
                payload: payload,
            });
            yield put({
                type: 'setCurrentShopOrderData',
                payload: saveOrder,
            });
        },
    },
};
