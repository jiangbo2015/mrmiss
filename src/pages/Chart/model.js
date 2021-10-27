import * as api from '@/apis/chart';

export default {
    namespace: 'chart',
    state: {
        capsuleData: {
            orderRank: [],
            styleRank: [],
            userRank: [],
            capsuleRank: [],
        },
        shopData: {
            orderRank: [],
            styleRank: [],
            userRank: [],
        },
        diyData: {
            orderRank: [],
            styleRank: [],
            userRank: [],
            colorRank: { color: [], img: [] },
        },
    },
    reducers: {
        setData(state, action) {
            return {
                ...state,
                [action.category]: {
                    ...action.payload,
                },
            };
        },
    },
    effects: {
        *getCapsuleData({ payload }, { call, put }) {
            const [order, style, user, capsule] = yield [
                call(api.capsuleOrderRank, payload),
                call(api.capsuleStyleRank, payload),
                call(api.capsuleUserRank, payload),
                call(api.capsuleCapsuleRank, payload),
            ];
            yield put({
                type: 'setData',
                category: 'capsuleData',
                payload: {
                    orderRank: order.data || [],
                    styleRank: style.data || [],
                    userRank: user.data || [],
                    capsuleRank: capsule.data || [],
                },
            });
        },
        *getShopData({ payload }, { call, put }) {
            const [order, style, user] = yield [
                call(api.shopOrderRank, payload),
                call(api.shopStyleRank, payload),
                call(api.shopUserRank, payload),
            ];
            yield put({
                type: 'setData',
                category: 'shopData',
                payload: {
                    orderRank: order.data || [],
                    styleRank: style.data || [],
                    userRank: user.data || [],
                },
            });
        },
        *getDiyData({ payload }, { call, put }) {
            const [order, style, user, color] = yield [
                call(api.diyOrderRank, payload),
                call(api.diyStyleRank, payload),
                call(api.diyUserRank, payload),
                call(api.diyColorRank, payload),
            ];
            yield put({
                type: 'setData',
                category: 'diyData',
                payload: {
                    orderRank: order.data || [],
                    styleRank: style.data || [],
                    userRank: user.data || [],
                    colorRank: color.data || [],
                },
            });
        },
    },
};
