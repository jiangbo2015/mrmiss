import * as api from '@/apis/user';

export default {
    namespace: 'usercenter',
    state: {
        userinfo: {},
        userOrder: {
            shop: [],
            capsule: [],
        },
        myDiyOrder: [],
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
                userOrder: action.payload,
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
    },
};
