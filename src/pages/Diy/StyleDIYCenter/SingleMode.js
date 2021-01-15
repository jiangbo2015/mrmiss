import React from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import ArrowIcon from '@/public/icons/icon-arrow.svg';
import ExpandIcon from '@/public/icons/icon-expand.svg';
import MultipleIcon from '@/public/icons/icon-multiple.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

import Swiper from 'react-id-swiper';
import styles from './index.less';
import { Flex } from 'rebass';

const settings = {
    slidesPerView: 3,
    spaceBetween: 30,
    className: styles.styleSelector,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    renderPrevButton: props => (
        <div {...props} class="swiper-button-next">
            <ReactSVG
                src={ArrowIcon}
                className={styles.nextIcon}
                style={{
                    width: '18px',
                    height: '18px',
                    transform: 'rotateZ(180deg)',
                }}
            />
        </div>
    ),
    renderNextButton: props => (
        <div {...props} class="swiper-button-prev">
            <ReactSVG
                src={ArrowIcon}
                className={styles.nextIcon}
                style={{
                    width: '18px',
                    height: '18px',
                }}
            />
        </div>
    ),
};

const waitTime = time => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};

const App = ({ styleList = { docs: [] }, dispatch, currentStyle = {} }) => {
    const { docs } = styleList;
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
                    marginBottom: '60px',
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
                    <ReactSVG src={ExpandIcon} className="mode-icon" />
                    <ReactSVG
                        src={SwitchBgIcon}
                        className="mode-icon"
                        style={{ margin: '0 12px' }}
                        onClick={() => {
                            handleChangeCollocationBg(true);
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

            <StyleItem
                style={{
                    margin: '0 auto',
                }}
                width="180px"
                {...currentStyle}
            />
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
    collocationBg: diy.collocationBg,
    collocationPattern: diy.collocationPattern,
}))(App);
