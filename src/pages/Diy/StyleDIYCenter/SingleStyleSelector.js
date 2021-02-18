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
    currentStyle = {},
    selectColorList = [],
    currentStyleRegion,
    docs,
    handleSelectStyle,
    handleSetCurrentStyleRegion,
}) => {
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
    };

    return docs.length === 0 ? null : (
        <>
            <div
                style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => {
                    handleSetCurrentStyleRegion(-1);
                }}
            >
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
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="170px"
                                width={`${(currentStyle.styleSize / 27) * 170}px`}
                                styleId={`single-${currentStyle._id}`}
                                colors={selectColorList}
                                {...currentStyle}
                                styleId={currentStyle._id}
                                showGroupStroke={true}
                                curStylesEditGroupIndex={currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
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
                                showGroupStroke={true}
                                shadowUrl={currentStyle.shadowUrlBack}
                                curStylesEditGroupIndex={currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
                            />
                        </div>
                    </Swiper>
                </div>
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
        </>
    );
};

export default App;
