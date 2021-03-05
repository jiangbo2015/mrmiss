import React, { useEffect } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import Swiper from 'react-id-swiper';

import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import MultipleStyleSelector from './MultipleStyleSelector';
import SingleStyleSelector from './SingleStyleSelector';

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
    collocationBg,
    currentGood = { category: [] },
    currentGoodCategory = '',
    currentStyleRegion,
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
            docs = styleList[top._id];
        }
        const bottom = currentGood.category.find(x => x.name === '单裤');
        if (bottom) {
            docs1 = styleList[bottom._id];
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
    const handleSetCurrentGoodCategory = category => {
        dispatch({
            type: 'diy/setCurrentGoodCategory',
            payload: category,
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
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload: [],
            });
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
        dispatch({
            type: 'diy/setCurrentStyle',
            payload: style,
        });
    };

    const handleSelectStyle1 = style => {
        dispatch({
            type: 'diy/setCurrentStyle1',
            payload: style,
        });
    };

    const handleSetCurrentStyleRegion = val => {
        console.log('handleSetCurrentStyleRegion', val);
        dispatch({
            type: 'diy/setCurrentStyleRegion',
            payload: val + 1,
        });
    };

    return (
        <div
            style={{
                padding: '28px 20px',
                background: collocationBg ? '#ffffff' : '#222222',
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
                        value={currentGoodCategory}
                        style={{ marginRight: '20px' }}
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
                        // styleQueryChangeKey
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
            {categoryObj && categoryObj.name === '分体' ? (
                <MultipleStyleSelector
                    currentStyle={currentStyle}
                    selectColorList={selectColorList}
                    currentStyleRegion={currentStyleRegion}
                    docs={docs}
                    handleSelectStyle={handleSelectStyle}
                    handleSetCurrentStyleRegion={handleSetCurrentStyleRegion}
                    currentStyle2={currentStyle1}
                    selectColorList2={selectColorList}
                    currentStyleRegion2={currentStyleRegion}
                    docs2={docs1}
                    handleSelectStyle2={handleSelectStyle1}
                    handleSetCurrentStyleRegion2={handleSetCurrentStyleRegion}
                />
            ) : (
                <SingleStyleSelector
                    currentStyle={currentStyle}
                    selectColorList={selectColorList}
                    currentStyleRegion={currentStyleRegion}
                    docs={docs}
                    handleSelectStyle={handleSelectStyle}
                    handleSetCurrentStyleRegion={handleSetCurrentStyleRegion}
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
    selectStyleList: diy.selectStyleList,
    collocationBg: diy.collocationBg,
    collocationPattern: diy.collocationPattern,
    currentGood: diy.currentGood,
    currentGoodCategory: diy.currentGoodCategory,
    currentStyleRegion: diy.currentStyleRegion,
    styleQueryKey: diy.styleQueryKey,
    styleQueryChangeKey: diy.styleQueryChangeKey,
}))(App);
