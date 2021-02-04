import * as api from '@/apis/home';

export default {
    namespace: 'home',
    state: {
        list: [],
        systemDetail: {},
    },
    reducers: {
        setSystemDetail(state, action) {
            return {
                ...state,
                systemDetail: action.payload,
            };
        },
    },
    effects: {
        *init(_, { call, put }) {
            const res = yield call(api.getSystemDetail);
            if (res && Array.isArray(res.data) && res.data.length > 0) {
                yield put({
                    type: 'setSystemDetail',
                    payload: res.data[0],
                });
            }
        },
    },
};
