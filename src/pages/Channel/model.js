import * as api from '@/apis/channel';
// import { history } from 'umi';
import { message } from 'antd';

export default {
    namespace: 'channel',
    state: {
        currentAdminChannel: {},
        myAdminChannelList: [], //我管理的通道列表
        myChannelList: [], //我被分配的通道列表
    },
    reducers: {
        setCurrentChannel(state, action) {
            return {
                ...state,
                currentAdminChannel: action.payload,
            };
        },
        setMyAdminChannelList(state, action) {
            return {
                ...state,
                myAdminChannelList: action.payload,
            };
        },
    },
    effects: {
        *update({ payload }, { call, put }) {
            console.log(' channel update');
            const { data } = yield call(api.update, payload);
            if (data) {
                // console.log('发送成功');
            }
        },
        *fetchMyAdminChannelList({ payload }, { call, put }) {
            const { data } = yield call(api.getMyAdminChannel, payload);
            if (data) {
                // console.log('发送成功');
                yield put({
                    type: 'setMyAdminChannelList',
                    payload: data,
                });
            }
        },
    },
};
