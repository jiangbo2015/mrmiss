import * as api from '@/apis/capsule';
// import { history } from 'umi';
import { message } from 'antd';

export default {
    namespace: 'capsule',
    state: {
        info: {},
        capsuleList: [],
        capsuleStyleList: { docs: [] },
        currentCapsule: {},
        currentSelectedBar: {},
        currentCapsuleStyle: {},
        editOrderSaveId: '',
        currentCapsuleTopStyleIndex: 0,
        currentCapsuleBottomStyleIndex: 0,
    },
    reducers: {
        setCurrentCapsuleTopStyleIndex(state, action) {
            return {
                ...state,
                currentCapsuleTopStyleIndex: action.payload,
            };
        },
        setCurrentCapsuleBottomStyleIndex(state, action) {
            return {
                ...state,
                currentCapsuleBottomStyleIndex: action.payload,
            };
        },
        setEditOrderSaveId(state, action) {
            return {
                ...state,
                editOrderSaveId: action.payload,
            };
        },
        setCapsuleList(state, action) {
            return {
                ...state,
                capsuleList: action.payload,
            };
        },
        setCapsuleStyleList(state, action) {
            return {
                ...state,
                capsuleStyleList: action.payload,
            };
        },
        setCurrentCapsule(state, action) {
            return {
                ...state,
                currentCapsule: action.payload,
            };
        },
        setCurrentSelectedBar(state, action) {
            return {
                ...state,
                currentSelectedBar: action.payload,
            };
        },
        setCurrentCapsuleStyle(state, action) {
            return {
                ...state,
                currentCapsuleStyle: action.payload,
            };
        },
        setCapsuleToOrderGroupList(state, action) {
            return {
                ...state,
                capsuleToOrderGroupList: action.payload,
            };
        },
        setCapsuleStyleTopAndBottomList(state, action) {
            return {
                ...state,
                capsuleStyleTopAndBottomList: action.payload,
            };
        },
        setCapsuleStyleAboutList(state, action) {
            return {
                ...state,
                capsuleStyleAboutList: action.payload,
            };
        },
    },
    effects: {
        *fetchCapsuleList(_, { call, put }) {
            const { data } = yield call(api.getCapsuleList, { status: 1 });
            // 登录成功，将token写入本地，并跳转到主体
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setCapsuleList',
                    payload: data,
                });
                yield put({
                    type: 'setCurrentCapsule',
                    payload: data[0],
                });
                yield put({
                    type: 'setCurrentSelectedBar',
                    payload: data[0],
                });
                // history.push('/main');
            }
        },
        *fetchCapsuleStyleList({ payload }, { call, put, select }) {
            const { data } = yield call(api.getCapsuleStyleList, payload);
            const { capsuleStyleList } = yield select(state => state.capsule);
            // 登录成功，将token写入本地，并跳转到主体
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setCapsuleStyleList',
                    payload: {
                        ...data,
                        page: parseInt(data.page),
                        docs: data.page == 1 ? data.docs : capsuleStyleList.docs.concat(data.docs),
                    },
                });
                // history.push('/main');
            }
        },
        *fetchCapsuleStyleAboutList({ payload }, { call, put, select }) {
            const { currentCapsuleStyle } = yield select(state => state.capsule);
            const { data } = yield call(api.getCapsuleStyleList, payload);
            if (data) {
                yield put({
                    type: 'setCapsuleStyleAboutList',
                    payload: data.docs.filter(x => x._id !== currentCapsuleStyle._id),
                });
                // history.push('/main');
            }
        },
        *fetchCapsuleStyleTopAndList({ payload }, { call, put, select }) {
            const { top, bottom } = payload;
            const resTop = yield call(api.getCapsuleStyleList, {
                capsule: top._id.split('-')[1],
                goodCategray: top.namecn,
                limit: 1000,
            });
            const resBottom = yield call(api.getCapsuleStyleList, {
                capsule: bottom._id.split('-')[1],
                goodCategray: bottom.namecn,
                limit: 1000,
            });
            if (resTop.data && resBottom.data) {
                yield put({
                    type: 'setCapsuleStyleTopAndBottomList',
                    payload: {
                        top: resTop.data.docs,
                        bottom: resBottom.data.docs,
                    },
                });
            }
        },
        *addOrder({ payload }, { call, put, select }) {
            const { editOrderSaveId } = yield select(state => state.capsule);
            let apiFun = api.addOrder;
            let data = payload;
            if (editOrderSaveId && !payload.isSend) {
                apiFun = api.updateOrder;
                data._id = editOrderSaveId;
            }
            const res = yield call(apiFun, data);
            if (res && res.data) {
                message.info('保存成功');
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *addOrderMark({ payload }, { call, put, select }) {
            // console.log('capsule/addOrder');
            let { currentCapsule, currentCapsuleStyle } = yield select(state => state.capsule);
            if (payload) {
                currentCapsuleStyle = payload;
            }
            const resOrder = yield call(api.getMyOrderList, { isSend: 0, capsuleId: currentCapsule._id });
            // console.log('currentCapsuleStyle', currentCapsuleStyle);
            let saveOrderData = {
                capsuleId: currentCapsule._id,
                orderData: [],
            };
            let editOrderSaveId = '';
            if (resOrder && Array.isArray(resOrder.data) && resOrder.data.length > 0) {
                editOrderSaveId = resOrder.data[0]._id;
                saveOrderData = resOrder.data[0];
            }

            saveOrderData.orderData = saveOrderData.orderData.concat([
                {
                    styleNos: currentCapsuleStyle.code,
                    price: currentCapsuleStyle.price,
                    size: currentCapsuleStyle.size,
                    items: currentCapsuleStyle.colorWithStyleImgs,
                },
            ]);
            // return;
            let apiFun = api.addOrder;
            // let data = payload;
            if (editOrderSaveId) {
                apiFun = api.updateOrder;
                saveOrderData._id = editOrderSaveId;
            }
            const res = yield call(apiFun, saveOrderData);
            if (res && res.data) {
                message.info('添加成功');
            }
        },
        *toDoOrder({ payload }, { call, put, select }) {
            const { currentCapsule } = yield select(state => state.capsule);
            const res = yield call(api.getMyOrderList, { isSend: 0, capsuleId: currentCapsule._id });
            let saveOrder = [];
            if (res && Array.isArray(res.data) && res.data.length > 0) {
                console.log('data', res.data);
                yield put({
                    type: 'setEditOrderSaveId',
                    payload: res.data[0]._id,
                });
                saveOrder = res.data[0].orderData;
            } else {
                yield put({
                    type: 'setEditOrderSaveId',
                    payload: '',
                });
            }

            const saveItems = saveOrder.map((o, k) => {
                let item = o.items[0];
                let now = new Date();
                let key = `${now.getTime()}-${o.styleNos}`;
                let sizeArr = [];
                let price = _.sumBy(item.favorite.styleAndColor, x => x.styleId.price);
                if (item.type) {
                    sizeArr = item.favorite.styleAndColor[0].styleId.size?.split('/')
                        ? item.favorite.styleAndColor[0].styleId.size?.split('/')
                        : [];
                } else {
                    sizeArr = o.size ? o.size?.split('/') : [];
                }

                let sizeObjInit = {};
                sizeArr?.map(s => {
                    sizeObjInit[s] = 0;
                });
                return {
                    list: o.items.map(i => ({
                        _id: i._id,
                        ...i.favorite,
                        favoriteObj: i.favorite,
                        parte: i.parte,
                        type: i.type ? 'favorite' : 'img',
                        imgs: i.imgs,
                        price: o.price,
                        sizeInfoObject: i.sizeInfoObject ? i.sizeInfoObject : sizeObjInit,
                        styleAndColor: i.type
                            ? i.favorite.styleAndColor.map(sc => ({
                                  colorIds: sc.colorIds,
                                  styleId: sc.styleId._id,
                                  style: sc.styleId,
                              }))
                            : [
                                  {
                                      colorIds: i.colorObj ? [i.colorObj] : [],
                                      style: { styleNo: key },
                                  },
                              ],
                    })),
                    key,
                    styleNos: o.styleNos,
                    price: o.price,
                    size: o.size,
                    weight: o.weight ? o.weight : 0,
                    pickType: o.pickType,
                    rowRemarks: o.rowRemarks,
                    isSelect: false,
                    sizes: sizeArr,
                };
            });
            yield put({
                type: 'setCapsuleToOrderGroupList',
                payload: saveItems,
            });
        },
    },
};
