import { message } from 'antd';
import lodash from 'lodash';
import * as api from '@/apis/diy';

export default {
    namespace: 'diy',
    state: {
        editOrderSaveId: '',
        currentStyle: {},
        colorList: { docs: [] },
        flowerList: { docs: [] },
        styleList: {},
        collocationPattern: 'single', //搭配模式 single:单一模式；multiple:多个模式；paintPrew:花布大图模式
        collocationBg: false, //搭配背景 false:black|true:white
        selectColorList: [],
        selectStyleList: [],
        favoriteArr: [],
        favoritePattern: 'middle', //  large, middle, small
        selectFavoriteList: [],
        favoriteToOrderGroupList: [],
        goodsList: [],
    },
    reducers: {
        setEditOrderSaveId(state, action) {
            return {
                ...state,
                editOrderSaveId: action.payload,
            };
        },
        setCurrentStyle(state, action) {
            return {
                ...state,
                currentStyle: action.payload,
            };
        },
        setGoodsList(state, action) {
            return {
                ...state,
                goodsList: action.payload,
            };
        },
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
        setColorList(state, action) {
            return {
                ...state,
                colorList: action.payload,
            };
        },
        setFlowerList(state, action) {
            return {
                ...state,
                flowerList: action.payload,
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
        setCurrentGood(state, action) {
            return {
                ...state,
                currentGood: action.payload,
            };
        },
        setCurrentGoodCategory(state, action) {
            return {
                ...state,
                currentGoodCategory: action.payload,
            };
        },
    },
    effects: {
        *fetchStyleList({ payload }, { call, put, select }) {
            // const { styleList = { docs: [] } } = yield select(state => state.diy);
            // console.log('originData', originData);
            // if (!originData) return;
            const res = yield call(api.getUserStyleList, payload);
            if (res.data && Array.isArray(res.data.category)) {
                let categoryStyles = {};
                res.data.category.map(c => {
                    categoryStyles[c._id] = c.styles;
                });
                yield put({
                    type: 'setStyleList',
                    payload: categoryStyles,
                });
            }
            // getUserStyleList
        },
        *fetchGoodsList({ payload }, { call, put, select }) {
            const res = yield call(api.getVisibleList);
            // console.log('originData', originData);
            // if (!originData) return;
            // goods/getVisibleList
            if (res && res.data) {
                yield put({
                    type: 'setGoodsList',
                    payload: res.data,
                });
            }
        },
        *fetchColorList({ payload }, { call, put, select }) {
            const res = yield call(api.getColorList, payload);
            if (res && res.data) {
                if (payload.type === 0) {
                    yield put({
                        type: 'setColorList',
                        payload: res.data,
                    });
                } else {
                    yield put({
                        type: 'setFlowerList',
                        payload: res.data,
                    });
                }
            }
        },
        *fetchFavoriteList({ payload }, { call, put, select }) {
            const res = yield call(api.getFavoriteList, payload);
            if (res && res.data) {
                yield put({
                    type: 'setFavoriteArr',
                    payload: res.data,
                });
            }
        },
        *addFavorite({ payload }, { call, put, select }) {
            const res = yield call(api.addFavorite, payload);
            if (res && res.data) {
                yield put({
                    type: 'fetchFavoriteList',
                    payload: {
                        goodsId: payload.goodId,
                    },
                });
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *updateFavorite({ payload }, { call, put, select }) {
            const res = yield call(api.updateFavorite, payload);
            if (res && res.data) {
                yield put({
                    type: 'fetchFavoriteList',
                    payload: {
                        goodsId: payload.goodId,
                    },
                });
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *deleteFavorite({ payload }, { call, put, select }) {
            const res = yield call(api.deleteFavorite, payload);
            if (res && res.data) {
                const { currentGood } = yield select(state => state.diy);
                yield put({
                    type: 'fetchFavoriteList',
                    payload: {
                        goodsId: currentGood._id,
                    },
                });
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *addOrder({ payload }, { call, put, select }) {
            const { editOrderSaveId } = yield select(state => state.diy);
            let apiFun = api.addOrder;
            let data = payload;
            if (editOrderSaveId && !payload.isSend) {
                apiFun = api.updateOrder;
                data._id = editOrderSaveId;
            }
            const res = yield call(apiFun, payload);
            if (res && res.data) {
                message.info('保存成功');
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *toogleSelectColor({ payload }, { call, put, select }) {
            const { colorList = { docs: [] }, flowerList = { docs: [] }, selectColorList } = yield select(state => state.diy);
            const { item, index } = payload;
            let newValue = [];

            console.log('selectColorList', item);
            const findSelectIndex = selectColorList.findIndex(x => x._id == item._id);

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
            const { styleList, selectStyleList, currentGoodCategory } = yield select(state => state.diy);
            const { item, index } = payload;
            let newValue = [];

            const findSelectIndex = selectStyleList.findIndex(x => x._id == item._id);

            console.log('findSelectIndex', findSelectIndex);
            if (findSelectIndex >= 0) {
                newValue = [...selectStyleList];
                newValue.splice(findSelectIndex, 1);
                styleList[currentGoodCategory][index].isSelected = false;
            } else {
                newValue = [...selectStyleList, item];
                styleList[currentGoodCategory][index].isSelected = true;
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
            const { favoriteArr, selectFavoriteList } = yield select(state => state.diy);
            const { item, index } = payload;
            let newValue = [];

            const findSelectIndex = selectFavoriteList.findIndex(x => x._id == item._id);

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
            const { selectFavoriteList, currentGood } = yield select(state => state.diy);
            const res = yield call(api.getMyOrderList, { isSend: 0, goodsId: currentGood._id });
            let saveOrder = [];
            if (res && Array.isArray(res.data) && res.data.length > 0) {
                console.log('data', res.data);
                yield put({
                    type: 'setEditOrderSaveId',
                    payload: res.data[0]._id,
                });
                saveOrder = res.data[0].orderData;
            } else {
                yield put({
                    type: 'setEditOrderSaveId',
                    payload: '',
                });
            }

            const gourpByStyle = lodash.groupBy(selectFavoriteList, f => f.styleAndColor.map(sc => sc.style._id).join('-'));
            console.log('gourpByStyle', gourpByStyle);
            for (var key in gourpByStyle) {
                gourpByStyle[key] = {
                    list: gourpByStyle[key],
                    key,
                    sizes: gourpByStyle[key][0].styleAndColor[0].style.size.split('/'),
                };
            }
            const saveItems = saveOrder.map((o, k) => {
                let item = o.items[0];
                let key = `${k}-${item.favorite.styleAndColor.map(sc => sc.styleId._id).join('-')}`;
                let sizeArr = item.favorite.styleAndColor[0].styleId.size.split('/');
                let sizeObjInit = {};
                sizeArr.map(s => {
                    sizeObjInit[s] = 0;
                });
                console.log('sizeObjInit', sizeObjInit);
                return {
                    list: o.items.map(i => ({
                        ...i.favorite,
                        parte: i.parte,
                        price: _.sum(i.favorite.styleAndColor.map(sc => sc.styleId.price)),
                        sizeInfoObject: i.sizeInfoObject ? i.sizeInfoObject : sizeObjInit,
                        styleAndColor: i.favorite.styleAndColor.map(sc => ({
                            colorIds: sc.colorIds,
                            styleId: sc.styleId._id,
                            style: sc.styleId,
                        })),
                    })),
                    key,
                    pickType: o.pickType,
                    rowRemarks: o.rowRemarks,
                    isSelect: false,
                    sizes: sizeArr,
                };
            });
            yield put({
                type: 'setFavoriteToOrderGroupList',
                payload: Object.values(gourpByStyle).concat(saveItems),
            });
        },
        *createCapsule({ payload }, { call, put, select }) {
            const { info = {} } = yield select(state => state.user);
            const { selectFavoriteList } = yield select(state => state.diy);
            const res = yield call(api.addCapsule, { namecn: payload, nameen: payload, author: info._id, status: 0 });
            if (res && res.data) {
                let capsuleId = res.data._id;
                let colorWithStyleImgs = [];
                const gourpByStyle = lodash.groupBy(selectFavoriteList, f => f.styleAndColor.map(sc => sc.style._id).join('/'));
                let styleNosArr = Object.keys(gourpByStyle);
                for (let i = 0; i < styleNosArr.length; i++) {
                    let group = gourpByStyle[styleNosArr[i]];
                    const code = group[0].styleAndColor.map(sc => sc.style.styleNo).join('/');
                    colorWithStyleImgs = group.map(favorite => ({
                        favorite: favorite._id,
                        color: favorite.styleAndColor[0].colorIds[0]._id,
                        type: 1,
                    }));

                    const capsuleStyleData = {
                        capsule: capsuleId,
                        code,
                        colorWithStyleImgs,
                        size: group[0].styleAndColor[0].style.size,
                        price: _.sum(group[0].styleAndColor.map(sc => sc.style.price)),
                    };
                    const capsuleStyleRes = yield call(api.addCapsuleStyle, capsuleStyleData);
                }
                message.info('创建胶囊成功，等待管理员发布');
            }
            // { styleAndColor: params, goodId: goodId }
        },
    },
};
