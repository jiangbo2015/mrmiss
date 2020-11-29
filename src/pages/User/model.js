import * as api from '@/apis/user';
import { history } from 'umi';

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
        *login({ payload }, { call, put }) {
            const { data } = yield call(api.login, payload);
            // 登录成功，将token写入本地，并跳转到主体
            if (data && data.token) {
                localStorage.token = data.token;
                yield put({
                    type: 'setInfo',
                    payload: data,
                });
                history.push('/main');
            }
        },
        *logout() {
            yield put({
                type: 'setInfo',
                payload: {},
            });
            // 删除token
            localStorage.clear();
        },
    },
};
