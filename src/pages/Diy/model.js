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
        collocationPattern: 'multiple', //搭配模式 single:单一模式；multiple:多个模式；paintPrew:花布大图模式 assign:分配模式
        collocationBg: false, //搭配背景 false:black|true:white
        selectColorList: [],
        singleSelectColorList: [], // 单个搭配时需要使用
        singleSelectColorList1: [], // 单个搭配时需要使用 分体下装
        styleColorings: [], // 款式着色
        selectStyleList: [],
        favoriteArr: [],
        favoriteEditObj: { styleAndColor: [] },
        favoritePattern: 'small', //  large, middle, small
        selectFavoriteList: [],
        favoriteToOrderGroupList: [],
        goodsList: [],
        currentStyleRegion: 0,
        currentStyleRegion1: 0, // 分体时需要使用
        bigPicColor: {},
        styleQueryKey: '',
        styleQueryChangeKey: '',
        currentGoodCategoryMultiple: '',
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
            // // console.log('styleQueryChangeKey', action.payload);
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
                currentStyleRegion1: 0,
            };
        },
        setCurrentStyleRegion1(state, action) {
            return {
                ...state,
                currentStyleRegion: 0,
                currentStyleRegion1: action.payload,
            };
        },
        setGoodsList(state, action) {
            return {
                ...state,
                goodsList: action.payload,
            };
        },
        setFavoriteToOrderGroupList(state, action) {
            // console.log('setFavoriteToOrderGroupList', action);
            return {
                ...state,
                favoriteToOrderGroupList: action.payload,
            };
        },
        setFavoritePattern(state, action) {
            // console.log('setFavoritePattern', action);
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
        setSingleSelectColorList(state, action) {
            return {
                ...state,
                singleSelectColorList: action.payload,
            };
        },
        setSingleSelectColorList1(state, action) {
            return {
                ...state,
                singleSelectColorList1: action.payload,
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
                // currentSingleGoodCategory: action.payload,
            };
        },
        setCurrentGoodCategoryMultiple(state, action) {
            return {
                ...state,
                currentGoodCategoryMultiple: action.payload,
                // currentSingleGoodCategory: action.payload,
            };
        },
    },
    effects: {
        *fetchStyleList({ payload }, { call, put, select }) {
            const { selectStyleList = [] } = yield select(state => state.diy);
            const { currentAdminChannel } = yield select(state => state.channel);
            const { styles, codename } = currentAdminChannel;
            const { fetchType = 'keep' } = payload;
            // console.log('codename', currentAdminChannel);
            const res = yield call(api.getUserStyleList, payload);
            if (res.data && Array.isArray(res.data.category)) {
                let categoryStyles = {};
                let newValue = [];
                if (codename !== 'A' && fetchType === 'clear') {
                    res.data.category.map(c => {
                        categoryStyles[c._id] = c.styles.map(x => {
                            const finded = styles.find(s => s.style === x._id);
                            const res = { ...x };
                            if (finded) {
                                newValue.push(finded);
                                res.isSelected = true;
                            }
                            return res;
                        });
                    });
                } else {
                    res.data.category.map(c => {
                        categoryStyles[c._id] = c.styles.map(x => {
                            const finded = selectStyleList.find(s => s._id === x._id);
                            const res = { ...x };
                            if (finded) {
                                newValue.push(finded);
                                res.isSelected = true;
                            }
                            return res;
                        });
                    });
                }

                // console.log('categoryStyles', categoryStyles);

                yield put({
                    type: 'setStyleList',
                    payload: categoryStyles,
                });
                if (fetchType === 'clear') {
                    console.log('fetchType === clear');
                    yield put({
                        type: 'setSelectStyleList',
                        payload: newValue,
                    });
                }
            }
            // getUserStyleList
        },
        *fetchGoodsList({ payload }, { call, put, select }) {
            const res = yield call(api.getVisibleList);
            // // console.log('originData', originData);
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
            const { selectColorList = [] } = yield select(state => state.diy);
            const { currentAdminChannel } = yield select(state => state.channel);
            const { plainColors = [], flowerColors = [], codename } = currentAdminChannel;
            const { fetchType = 'keep' } = payload;
            // console.log('currentAdminChannel.codename', codename);
            let newValue = [];
            if (res && res.data) {
                const tmpColorList = res.data;
                tmpColorList.docs.map((x, i) => {
                    let findIndex = -1;
                    if (codename === 'A' || fetchType === 'keep') {
                        findIndex = selectColorList.findIndex(c => c._id === x._id);
                    } else {
                        findIndex = [...plainColors, ...flowerColors].findIndex(c => c === x._id);
                    }
                    if (findIndex >= 0) {
                        newValue.push(x);
                        tmpColorList.docs[i].isSelected = true;
                    } else {
                        tmpColorList.docs[i].isSelected = false;
                    }
                });
                if (payload.type === 0) {
                    yield put({
                        type: 'setColorList',
                        payload: tmpColorList,
                    });
                } else {
                    yield put({
                        type: 'setFlowerList',
                        payload: tmpColorList,
                    });
                }
                if (codename != 'A' && fetchType === 'clear') {
                    // console.log('setSelectColorList');
                    yield put({
                        type: 'setSelectColorList',
                        payload: [...selectColorList.filter(x => x.type != payload.type), ...newValue],
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
            if (res && res.data && payload.successMsg) {
                message.info(payload.successMsg);
            }
            // { styleAndColor: params, goodId: goodId }
        },
        *updateOrder({ payload }, { call, put, select }) {
            const res = yield call(api.updateOrder, payload);
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
                singleSelectColorList,
                singleSelectColorList1,
                collocationPattern,
                currentStyleRegion1,
                currentStyleRegion,
                favoriteEditObj,
            } = yield select(state => state.diy);
            // setStyleColorings
            let newValue = [];
            let newValue1 = [];
            const { item, index } = payload;
            const findSelectIndex = selectColorList.findIndex(x => x && x._id == item._id);

            switch (collocationPattern) {
                case 'edit':
                    {
                        // favoriteEditObj
                        if (
                            favoriteEditObj.styleAndColor[0].currentStyleRegion ||
                            (favoriteEditObj.styleAndColor.length > 1 && favoriteEditObj.styleAndColor[1].currentStyleRegion)
                        ) {
                            // 自主选择区域

                            newValue = [...favoriteEditObj.styleAndColor[0].colorIds];

                            if (favoriteEditObj.styleAndColor.length > 1) {
                                newValue1 = [...favoriteEditObj.styleAndColor[1].colorIds];
                            }

                            let tempValue = favoriteEditObj.styleAndColor[0].currentStyleRegion ? newValue : newValue1;
                            let tempRegion = favoriteEditObj.styleAndColor[0].currentStyleRegion
                                ? favoriteEditObj.styleAndColor[0].currentStyleRegion
                                : favoriteEditObj.styleAndColor[1].currentStyleRegion;
                            // 选中区域已有颜色
                            if (tempValue[tempRegion - 1]) {
                                let tempId = tempValue[tempRegion - 1]._id;
                                let tempType = tempValue[tempRegion - 1].type;
                                let isEixised = false;
                                // 点击了选中区域的相同颜色 则取消该区域的选中
                                if (tempValue[tempRegion - 1]._id === item._id) {
                                    tempValue[tempRegion - 1] = {};
                                    isEixised = tempValue.find(nv => nv && nv._id === item._id);
                                } else {
                                    //否则换一种颜色
                                    tempValue[tempRegion - 1] = item;
                                    isEixised = tempValue.find(nv => nv && nv._id === tempId);
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
                                tempValue[tempRegion - 1] = item;
                                if (item.type) {
                                    flowerList.docs[index].isSelected = true;
                                } else {
                                    colorList.docs[index].isSelected = true;
                                }
                            }
                        } else {
                            return;
                        }
                    }
                    break;
                case 'single':
                    {
                        if (currentStyleRegion || currentStyleRegion1) {
                            // 自主选择区域

                            newValue = [...singleSelectColorList];
                            newValue1 = [...singleSelectColorList1];
                            let tempValue = currentStyleRegion ? newValue : newValue1;
                            let tempRegion = currentStyleRegion ? currentStyleRegion : currentStyleRegion1;
                            // 选中区域已有颜色
                            if (tempValue[tempRegion - 1]) {
                                let tempId = tempValue[tempRegion - 1]._id;
                                let tempType = tempValue[tempRegion - 1].type;
                                let isEixised = false;
                                // 点击了选中区域的相同颜色 则取消该区域的选中
                                if (tempValue[tempRegion - 1]._id === item._id) {
                                    tempValue[tempRegion - 1] = {};
                                    let vfinded = newValue.find(nv => nv && nv._id === item._id);
                                    let v1finded = newValue1.find(nv => nv && nv._id === item._id);
                                    isEixised = vfinded || v1finded;
                                    // isEixised = tempValue.find(nv => nv && nv._id === item._id);
                                } else {
                                    //否则换一种颜色
                                    tempValue[tempRegion - 1] = item;
                                    let vfinded = newValue.find(nv => nv && nv._id === tempId);
                                    let v1finded = newValue1.find(nv => nv && nv._id === tempId);
                                    isEixised = vfinded || v1finded;
                                    // isEixised = tempValue.find(nv => nv && nv._id === tempId);
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
                                tempValue[tempRegion - 1] = item;
                                if (item.type) {
                                    flowerList.docs[index].isSelected = true;
                                } else {
                                    colorList.docs[index].isSelected = true;
                                }
                            }
                        } else {
                            return;
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
                        } else {
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
                    }
                    break;
                case 'assign':
                    {
                        //已选中，就取消
                        // console.log('findSelectIndex', findSelectIndex);
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

            if (collocationPattern === 'single') {
                yield put({
                    type: 'setSingleSelectColorList',
                    payload: newValue,
                });
                // console.log('newValue1', newValue1);
                yield put({
                    type: 'setSingleSelectColorList1',
                    payload: newValue1,
                });
            }
            if (collocationPattern === 'edit') {
                favoriteEditObj.styleAndColor[0].colorIds = newValue;
                if (favoriteEditObj.styleAndColor.length > 1) {
                    favoriteEditObj.styleAndColor[1].colorIds = newValue1;
                }
                yield put({
                    type: 'setFavoriteEditObj',
                    payload: {
                        ...favoriteEditObj,
                    },
                });
            } else {
                yield put({
                    type: 'setSelectColorList',
                    payload: newValue,
                });
            }

            yield put({
                type: 'setColorAndFlowerList',
                payload: {
                    colorList: { ...colorList },
                    flowerList: { ...flowerList },
                },
            });
        },
        *toogleSelectStyle({ payload }, { call, put, select }) {
            const { styleList, selectStyleList, currentGoodCategoryMultiple } = yield select(state => state.diy);
            const { item, index } = payload;
            let newValue = [];

            const findSelectIndex = selectStyleList.findIndex(x => x._id == item._id);
            if (findSelectIndex >= 0) {
                newValue = [...selectStyleList];
                newValue.splice(findSelectIndex, 1);
                console.log('findSelectIndex', findSelectIndex);
                styleList[currentGoodCategoryMultiple][index].isSelected = false;
            } else {
                newValue = [...selectStyleList, item];
                styleList[currentGoodCategoryMultiple][index].isSelected = true;
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

            // console.log('findSelectIndex', findSelectIndex);
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
                // console.log('data', res.data);
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
            // console.log('gourpByStyle', gourpByStyle);
            for (var key in gourpByStyle) {
                let price = lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.price);
                let size = gourpByStyle[key][0].styleAndColor[0].size;
                let styleNos = gourpByStyle[key][0].styleAndColor.map(sc => sc.style.styleNo).join(',');

                let sizeArr = size?.split('/');
                let sizeObjInit = {};
                sizeArr?.map(s => {
                    sizeObjInit[s] = 0;
                });

                gourpByStyle[key] = {
                    list: gourpByStyle[key].map(x => ({
                        ...x,
                        price: _.sumBy(x.styleAndColor, sc => sc.style.price),
                        sizeInfoObject: { ...sizeObjInit },
                    })),
                    key,
                    sizes: gourpByStyle[key][0].styleAndColor[0].style.size?.split('/'),
                    weight: lodash.sumBy(gourpByStyle[key][0].styleAndColor, sc => sc.style.weight),
                    styleNos,
                    price,
                    size,
                    pickType: { pieceCount: 0, val: 1 },
                };
            }
            const saveItems = saveOrder
                ?.filter(x => x?.items[0]?.favorite)
                .map((o, k) => {
                    let item = o.items[0];
                    let key = `${k}-${item.favorite.styleAndColor.map(sc => sc.styleId._id).join('-')}`;
                    let sizeArr = item.favorite.styleAndColor[0].styleId.size?.split('/');
                    let weight = lodash.sumBy(item.favorite.styleAndColor, sc => sc.styleId.weight);
                    // console.log('weight', weight);
                    let sizeObjInit = {};
                    sizeArr?.map(s => {
                        sizeObjInit[s] = 0;
                    });
                    // // console.log('sizeObjInit', sizeObjInit);
                    return {
                        list: o.items.map(i => ({
                            ...i.favorite,
                            parte: i.parte,
                            price: _.sum(i.favorite.styleAndColor.map(sc => sc.styleId.price)),
                            sizeInfoObject: i.sizeInfoObject ? i.sizeInfoObject : { ...sizeObjInit },
                            styleAndColor: i.favorite.styleAndColor.map(sc => ({
                                colorIds: sc.colorIds.filter(c => c),
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
        *delOrderRow({ payload }, { put, select }) {
            const { favoriteToOrderGroupList } = yield select(state => state.diy);
            favoriteToOrderGroupList.splice(payload, 1);
            yield put({
                type: 'setFavoriteToOrderGroupList',
                payload: [...favoriteToOrderGroupList.filter(x => x.list.length)],
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
            const { styleList, currentGoodCategoryMultiple } = yield select(state => state.diy);
            // console.log('batchSetSelectStyleList', styleList[currentGoodCategoryMultiple])
            // // console.log('styleList[currentGoodCategory]', styleList[currentGoodCategory]);
            // if (!styleList[currentGoodCategoryMultiple]) {
            //     return;
            // }
            

            for (let k in styleList) {
                for(let i=0;i<styleList[k].length;i++){
                    styleList[k][i].isSelected = false
                }
            }
            
            let num = 1

            // console.log('payload', payload)

            let newValue = payload.map(x => {

                for (let k in styleList) {                 
                    for(let i=0;i<styleList[k].length;i++){
                        if(styleList[k][i]._id== x.style){
                            styleList[k][i].isSelected = true
                            num++
                            console.log('num',num)
                        }
                    }
                }
                return {
                    ...x,
                    _id: x.style || x._id,
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
