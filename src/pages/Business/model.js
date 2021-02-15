import * as api from '@/apis/business';
import { message } from 'antd';
import defaultData from './defaultData';

export default {
    namespace: 'business',
    state: {
        customerList: defaultData.customerList,
        currentCustomer: defaultData.currentCustomer,
        channelEmpowerInfo: defaultData.channelEmpowerInfo,
        currentCustomerEmpowerInfo: defaultData.currentCustomerEmpowerInfo,
    },
    reducers: {
        setCustomerList(state, action) {
            return {
                ...state,
                customerList: action.payload,
            };
        },
    },
    effects: {
        *addUser({ payload }, { call, put }) {
            // if currentUser.role === 1, payload.role=3
            // if currentUser.role === 3, payload.role=4
        },
        *getMyCustomer({ payload }, { call, put }) {
            // console.log('登录成功，将token写入本地，并跳转到主体');
            // const { data } = yield call(api.login, payload);
            // 登录成功，将token写入本地，并跳转到主体
            const { data } = yield call(api.getCustomerUser, payload);
            if (data) {
                yield put({
                    type: 'setCustomerList',
                    payload: data,
                });
                // history.push('/main');
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
    },
};
