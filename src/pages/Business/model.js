import * as api from '@/apis/business';
import { IdcardFilled } from '@ant-design/icons';
import { message } from 'antd';
import lodash from 'lodash';
import defaultData from './defaultData';

export default {
    namespace: 'business',
    state: {
        customerList: defaultData.customerList,
        currentCustomer: { channels: [] },
        channelEmpowerInfo: defaultData.channelEmpowerInfo,
        currentCustomerEmpowerInfo: defaultData.currentCustomerEmpowerInfo,
        ownOrderList: {},
        currentOrder:{},
        editOrderGroupList: [],
        currentShopOrderData: []
    },
    reducers: {
        setCustomerList(state, action) {
            return {
                ...state,
                customerList: action.payload,
            };
        },
        setCurrentCustomer(state, action) {
            return {
                ...state,
                currentCustomer: action.payload,
            };
        },
        setOwnOrderList(state, action) {
            return {
                ...state,
                ownOrderList: action.payload,
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
        setUnReadedNum(state, action) {
            return {
                ...state,
                unReadedNum: action.payload,
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
        *getMyCustomer({ payload }, { call, put }) {
            // console.log('登录成功，将token写入本地，并跳转到主体');
            // const { data } = yield call(api.login, payload);
            // 登录成功，将token写入本地，并跳转到主体
            const { data } = yield call(api.getCustomerUser, payload);
            const res = yield call(api.getOwnUnReadedOrder);
            const upreadData = res.data;
            const userUnReadMap = {}
            if(upreadData){
                const unReadedNum = upreadData.order.length + upreadData.capsuleOrder.length + upreadData.shopOrder.length
                
                for(let i = 0 ; i<upreadData.order.length; i++){
                    const itemOrder = upreadData.order[i]
                    if(userUnReadMap[itemOrder.user]){
                        userUnReadMap[itemOrder.user] += 1;
                    }else {
                        userUnReadMap[itemOrder.user] = 1
                    }
                }

                for(let i = 0 ; i<upreadData.capsuleOrder.length; i++){
                    const itemOrder = upreadData.capsuleOrder[i]
                    if(userUnReadMap[itemOrder.user]){
                        userUnReadMap[itemOrder.user] += 1;
                    }else {
                        userUnReadMap[itemOrder.user] = 1
                    }
                }

                for(let i = 0 ; i<upreadData.shopOrder.length; i++){
                    const itemOrder = upreadData.shopOrder[i]
                    if(userUnReadMap[itemOrder.user]){
                        userUnReadMap[itemOrder.user] += 1;
                    }else {
                        userUnReadMap[itemOrder.user] = 1
                    }
                }
                if (data) {
                    yield put({
                        type: 'setUnReadedNum',
                        payload: unReadedNum,
                    });
                    // history.push('/main');
                }
            }

            if (data) {
                yield put({
                    type: 'setCustomerList',
                    payload: data.map(d => ({
                        ...d,
                        unReadedNum: userUnReadMap[d._id]
                    })),
                });
                // history.push('/main');
            }
        },
        *getOwnOrderList({ payload }, { call, put }) {
            const { data } = yield call(api.getOwnOrderList, payload);
            if (data) {
                yield put({
                    type: 'setOwnOrderList',
                    payload: data,
                });
            }
        },

        *addUser({ payload }, { call, put }) {
            const { success, message: msg } = yield call(api.addUser, payload);
            if (success) {
                yield put({
                    type: 'getMyCustomer',
                    // payload: defaultData.customerList,
                });
                return true;
            } else {
                message.error(msg);
            }
        },
        *delMyCustomer({ payload }, { call, put }) {
            const { success, message: msg } = yield call(api.delOwnUser, payload);
            if (success) {
                yield put({
                    type: 'getMyCustomer',
                });
                return true;
            } else {
                message.error(msg);
            }
        },
        *delOwnOrder({ payload }, { call, put }) {
            const { success, message: msg } = yield call(api.delOwnOrder, payload);
            if (success) {
                yield put({
                    type: 'getOwnOrderList',
                });
                return true;
            } else {
                message.error(msg);
            }
        },
        *updateUsers({ payload }, { call, put }) {
            const { success, message: msg } = yield call(api.updateUsers, payload);
            if (success) {
                yield put({
                    type: 'getMyCustomer',
                });
                return true;
            } else {
                message.error(msg);
            }
        },
        *mergeOwnOrder({ payload }, { call, put }) {
            const {selectedRows} = payload
            const orderMap = lodash.groupBy(selectedRows, 'orderType')
            const orderTypes = Object.keys(orderMap)
            console.log('orderMap', orderMap)
            for(let i = 0;i<orderTypes.length;i++){
                const k = orderTypes[i];
                switch(k){
                    case 'order': {
                        const { success, message: msg } = yield call(api.mergeOrder, {children:orderMap[k],isSend:1});
                        if (success) {
                            
                        } else {
                            message.error(msg);
                        }
                    }break;
                    case 'capsule': {
                        const { success, message: msg } = yield call(api.mergeCapsuleOrder, {children:orderMap[k],isSend:1});
                        if (success) {
                          
                        } else {
                            message.error(msg);
                        }
                    }break;
                    case 'shop': {
                        const { success, message: msg } = yield call(api.mergeShopOrder, {children:orderMap[k],isSend:1});
                        if (success) {
                           
                        } else {
                            message.error(msg);
                        }
                    }break;
                }
            }
            return true;
            
        },
        *createCurrentOrderToGroupList({ payload }, { call, put, select }) {
            const { selectFavoriteList, currentGood } = yield select(state => state.diy);
            let res = {}
            
            switch(payload.orderType){
                case 'order': {
                    res = yield call(api.getOrderDetail, { _id: payload._id });
                } break;
                case 'capsule':{
                    res = yield call(api.getCapsuleOrderDetail, { _id: payload._id});
                } break;
                case 'shop':{
                    res = yield call(api.getShopOrderDetail, { _id: payload._id });
                } break;
            }
            console.log('createCurrentOrderToGroupList', res)
            let saveOrder = [];
            if(res?.data?.children?.length>0){
                for(let i = 0; i < res.data.children.length; i ++){
                    const itemOrder = res.data.children[i]
                    const items = res.data.children[i].orderData.map(x => ({
                        ...x,
                        originId: itemOrder._id,
                        originNo: itemOrder.orderNo
                    }))
                    saveOrder.push(...items)
                }
                // res?.data?.children
            }

            if(res?.data?.orderData?.length>0){
                for(let i = 0; i < res.data.orderData.length; i ++){
                    const itemOrderDate = res.data.orderData[i]
                    itemOrderDate.originId = res.data._id;
                    itemOrderDate.originNo = res.data.orderNo;
                    saveOrder.push(itemOrderDate)
                }
                // res?.data?.children
            }
            
    

            const gourpByStyle = lodash.groupBy(selectFavoriteList, f => f.styleAndColor.map(sc => sc.style._id).join('-'));
            console.log('gourpByStyle', gourpByStyle);
            for (var key in gourpByStyle) {
                let price = lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.price);
                let size = gourpByStyle[key][0].styleAndColor[0].size;
                let styleNos = gourpByStyle[key][0].styleAndColor.map(sc => sc.style.styleNo).join(',');

                gourpByStyle[key] = {
                    list: gourpByStyle[key].map(x => ({ ...x, price: _.sumBy(x.styleAndColor, sc => sc.style.price) })),
                    key,
                    sizes: gourpByStyle[key][0].styleAndColor[0].style.size?.split('/'),
                    weight: lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.weight),
                    styleNos,
                    price,
                    size,
                };
            }
            const saveItems = saveOrder?.map((o, k) => {
                let item = o.items[0];
                let key = `${k}-${item.favorite.styleAndColor.map(sc => sc.style?._id ? sc.styleId : sc.styleId._id).join('-')}`;
                // let sizeArr = item.favorite.styleAndColor[0].styleId.size?.split('/');
                let weight = lodash.sumBy(item.favorite.styleAndColor, sc => sc.style?._id ? sc.style?.weight : sc.styleId.weight);
                console.log('weight', weight);
                let sizeObjInit = {};
                let sizeArr = [];
                // sizeArr?.map(s => {
                //     sizeObjInit[s] = 0;
                // });

              
                sizeArr = sizeArr = o.size ? o.size?.split('/') : [];
               
                // console.log('sizeObjInit', sizeObjInit);
                return {
                    list: o.items.map(i => ({
                        ...i.favorite,
                        parte: i.parte,
                        price: _.sum(i.favorite.styleAndColor.map(sc => sc?.style?.price ? sc.style.price : sc.styleId.price)),
                        sizeInfoObject: i.sizeInfoObject ? i.sizeInfoObject : sizeObjInit,
                        styleAndColor: i.favorite.styleAndColor.map(sc => ({
                            colorIds: sc.colorIds,
                            styleId: sc.style ? sc.style._id : sc.styleId._id,
                            style: sc.style ? sc.style : sc.styleId,
                        })),
                    })),
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
                    originNo: o.originNo
                };
            });
            
            yield put({
                type: 'setCurrentOrder',
                payload: payload,
            });
            yield put({
                type: 'setEditOrderGroupList',
                payload: Object.values(gourpByStyle).concat(saveItems),
            });
        },
        *createCurrentShopOrderToGroupList({ payload }, { call, put, select }) {
            
            const res = yield call(api.getShopOrderDetail, { _id: payload._id });
            
            
            console.log('createCurrentShopOrderToGroupList', res)
            let saveOrder = [];
            if(res?.data?.children?.length>0){
                for(let i = 0; i < res.data.children.length; i ++){
                    const itemOrder = res.data.children[i]
                    const items = res.data.children[i].orderData.map(x => ({
                        ...x,
                        originId: itemOrder._id,
                        originNo: itemOrder.orderNo
                    }))
                    saveOrder.push(...items)
                }
                // res?.data?.children
            }

            if(res?.data?.orderData?.length>0){
                for(let i = 0; i < res.data.orderData.length; i ++){
                    const itemOrderDate = res.data.orderData[i]
                    itemOrderDate.originId = res.data._id;
                    itemOrderDate.originNo = res.data.orderNo;
                    saveOrder.push(itemOrderDate)
                }
                // res?.data?.children
            }
        
            console.log('saveOrder', saveOrder)
            yield put({
                type: 'setCurrentOrder',
                payload: payload,
            });
            yield put({
                type: 'setCurrentShopOrderData',
                payload: saveOrder,
            });
        },
        *updateShopOrderData({ payload }, { call, put, select }) {
            const { currentShopOrderData = [] } = yield select(state => state.business);
          
            const changedIndex = currentShopOrderData.findIndex(x => x._id === payload._id)
            if(changedIndex>=0){
                if(payload.isDel){
                    currentShopOrderData.splice(changedIndex,1)
                }
                if(payload.count){
                    currentShopOrderData[changedIndex].count = payload.count
                }
                yield put({
                    type: 'setCurrentShopOrderData',
                    payload: [...currentShopOrderData],
                });
            }


        },
    },
};
