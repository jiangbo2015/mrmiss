import React from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import NarrowIcon from '@/public/icons/icon-narrow.svg';

import Swiper from 'react-id-swiper';
import styles from './index.less';
import { Flex } from 'rebass';

const waitTime = time => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};

const App = ({ dispatch, favoriteEditObj = { styleAndColor: [] }, selectColorList = [] }) => {
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false,
        },
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
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <ReactSVG
                    src={NarrowIcon}
                    className="mode-icon"
                    onClick={() => {
                        handleChangeCollocationPattern('single');
                    }}
                />
            </div>
            <div 
                onClick={() => {
                    favoriteEditObj.styleAndColor[0].currentStyleRegion = 0;
                    if(favoriteEditObj.styleAndColor.length > 1) {
                        favoriteEditObj.styleAndColor[1].currentStyleRegion = 0;
                    }
                    dispatch({
                        type: 'diy/setFavoriteEditObj',
                        payload: {
                            ...favoriteEditObj,
                        },
                    });
                }}
                style={{ width: '560px', display: 'flex', alignItems: 'center', flex: 1 }}
            >
                <Swiper
                    {...params}
                    style={{
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            width: '560px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',
                          
                        }}
                    >
                        {favoriteEditObj.styleAndColor.map((d, i) => (
                            <StyleItem
                                width={`${(300 * d.style.styleSize) / 27}px`}
                                styleId={`${favoriteEditObj._id}-${d._id}-${i}-item`}
                                colors={d.colorIds}
                                key={`${favoriteEditObj._id}-${d._id}-${Math.random() * 1000000}`}
                                {...d.style}
                                style={{
                                    cursor: 'pointer',
                                    paddingBottom: i ? '0':'60px'
                                }}
                                showGroupStroke={true}
                                curStylesEditGroupIndex={d.currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={val => {
                                    favoriteEditObj.styleAndColor[i].currentStyleRegion = val + 1;
                                    favoriteEditObj.styleAndColor[(i + 1) % 2].currentStyleRegion = 0;
                                    dispatch({
                                        type: 'diy/setFavoriteEditObj',
                                        payload: {
                                            ...favoriteEditObj,
                                        },
                                    });
                                }}
                            />
                        ))}
                    </div>
                    <div
                        style={{
                            width: '560px',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center',

                        }}
                    >
                        {favoriteEditObj.styleAndColor.map((d, i) => (
                            <StyleItem
                                width={`${(300 * d.style.styleBackSize) / 27}px`}
                                styleId={`${favoriteEditObj._id}-${d._id}-${i}-item1`}
                                colors={d.colorIds}
                                key={`${favoriteEditObj._id}-${d._id}-${Math.random() * 1000000}`}
                                {...d.style}
                                svgUrl={d.style.svgUrlBack}
                                shadowUrl={d.style.shadowUrlBack}
                                styleSize={d.style.styleBackSize}
                                style={{
                                    cursor: 'pointer',
                                    paddingBottom: i ? '0':'60px'
                                }}
                                showGroupStroke={true}
                                curStylesEditGroupIndex={d.currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={val => {
                                    favoriteEditObj.styleAndColor[i].currentStyleRegion = val + 1;
                                    favoriteEditObj.styleAndColor[(i + 1) % 2].currentStyleRegion = 0;
                                    dispatch({
                                        type: 'diy/setFavoriteEditObj',
                                        payload: {
                                            ...favoriteEditObj,
                                        },
                                    });
                                }}
                            />
                        ))}
                    </div>
                </Swiper>
            </div>
        </div>
    );
};

export default connect(({ diy = {} }) => ({
    favoriteEditObj: diy.favoriteEditObj,
    collocationPattern: diy.collocationPattern,
    selectColorList: diy.selectColorList,
    currentStyleRegion: diy.currentStyleRegion,
    currentStyleRegion1: diy.currentStyleRegion1,
}))(App);
