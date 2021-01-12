import defaultData from './defaultData';

export default {
    namespace: 'diy',
    state: {
        colorList: defaultData.colorList,
        flowerList: defaultData.flowerList,
        styleList: defaultData.styleList,
    },
    reducers: {
        setStyleList(state, action) {
            return {
                ...state,
                styleList: action.payload,
            };
        },
    },
    effects: {
        *fetchStyleList({ payload }, { call, put, select }) {
            const { styleList = { docs: [] } } = yield select(
                state => state.diy,
            );
            // console.log('originData', originData);
            // if (!originData) return;

            yield put({
                type: 'setStyleList',
                payload: {
                    ...defaultData.styleList,
                    docs: [...styleList.docs, ...defaultData.styleList.docs],
                },
            });
        },
    },
};
