export default {
    namespace: 'user',
    state: {
        info: {},
    },
    reducers: {
        setInfo(state, action) {
            return {
                ...state,
                info: action.payload,
            };
        },
    },
    effects: {
        *setUserInfo({ payload }, { put }) {
            yield put({
                type: 'setInfo',
                payload,
            });
        },
        *logout() {
            // 删除token
            localStorage.clear();
        },
    },
};
