import { message } from 'antd';
import lodash from 'lodash';
import * as api from '@/apis/diy';

export default {
    namespace: 'diy',
    state: {
        editOrderSaveId: '',
        currentStyle: {},
        currentStyle1: {},
        colorList: { docs: [] },
        flowerList: { docs: [] },
        styleList: {},
        collocationPattern: 'single', //搭配模式 single:单一模式；multiple:多个模式；paintPrew:花布大图模式 assign:分配模式
        collocationBg: false, //搭配背景 false:black|true:white
        selectColorList: [],
        styleColorings: [], // 款式着色
        selectStyleList: [],
        favoriteArr: [],
        favoriteEditObj: { styleAndColor: [] },
        favoritePattern: 'middle', //  large, middle, small
        selectFavoriteList: [],
        favoriteToOrderGroupList: [],
        goodsList: [],
        currentStyleRegion: 0,
        bigPicColor: {},
        styleQueryKey: '',
        styleQueryChangeKey: '',
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
        setCurrentStyle1(state, action) {
            return {
                ...state,
                currentStyle1: action.payload,
            };
        },
        setFavoriteEditObj(state, action) {
            return {
                ...state,
                favoriteEditObj: action.payload,
                collocationPattern: 'edit',
            };
        },
        setStyleQueryChangeKey(state, action) {
            // console.log('styleQueryChangeKey', action.payload);
            return {
                ...state,
                styleQueryChangeKey: action.payload,
            };
        },
        setStyleQueryKey(state, action) {
            return {
                ...state,
                styleQueryKey: action.payload,
            };
        },
        setCurrentStyleRegion(state, action) {
            return {
                ...state,
                currentStyleRegion: action.payload,
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
            return {
                ...state,
                selectStyleList: action.payload.filter(x => x._id),
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
        setBigPicColor(state, action) {
            return {
                ...state,
                bigPicColor: action.payload,
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
        *addFavorites({ payload }, { call, put, select }) {
            const res = yield call(api.addFavorites, { favorites: payload });
            if (res && res.data) {
                yield put({
                    type: 'fetchFavoriteList',
                    payload: {
                        goodsId: payload[0].goodId,
                    },
                });
                message.info('收藏成功');
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
            const {
                colorList = { docs: [] },
                flowerList = { docs: [] },
                selectColorList,
                collocationPattern,
                currentStyleRegion,
            } = yield select(state => state.diy);
            // setStyleColorings
            let newValue = [];
            const { item, index } = payload;
            const findSelectIndex = selectColorList.findIndex(x => x && x._id == item._id);

            switch (collocationPattern) {
                case 'edit': {
                }
                case 'single':
                    console.log('single');
                    {
                        if (currentStyleRegion) {
                            // 自主选择区域

                            newValue = [...selectColorList];
                            // 选中区域已有颜色
                            if (newValue[currentStyleRegion - 1]) {
                                let tempId = newValue[currentStyleRegion - 1]._id;
                                let tempType = newValue[currentStyleRegion - 1].type;
                                let isEixised = false;
                                // 点击了选中区域的相同颜色 则取消该区域的选中
                                if (newValue[currentStyleRegion - 1]._id === item._id) {
                                    newValue[currentStyleRegion - 1] = {};
                                    isEixised = newValue.find(nv => nv && nv._id === item._id);
                                } else {
                                    //否则换一种颜色
                                    newValue[currentStyleRegion - 1] = item;
                                    isEixised = newValue.find(nv => nv && nv._id === tempId);
                                    if (item.type) {
                                        flowerList.docs[index].isSelected = true;
                                    } else {
                                        colorList.docs[index].isSelected = true;
                                    }
                                }

                                if (!isEixised) {
                                    if (tempType === 0) {
                                        const findIndex = colorList.docs.findIndex(x => x._id === tempId);
                                        findIndex < 0 ? null : (colorList.docs[findIndex].isSelected = false);
                                    } else {
                                        const findIndex = flowerList.docs.findIndex(x => x._id === tempId);
                                        findIndex < 0 ? null : (flowerList.docs[findIndex].isSelected = false);
                                    }
                                }
                            } else {
                                newValue[currentStyleRegion - 1] = item;
                                if (item.type) {
                                    flowerList.docs[index].isSelected = true;
                                } else {
                                    colorList.docs[index].isSelected = true;
                                }
                            }
                        } else {
                            //能选中3个颜色
                            if (selectColorList.length > 2) {
                                if (selectColorList[2].type === 0) {
                                    const findIndex = colorList.docs.findIndex(x => x._id === selectColorList[2]._id);
                                    findIndex < 0 ? null : (colorList.docs[findIndex].isSelected = false);
                                } else {
                                    const findIndex = flowerList.docs.findIndex(x => x._id === selectColorList[2]._id);
                                    findIndex < 0 ? null : (flowerList.docs[findIndex].isSelected = false);
                                }
                                newValue = [selectColorList[0], selectColorList[1], item];
                            } else {
                                newValue = [...selectColorList, item];
                            }
                            if (item.type) {
                                flowerList.docs[index].isSelected = true;
                            } else {
                                colorList.docs[index].isSelected = true;
                            }
                        }
                    }
                    break;
                case 'multiple':
                    {
                        //已选中，就取消
                        if (findSelectIndex >= 0) {
                            newValue = [...selectColorList];
                            newValue.splice(findSelectIndex, 1);
                            if (item.type) {
                                flowerList.docs[index].isSelected = false;
                            } else {
                                colorList.docs[index].isSelected = false;
                            }
                        }

                        newValue = [item]; //只能选中一个颜色
                        if (selectColorList.length > 0) {
                            if (selectColorList[0].type === 0) {
                                const findIndex = colorList.docs.findIndex(x => x._id === selectColorList[0]._id);
                                findIndex < 0 ? null : (colorList.docs[findIndex].isSelected = false);
                            } else {
                                const findIndex = flowerList.docs.findIndex(x => x._id === selectColorList[0]._id);
                                findIndex < 0 ? null : (flowerList.docs[findIndex].isSelected = false);
                            }
                        }
                        if (item.type) {
                            flowerList.docs[index].isSelected = true;
                        } else {
                            colorList.docs[index].isSelected = true;
                        }
                    }
                    break;
                case 'assign':
                    {
                        //已选中，就取消
                        console.log('findSelectIndex', findSelectIndex);
                        if (findSelectIndex >= 0) {
                            newValue = [...selectColorList];
                            newValue.splice(findSelectIndex, 1);
                            if (item.type) {
                                let curIndex = flowerList.docs.findIndex(x => x && x._id == item._id);
                                flowerList.docs[curIndex].isSelected = false;
                            } else {
                                let curIndex = colorList.docs.findIndex(x => x && x._id == item._id);
                                colorList.docs[curIndex].isSelected = false;
                            }
                        } else {
                            newValue = [...selectColorList, item];
                            if (item.type) {
                                let curIndex = flowerList.docs.findIndex(x => x && x._id == item._id);
                                flowerList.docs[curIndex].isSelected = true;
                            } else {
                                let curIndex = colorList.docs.findIndex(x => x && x._id == item._id);
                                colorList.docs[curIndex].isSelected = true;
                            }
                        }
                    }
                    break;
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
        *toogleSelectAllFavorite({ payload }, { call, put, select }) {
            const { favoriteArr } = yield select(state => state.diy);

            yield put({
                type: 'setSelectFavoriteList',
                payload: payload ? favoriteArr.map(x => x) : [],
            });
            yield put({
                type: 'setFavoriteArr',
                payload: favoriteArr.map(x => ({ ...x, isSelected: payload })),
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
                let price = lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.price);
                let size = gourpByStyle[key][0].styleAndColor[0].size;
                let styleNos = gourpByStyle[key][0].styleAndColor.map(sc => sc.style.styleNo).join(',');

                gourpByStyle[key] = {
                    list: gourpByStyle[key].map(x => ({ ...x, price: _.sumBy(x.styleAndColor, sc => sc.style.price) })),
                    key,
                    sizes: gourpByStyle[key][0].styleAndColor[0].style.size?.split('/'),
                    weight: lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.weight),
                    styleNos,
                    price,
                    size,
                };
            }
            const saveItems = saveOrder?.map((o, k) => {
                let item = o.items[0];
                let key = `${k}-${item.favorite.styleAndColor.map(sc => sc.styleId._id).join('-')}`;
                let sizeArr = item.favorite.styleAndColor[0].styleId.size?.split('/');
                let weight = lodash.sumBy(item.favorite.styleAndColor, sc => sc.styleId.weight);
                console.log('weight', weight);
                let sizeObjInit = {};
                sizeArr?.map(s => {
                    sizeObjInit[s] = 0;
                });
                // console.log('sizeObjInit', sizeObjInit);
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
                    weight: weight ? weight : 0,
                    sizes: sizeArr,
                    styleNos: o.styleNos,
                    price: o.price,
                    size: o.size,
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
            const { input, covermap } = payload;
            const res = yield call(api.addCapsule, { namecn: input, nameen: input, covermap, author: info._id, status: 0 });
            if (res && res.data) {
                let capsuleId = res.data._id;
                let colorWithStyleImgs = [];
                const gourpByStyle = lodash.groupBy(selectFavoriteList, f => f.styleAndColor.map(sc => sc.style._id).join('/'));
                let styleNosArr = Object.keys(gourpByStyle);
                for (let i = 0; i < styleNosArr.length; i++) {
                    let group = gourpByStyle[styleNosArr[i]];
                    const code = group[0].styleAndColor.map(sc => sc.style.styleNo).join('/');
                    const goodCategory = group[0].goodCategory;
                    colorWithStyleImgs = group.map(favorite => ({
                        favorite: favorite._id,
                        color: favorite.styleAndColor[0].colorIds[0]._id,
                        type: 1,
                    }));

                    const capsuleStyleData = {
                        capsule: capsuleId,
                        code,
                        goodCategory,
                        colorWithStyleImgs,
                        size: group[0].styleAndColor[0].style.size,
                        price: _.sum(group[0].styleAndColor.map(sc => sc.style.price)),
                        weight: _.sum(group[0].styleAndColor.map(sc => sc.style.weight)),
                    };
                    const capsuleStyleRes = yield call(api.addCapsuleStyle, capsuleStyleData);
                }
                message.info('创建胶囊成功，等待管理员发布');
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *batchSetSelectStyleList({ payload = [] }, { call, put, select }) {
            const { styleList, currentGoodCategory } = yield select(state => state.diy);

            if (!styleList[currentGoodCategory]) {
                return;
            }
            styleList[currentGoodCategory].map(s => {
                s.isSelected = false;
            });

            let newValue = payload.map(x => {
                const findSelectIndex = styleList[currentGoodCategory].findIndex(s => s._id === x.style || s._id === x._id);
                if (findSelectIndex >= 0) {
                    styleList[currentGoodCategory][findSelectIndex].isSelected = true;
                }

                return {
                    ...x,
                    _id: x.style,
                };
            });

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
        *batchSetSelectColorList({ payload = { plainColors: [], flowerColors: [] } }, { put, select }) {
            const { colorList = { docs: [] }, flowerList = { docs: [] } } = yield select(state => state.diy);
            const { plainColors = [], flowerColors = [] } = payload;

            if (!flowerList.docs || !colorList.docs) return;
            const newValue = [];
            colorList.docs.map((x, i) => {
                const findIndex = plainColors.findIndex(c => c === x._id);
                if (findIndex >= 0) {
                    newValue.push(x);
                    colorList.docs[i].isSelected = true;
                } else {
                    colorList.docs[i].isSelected = false;
                }
            });

            flowerList.docs.map((x, i) => {
                const findIndex = flowerColors.findIndex(c => c === x._id);
                if (findIndex >= 0) {
                    newValue.push(x);
                    flowerList.docs[i].isSelected = true;
                } else {
                    flowerList.docs[i].isSelected = false;
                }
            });
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
        *showBigPic({ payload }, { call, put, select }) {
            yield put({
                type: 'setBigPicColor',
                payload: payload,
            });
            yield put({
                type: 'setCollocationPattern',
                payload: 'bigPicColor',
            });
        },
    },
};
