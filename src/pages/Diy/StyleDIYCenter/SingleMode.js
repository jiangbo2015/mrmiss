import React, { useEffect } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import Swiper from 'react-id-swiper';

import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import MultipleStyleSelector from './MultipleStyleSelector';
import SingleStyleSelector from './SingleStyleSelector';
import { ColotItem } from '../ColorSelector';
import { ImgItem } from '../FlowerSelector';

import ArrowIcon from '@/public/icons/icon-arrow.svg';
import ExpandIcon from '@/public/icons/icon-expand.svg';
import MultipleIcon from '@/public/icons/icon-multiple.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

// import Swiper from 'react-id-swiper';
import styles from './index.less';

const App = ({
    styleList = { '': [] },
    dispatch,
    currentStyle = {},
    currentStyle1 = {},
    selectColorList = [],
    flowerList = { docs: [] },
    colorList = { docs: [] },
    singleSelectColorList = [],
    singleSelectColorList1 = [],
    collocationBg,
    currentGood = { category: [] },
    currentGoodCategory = '',
    currentStyleRegion,
    currentStyleRegion1,
    selectStyleList = [],

    styleQueryChangeKey,
}) => {
    let docs = [];
    let docs1 = [];
    let categoryObj = currentGood.category.find(x => x._id === currentGoodCategory);
    if (styleList[currentGoodCategory]) {
        //选择的放在前面
        docs =
            selectStyleList.length > 0
                ? [
                      ...styleList[currentGoodCategory].filter(x => x.isSelected),
                      ...styleList[currentGoodCategory].filter(x => !x.isSelected),
                  ]
                : styleList[currentGoodCategory];

        // console.log('docs', docs);
    }
    if (categoryObj && categoryObj.name === '分体') {
        const top = currentGood.category.find(x => x.name === '单衣');
        if (top) {
            //选择的放在前面
            docs =
                selectStyleList.length > 0
                    ? [...styleList[top._id].filter(x => x.isSelected), ...styleList[top._id].filter(x => !x.isSelected)]
                    : styleList[top._id];
        }
        const bottom = currentGood.category.find(x => x.name === '单裤');
        if (bottom) {
            docs1 =
                selectStyleList.length > 0
                    ? [...styleList[bottom._id].filter(x => x.isSelected), ...styleList[bottom._id].filter(x => !x.isSelected)]
                    : styleList[bottom._id];
        }
    }
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
    };
    useEffect(() => {
        if (Array.isArray(currentGood.category) && currentGood.category.length > 0) {
            handleSetCurrentGoodCategory(currentGood.category[0]._id);
        }
    }, [currentGood]);
    const handleSetCurrentGoodCategory = (category, noChange) => {
        dispatch({
            type: 'diy/setCurrentGoodCategory',
            payload: category,
        });
        dispatch({
            type: 'diy/setSingleSelectColorList',
            payload: [],
        });
        dispatch({
            type: 'diy/setSingleSelectColorList1',
            payload: [],
        });
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: { plainColors: [], flowerColors: [] },
        });
    };
    const handleChangeCollocationPattern = pattern => {
        dispatch({
            type: 'diy/setCollocationPattern',
            payload: pattern,
        });
        if (pattern !== 'expand') {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: [], flowerColors: [] },
            });
        }
        if (pattern === 'multiple') {
            // if (categoryObj.name === '分体') {
            //     handleSetCurrentGoodCategory(currentGood.category[0]._id);
            // }
        }
    };
    useEffect(() => {
        if (docs && docs.length > 0) {
            dispatch({
                type: 'diy/setCurrentStyle',
                payload: docs[0],
            });
        } else {
            {
                dispatch({
                    type: 'diy/setCurrentStyle',
                    payload: {},
                });
            }
        }

        if (docs1 && docs1.length > 0) {
            dispatch({
                type: 'diy/setCurrentStyle1',
                payload: docs1[0],
            });
        } else {
            dispatch({
                type: 'diy/setCurrentStyle1',
                payload: {},
            });
        }
    }, [styleList, currentGoodCategory]);
    const handleChangeCollocationBg = bg => {
        dispatch({
            type: 'diy/setCollocationBg',
            payload: bg,
        });
    };

    const handleSelectStyle = style => {
        if (style._id === currentStyle._id) {
            return;
        }
        dispatch({
            type: 'diy/setCurrentStyle',
            payload: style,
        });
        dispatch({
            type: 'diy/setSingleSelectColorList',
            payload: [],
        });
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: {
                plainColors: [...singleSelectColorList1.map(x => x._id)],
                flowerColors: [...singleSelectColorList1.map(x => x._id)],
            },
        });
        dispatch({
            type: 'diy/setCurrentStyleRegion',
            payload: 0,
        });
    };

    const handleSelectStyle1 = style => {
        if (style._id === currentStyle1._id) {
            return;
        }
        dispatch({
            type: 'diy/setCurrentStyle1',
            payload: style,
        });
        dispatch({
            type: 'diy/setSingleSelectColorList1',
            payload: [],
        });
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: {
                plainColors: [...singleSelectColorList.map(x => x._id)],
                flowerColors: [...singleSelectColorList.map(x => x._id)],
            },
        });
        dispatch({
            type: 'diy/setCurrentStyleRegion1',
            payload: 0,
        });
    };

    const handleSetCurrentStyleRegion = val => {
        // console.log('handleSetCurrentStyleRegion', val);
        dispatch({
            type: 'diy/setCurrentStyleRegion',
            payload: val + 1,
        });
    };

    const handleSetCurrentStyleRegion1 = val => {
        // console.log('handleSetCurrentStyleRegion', val);
        dispatch({
            type: 'diy/setCurrentStyleRegion1',
            payload: val + 1,
        });
    };

    return (
        <div
            style={{
                padding: '28px 20px',
                background: '#222222',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <Select
                        width="98px"
                        value={currentGoodCategory}
                        style={{ marginRight: '20px', minWidth: '92px' }}
                        options={currentGood.category.map(c => ({ label: c.name, value: c._id }))}
                        onSelect={val => handleSetCurrentGoodCategory(val)}
                    />
                    <Select
                        value="Time"
                        disabled
                        onClick={() => {
                            console.log('time time');
                        }}
                    />
                </div>
                <SearchInput
                    style={{ width: '180px', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                    placeholder="SEARCH STYLE"
                    value={styleQueryChangeKey}
                    onSearch={e => {
                        dispatch({
                            type: 'diy/setStyleQueryKey',
                            payload: e.target.value,
                        });
                    }}
                    onChange={e => {
                        dispatch({
                            type: 'diy/setStyleQueryChangeKey',
                            payload: e.target.value,
                        });
                    }}
                />
                <div style={{ display: 'flex' }}>
                    <ReactSVG
                        src={ExpandIcon}
                        className="mode-icon"
                        onClick={() => {
                            handleChangeCollocationPattern('expand');
                        }}
                    />
                    <ReactSVG
                        src={SwitchBgIcon}
                        className="mode-icon"
                        style={{ margin: '0 12px' }}
                        onClick={() => {
                            handleChangeCollocationBg(!collocationBg);
                        }}
                    />
                    <ReactSVG
                        src={MultipleIcon}
                        className="mode-icon"
                        onClick={() => {
                            handleChangeCollocationPattern('multiple');
                        }}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                    style={{
                        display: 'flex',
                        height: '45px',
                        alignItems: 'center',
                        padding: '0 10px',
                        // opacity: selectColorList.filter(x => x?.type === 0).length > 0 ? 1 : 0,
                    }}
                >
                    {colorList.docs
                        .filter(x => x.isSelected)
                        .map((d, index) => (
                            <ColotItem
                                size="12px"
                                key={`bar-${d._id}`}
                                // isSelected={d.isSelected}
                                color={d.value}
                                
                            />
                        ))}
                </div>
                <div
                    style={{
                        display: 'flex',
                        height: '45px',
                        alignItems: 'center',
                        padding: '0 10px',
                        // opacity: selectColorList.filter(x => x?.type !== 0).length > 0 ? 1 : 0,
                    }}
                >
                    {flowerList.docs
                        .filter(x => x.isSelected)
                        .map((d, index) => (
                            <ImgItem
                                size="12px"
                                key={`bar-${d._id}-${index}`}
                                // isSelected={d.isSelected}
                                img={d.value}
                            />
                        ))}
                </div>
            </div>

            {categoryObj && categoryObj.name === '分体' ? (
                <MultipleStyleSelector
                    currentStyle={currentStyle}
                    selectColorList={singleSelectColorList}
                    currentStyleRegion={currentStyleRegion}
                    docs={docs}
                    handleSelectStyle={handleSelectStyle}
                    handleSetCurrentStyleRegion={handleSetCurrentStyleRegion}
                    currentStyle2={currentStyle1}
                    selectColorList2={singleSelectColorList1}
                    currentStyleRegion2={currentStyleRegion1}
                    docs2={docs1}
                    handleSelectStyle2={handleSelectStyle1}
                    handleSetCurrentStyleRegion2={handleSetCurrentStyleRegion1}
                    collocationBg={collocationBg}
                />
            ) : (
                <SingleStyleSelector
                    currentStyle={currentStyle}
                    selectColorList={singleSelectColorList}
                    currentStyleRegion={currentStyleRegion}
                    docs={docs}
                    handleSelectStyle={handleSelectStyle}
                    handleSetCurrentStyleRegion={handleSetCurrentStyleRegion}
                    collocationBg={collocationBg}
                />
            )}
        </div>
    );
};

export default connect(({ diy }) => ({
    styleList: diy.styleList,
    currentStyle: diy.currentStyle,
    currentStyle1: diy.currentStyle1,
    selectColorList: diy.selectColorList,
    flowerList: diy.flowerList,
    colorList: diy.colorList,
    selectStyleList: diy.selectStyleList,
    collocationBg: diy.collocationBg,
    collocationPattern: diy.collocationPattern,
    currentGood: diy.currentGood,
    currentGoodCategory: diy.currentGoodCategory,
    currentStyleRegion: diy.currentStyleRegion,
    currentStyleRegion1: diy.currentStyleRegion1,
    singleSelectColorList: diy.singleSelectColorList,
    singleSelectColorList1: diy.singleSelectColorList1,
    styleQueryKey: diy.styleQueryKey,
    styleQueryChangeKey: diy.styleQueryChangeKey,
}))(App);
