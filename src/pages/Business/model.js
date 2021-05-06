import * as api from '@/apis/business';
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
    },
    effects: {
        *getMyCustomer({ payload }, { call, put }) {
            // console.log('登录成功，将token写入本地，并跳转到主体');
            // const { data } = yield call(api.login, payload);
            // 登录成功，将token写入本地，并跳转到主体
            const { data } = yield call(api.getCustomerUser, payload);
            const { upreadData } = yield call(api.getOwnUnReadedOrder);
            if (data) {
                yield put({
                    type: 'setCustomerList',
                    payload: data,
                });
                // history.push('/main');
            }
            console.log('upreadData', upreadData);
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
            yield put({
                type: 'getOwnOrderList',
            });
            return true;
            
        },
    },
};
