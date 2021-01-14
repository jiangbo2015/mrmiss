import defaultData from './defaultData';

export default {
    namespace: 'diy',
    state: {
        currentStyle: defaultData.styleList.docs[0],
        colorList: defaultData.colorList,
        flowerList: defaultData.flowerList,
        styleList: defaultData.styleList,
        collocationPattern: 'single', //搭配模式 single:单一模式；multiple:多个模式；paintPrew:花布大图模式
        collocationBg: false, //搭配背景 false:black|true:white
    },
    reducers: {
        setStyleList(state, action) {
            return {
                ...state,
                styleList: action.payload,
            };
        },
        setCollocationPattern(state, action) {
            return {
                ...state,
                collocationPattern: action.payload,
            };
        },
        setCollocationBg(state, action) {
            return {
                ...state,
                collocationBg: action.payload,
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
