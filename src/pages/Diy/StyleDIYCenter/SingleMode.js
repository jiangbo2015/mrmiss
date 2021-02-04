import React, { useEffect } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import Swiper from 'react-id-swiper';

import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
// import InfiniteScroll from 'react-infinite-scroll-component';

import ArrowIcon from '@/public/icons/icon-arrow.svg';
import ExpandIcon from '@/public/icons/icon-expand.svg';
import MultipleIcon from '@/public/icons/icon-multiple.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

// import Swiper from 'react-id-swiper';
import styles from './index.less';
// import { Flex } from 'rebass';

const waitTime = time => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};

const App = ({
    styleList = { '': [] },
    dispatch,
    currentStyle = {},
    selectColorList = [],
    collocationBg,
    currentGood = { category: [] },
    currentGoodCategory = '',
}) => {
    let docs = [];
    if (styleList[currentGoodCategory]) {
        docs = styleList[currentGoodCategory];
        // console.log('docs', docs);
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
    };
    useEffect(() => {
        if (styleList[currentGoodCategory] && styleList[currentGoodCategory].length > 0) {
            dispatch({
                type: 'diy/setCurrentStyle',
                payload: styleList[currentGoodCategory][0],
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
                }}
            >
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <Select
                        value={currentGoodCategory}
                        style={{ marginRight: '28px' }}
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
                <SearchInput style={{ width: '180px' }} placeholder="SEARCH STYLE" />
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

            <div style={{ width: '300px' }}>
                <Swiper
                    {...params}
                    style={{
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            width: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <StyleItem
                            // width="170px"
                            width={`${(currentStyle.styleSize / 27) * 170}px`}
                            styleId={`single-${currentStyle._id}`}
                            colors={selectColorList}
                            {...currentStyle}
                            styleId={currentStyle._id}
                        />
                    </div>
                    <div
                        style={{
                            width: '300px',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <StyleItem
                            width={`${(currentStyle.styleBackSize / 27) * 170}px`}
                            colors={selectColorList}
                            {...currentStyle}
                            styleId={`single-${currentStyle._id}`}
                            svgUrl={currentStyle.svgUrlBack}
                            shadowUrl={currentStyle.shadowUrlBack}
                        />
                    </div>
                </Swiper>
            </div>

            <div
                style={{
                    display: 'flex',
                    overflowX: 'scroll',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: '#1C1C1C',
                    paddingTop: '12px',
                }}
            >
                {docs.map((d, index) => (
                    <StyleItem
                        style={{
                            margin: '0 100px 0 10px',
                        }}
                        width={`${(d.styleSize / 27) * 100}px`}
                        key={`${d._id}-${index}-${Math.random() * 1000000}`}
                        {...d}
                        onClick={() => {
                            handleSelectStyle(d);
                        }}
                    />
                ))}
                {/* <ReactSVG
                    src={ArrowIcon}
                    className={styles.nextIcon}
                    style={{
                        width: '18px',
                        height: '18px',
                        transform: 'rotateZ(180deg)',
                    }}
                />
                <ReactSVG
                    src={ArrowIcon}
                    className={styles.nextIcon}
                    style={{
                        width: '18px',
                        height: '18px',
                    }}
                /> */}
            </div>
        </div>
    );
};

export default connect(({ diy }) => ({
    styleList: diy.styleList,
    currentStyle: diy.currentStyle,
    selectColorList: diy.selectColorList,
    collocationBg: diy.collocationBg,
    collocationPattern: diy.collocationPattern,
    currentGood: diy.currentGood,
    currentGoodCategory: diy.currentGoodCategory,
}))(App);
