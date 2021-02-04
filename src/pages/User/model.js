import * as api from '@/apis/user';
// import { history } from 'umi';
import { message } from 'antd';

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
            // console.log('登录成功，将token写入本地，并跳转到主体');
            const { data } = yield call(api.login, payload);
            // 登录成功，将token写入本地，并跳转到主体
            if (data && data.token) {
                localStorage.token = data.token;
                yield put({
                    type: 'setInfo',
                    payload: data,
                });
                // history.push('/main');
            }
        },
        *feedback({ payload }, { call, put }) {
            const { data } = yield call(api.feedback, payload);
            if (data) {
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
            const { data } = yield call(api.getCurrentUser);
            // 登录成功，将token写入本地，并跳转到主体
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setInfo',
                    payload: data,
                });

                // history.push('/main');
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
