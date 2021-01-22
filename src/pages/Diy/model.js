import defaultData from './defaultData';
import lodash from 'lodash';

export default {
    namespace: 'diy',
    state: {
        currentStyle: defaultData.styleList.docs[0],
        colorList: defaultData.colorList,
        flowerList: defaultData.flowerList,
        styleList: defaultData.styleList,
        collocationPattern: 'single', //搭配模式 single:单一模式；multiple:多个模式；paintPrew:花布大图模式
        collocationBg: false, //搭配背景 false:black|true:white
        selectColorList: [],
        selectStyleList: [],
        favoriteArr: defaultData.favoriteArr,
        favoritePattern: 'middle', //  large, middle, small
        selectFavoriteList: [],
        favoriteToOrderGroupList: [],
    },
    reducers: {
        setFavoriteToOrderGroupList(state, action) {
            console.log('setFavoriteToOrderGroupList', action);
            return {
                ...state,
                favoriteToOrderGroupList: action.payload,
            };
        },
        setFavoritePattern(state, action) {
            console.log('setFavoritePattern', action);
            return {
                ...state,
                favoritePattern: action.payload,
            };
        },
        setFavoriteArr(state, action) {
            return {
                ...state,
                favoriteArr: action.payload,
            };
        },
        setStyleList(state, action) {
            return {
                ...state,
                styleList: action.payload,
            };
        },
        setColorAndFlowerList(state, action) {
            return {
                ...state,
                colorList: action.payload.colorList,

                flowerList: action.payload.flowerList,
            };
        },
        setSelectColorList(state, action) {
            // if()

            return {
                ...state,
                selectColorList: action.payload,
            };
        },
        setSelectStyleList(state, action) {
            // if()

            return {
                ...state,
                selectStyleList: action.payload,
            };
        },
        setSelectFavoriteList(state, action) {
            // if()

            return {
                ...state,
                selectFavoriteList: action.payload,
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
        *toogleSelectColor({ payload }, { call, put, select }) {
            const {
                colorList = { docs: [] },
                flowerList = { docs: [] },
                selectColorList,
            } = yield select(state => state.diy);
            const { item, index } = payload;
            let newValue = [];

            console.log('selectColorList', item);
            const findSelectIndex = selectColorList.findIndex(
                x => x._id == item._id,
            );

            console.log('findSelectIndex', findSelectIndex);
            if (findSelectIndex >= 0) {
                newValue = [...selectColorList];
                newValue.splice(findSelectIndex, 1);
                if (item.type) {
                    flowerList.docs[index].isSelected = false;
                } else {
                    colorList.docs[index].isSelected = false;
                }
            } else {
                newValue = [...selectColorList, item];
                if (item.type) {
                    flowerList.docs[index].isSelected = true;
                } else {
                    colorList.docs[index].isSelected = true;
                }
            }

            yield put({
                type: 'setSelectColorList',
                payload: newValue,
            });
            yield put({
                type: 'setColorAndFlowerList',
                payload: {
                    colorList: { ...colorList },
                    flowerList: { ...flowerList },
                },
            });
        },
        *toogleSelectStyle({ payload }, { call, put, select }) {
            const { styleList, selectStyleList } = yield select(
                state => state.diy,
            );
            const { item, index } = payload;
            let newValue = [];

            const findSelectIndex = selectStyleList.findIndex(
                x => x._id == item._id,
            );

            console.log('findSelectIndex', findSelectIndex);
            if (findSelectIndex >= 0) {
                newValue = [...selectStyleList];
                newValue.splice(findSelectIndex, 1);
                styleList.docs[index].isSelected = false;
            } else {
                newValue = [...selectStyleList, item];
                styleList.docs[index].isSelected = true;
            }

            yield put({
                type: 'setSelectStyleList',
                payload: newValue,
            });
            yield put({
                type: 'setStyleList',
                payload: {
                    ...styleList,
                },
            });
        },
        *toogleSelectFavorite({ payload }, { call, put, select }) {
            const { favoriteArr, selectFavoriteList } = yield select(
                state => state.diy,
            );
            const { item, index } = payload;
            let newValue = [];

            const findSelectIndex = selectFavoriteList.findIndex(
                x => x._id == item._id,
            );

            console.log('findSelectIndex', findSelectIndex);
            if (findSelectIndex >= 0) {
                newValue = [...selectFavoriteList];
                newValue.splice(findSelectIndex, 1);
                favoriteArr[index].isSelected = false;
            } else {
                newValue = [...selectFavoriteList, item];
                favoriteArr[index].isSelected = true;
            }

            yield put({
                type: 'setSelectFavoriteList',
                payload: newValue,
            });
            yield put({
                type: 'setFavoriteArr',
                payload: [...favoriteArr],
            });
        },
        *toDoOrder({ payload }, { call, put, select }) {
            const { selectFavoriteList } = yield select(state => state.diy);
            const gourpByStyle = lodash.groupBy(selectFavoriteList, f =>
                f.styleAndColor.map(sc => sc.style._id).join('-'),
            );

            for (var key in gourpByStyle) {
                gourpByStyle[key] = {
                    list: gourpByStyle[key],
                    key,
                    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'],
                };
            }
            console.log('gourpByStyle', gourpByStyle);
            yield put({
                type: 'setFavoriteToOrderGroupList',
                payload: Object.values(gourpByStyle),
            });
        },
    },
};
