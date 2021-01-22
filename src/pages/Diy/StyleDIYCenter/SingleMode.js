import React from 'react';
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
    styleList = { docs: [] },
    dispatch,
    currentStyle = {},
    selectColorList = [],
    collocationBg,
}) => {
    const { docs } = styleList;
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
    };
    const handleFetchMore = async () => {
        console.log('fetchStyleList');
        await waitTime(1000);
        console.log('go go');
        dispatch({
            type: 'diy/setCollocationPattern',
        });
    };
    const handleChangeCollocationPattern = pattern => {
        dispatch({
            type: 'diy/setCollocationPattern',
            payload: pattern,
        });
    };

    const handleChangeCollocationBg = bg => {
        dispatch({
            type: 'diy/setCollocationBg',
            payload: bg,
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
                        style={{ marginRight: '28px' }}
                        options={[
                            { label: 'Time', value: 'time' },
                            { label: 'Color', value: 'color' },
                        ]}
                    />
                    <Select
                        options={[
                            { label: 'Time', value: 'time' },
                            { label: 'Color', value: 'color' },
                        ]}
                    />
                </div>
                <SearchInput
                    style={{ width: '180px' }}
                    placeholder="SEARCH STYLE"
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
                            width="170px"
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
                            width="170px"
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
                        key={`${d._id}-${index}-${Math.random() * 1000000}`}
                        {...d}
                    />
                ))}
                <ReactSVG
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
                />
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
}))(App);
