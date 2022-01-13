import * as api from '@/apis/shop';
// import { history } from 'umi';
import { message } from 'antd';

export default {
    namespace: 'shop',
    state: {
        info: {},
        branchList: [],
        shopStyleList: { docs: [] },
        currentBranch: { children: [] },
        currentSelectedBar: {},
        currentShopStyle: {},
        currentShopTopStyleIndex: 0,
        currentShopBottomStyleIndex: 0,
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
        setShopStyleAboutList(state, action) {
            return {
                ...state,
                shopStyleAboutList: action.payload,
            };
        },
        setShopStyleTopAndBottomList(state, action) {
            return {
                ...state,
                shopStyleTopAndBottomList: action.payload,
            };
        },
        setMyShopCartList(state, action) {
            return {
                ...state,
                myShopCartList: action.payload,
            };
        },
        setOriginMyShopCartList(state, action) {
            return {
                ...state,
                originMyShopCartList: action.payload,
            };
        },
        setCurrentShopKey(state, action) {
            return {
                ...state,
                currentShopKey: action.payload,
            };
        },
        setCurrentShopTopStyleIndex(state, action) {
            return {
                ...state,
                currentShopTopStyleIndex: action.payload,
            };
        },
        setCurrentShopBottomStyleIndex(state, action) {
            return {
                ...state,
                currentShopBottomStyleIndex: action.payload,
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
        *fetchShopStyleList({ payload }, { call, put, select }) {
            const { data } = yield call(api.getShopStyleList, payload);
            const { shopStyleList } = yield select(state => state.shop);

            if (data) {
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
        *fetchShopStyleAboutList({ payload }, { call, put, select }) {
            const { currentShopStyle } = yield select(state => state.shop);
            const { data } = yield call(api.getShopStyleList, payload);
            if (data) {
                yield put({
                    type: 'setShopStyleAboutList',
                    payload: data.docs.filter(x => x._id !== currentShopStyle._id),
                });
                // history.push('/main');
            }
        },
        *fetchShopStyleTopAndList({ payload }, { call, put, select }) {
            const topAndBottomMap = payload;
            console.log('topAndBottomMap',topAndBottomMap)
            const topAndBottomData = {};
            for (const key in topAndBottomMap) {
                const { top, bottom } = topAndBottomMap[key];
                if (top && bottom) {
                    const resTop = yield call(api.getShopStyleList, { branch: top.branch, goodCategoryId: top._id, limit: 1000 });
                    const resBottom = yield call(api.getShopStyleList, {
                        branch: bottom.branch,
                        goodCategoryId: bottom._id,
                        limit: 1000,
                    });

                    topAndBottomData[key] = {
                        top: resTop.data.docs,
                        bottom: resBottom.data.docs,
                    };
                }
            }

            if (Object.keys(topAndBottomData).length > 0) {
                yield put({
                    type: 'setShopStyleTopAndBottomList',
                    payload: topAndBottomData,
                });
            }
        },
        *fetchMyShopCart({ payload }, { call, put }) {
            // console.log('******fetchMyShopCart');
            const res = yield call(api.getMyShopCart, payload);
            if (res && Array.isArray(res.data)) {
                yield put({
                    type: 'setMyShopCartList',
                    payload: res.data.filter(x => x.shopStyle),
                });
                yield put({
                    type: 'setOriginMyShopCartList',
                    payload: res.data.filter(x => x.shopStyle),
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
            const { myShopCartList } = yield select(state => state.shop);
            const item = myShopCartList.find(x => x._id === payload._id);
            if (!item) {
                return;
            }
            if (payload.count) {
                item.count = payload.count;
                yield put({
                    type: 'setMyShopCartList',
                    payload: [...myShopCartList],
                });
            } else if (payload.isDel) {
                item.isDel = 1;
                yield put({
                    type: 'setMyShopCartList',
                    payload: [...myShopCartList],
                });
            }

            // { styleAndColor: params, goodId: goodId }
        },
        *updateShopCartToOrigin({ payload }, { call, put, select }) {
            const { myShopCartList, originMyShopCartList } = yield select(state => state.shop);
            let patchs = [];
            for (let i = 0; i < myShopCartList.length; i++) {
                if (myShopCartList[i].isDel) {
                    patchs.push({
                        isDel: 1,
                        _id: myShopCartList[i]._id,
                    });
                } else if (myShopCartList[i].count !== originMyShopCartList[i].count) {
                    // console.log('myShopCartList[i].count', myShopCartList[i].count)
                    patchs.push({
                        count: myShopCartList[i].count,
                        _id: myShopCartList[i]._id,
                    });
                }
            }
            for (let i = 0; i < patchs.length; i++) {
                yield call(api.updateShopCart, patchs[i]);
            }
            yield put({
                type: 'fetchMyShopCart',
            });
        },
        *updateOrder({ payload }, { call, put, select }) {
            const res = yield call(api.updateShopOrder, payload);
            if (res && res.data) {
                message.info('更新成功');
            }
            // { styleAndColor: params, goodId: goodId }
        },
    },
};
