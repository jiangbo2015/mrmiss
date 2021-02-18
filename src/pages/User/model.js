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
                location.reload();
            }
        },
        *feedback({ payload }, { call, put }) {
            const { data } = yield call(api.feedback, payload);
            if (data) {
                console.log('发送成功');
            }
        },
        *changePwd({ payload }, { call, put }) {
            const { data } = yield call(api.changePwd, payload);
            if (data) {
                localStorage.token = null;

                console.log('发送成功');
            }
        },
        *update({ payload }, { call, put }) {
            const { data } = yield call(api.update, payload);
            if (data) {
                console.log('发送成功');
            }
        },
        *getCurrentUser(_, { call, put }) {
            try {
                const { data } = yield call(api.getCurrentUser);
                // 登录成功，将token写入本地，并跳转到主体
                if (data) {
                    // localStorage.token = data.token;
                    let lastLevel = data.role === 1 ? '产品代理' : '客户';
                    yield put({
                        type: 'setInfo',
                        payload: { ...data, lastLevel },
                    });

                    // history.push('/main');
                }
            } catch (e) {
                console.log(e);
            }
        },
        *logout(_, { call, put }) {
            yield put({
                type: 'setInfo',
                payload: {},
            });
            // 删除token
            localStorage.clear();
            history.push('/');
            window.location.reload();
        },
    },
};
