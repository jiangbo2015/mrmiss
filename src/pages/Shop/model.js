import * as api from '@/apis/shop';
// import { history } from 'umi';
import { message } from 'antd';

export default {
    namespace: 'shop',
    state: {
        info: {},
        branchList: [],
        shopStyleList: { docs: [] },
        currentBranch: {},
        currentSelectedBar: {},
        currentShopStyle: {},
        myShopCartList: [],
    },
    reducers: {
        setBranchList(state, action) {
            return {
                ...state,
                branchList: action.payload,
            };
        },
        setCurrentSelectedBar(state, action) {
            return {
                ...state,
                currentSelectedBar: action.payload,
            };
        },
        setCurrentBranch(state, action) {
            return {
                ...state,
                currentBranch: action.payload,
            };
        },
        setCurrentShopStyle(state, action) {
            return {
                ...state,
                currentShopStyle: action.payload,
            };
        },
        setShopStyleList(state, action) {
            return {
                ...state,
                shopStyleList: action.payload,
            };
        },
        setMyShopCartList(state, action) {
            return {
                ...state,
                myShopCartList: action.payload,
            };
        },
    },
    effects: {
        *fetchBranchList(_, { call, put }) {
            const { data } = yield call(api.getBranchList);
            // 登录成功，将token写入本地，并跳转到主体
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setBranchList',
                    payload: data,
                });
                yield put({
                    type: 'setCurrentBranch',
                    payload: data[0],
                });
                yield put({
                    type: 'setCurrentSelectedBar',
                    payload: data[0],
                });
                // history.push('/main');
            }
        },
        *fetchShopStyleList({ payload }, { call, put }) {
            const { data } = yield call(api.getShopStyleList, payload);
            const { shopStyleList } = yield select(state => state.shop);
            // 登录成功，将token写入本地，并跳转到主体
            if (data) {
                // localStorage.token = data.token;
                yield put({
                    type: 'setShopStyleList',
                    payload: {
                        ...data,
                        page: parseInt(data.page),
                        docs: data.page == 1 ? data.docs : shopStyleList.docs.concat(data.docs),
                    },
                });
                // history.push('/main');
            }
        },
        *fetchMyShopCart({ payload }, { call, put }) {
            console.log('******fetchMyShopCart');
            const res = yield call(api.getMyShopCart, payload);
            if (res && res.data) {
                yield put({
                    type: 'setMyShopCartList',
                    payload: res.data,
                });
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *addShopCart({ payload }, { call, put, select }) {
            const res = yield call(api.addShopCart, payload);
            if (res && res.data) {
                message.info('已为您添加到购购物车');
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *addShopOrder({ payload }, { call, put, select }) {
            const res = yield call(api.addOrder, payload);
            if (res && res.data) {
                message.info('下单成功');
            }
            // { styleAndColor: params, goodId: goodId }
        },

        *updateShopCart({ payload }, { call, put, select }) {
            if (payload.count <= 0) {
                message.info('不能更少了～');
                return;
            }
            const res = yield call(api.updateShopCart, payload);
            if (res && res.data) {
                // message.info('已为您添加到购购物车');
                yield put({
                    type: 'fetchMyShopCart',
                });
            }
            // { styleAndColor: params, goodId: goodId }
        },
    },
};
