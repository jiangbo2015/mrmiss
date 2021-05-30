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

const App = ({ styleList = { docs: [] }, collocationBg, dispatch, currentStyle = {}, selectColorList = [],
    selectColorList1,
    currentStyle1}) => {
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar-style2',
            hide: false,
        },
    };
    const paramsST = currentStyle1._id ? {
        scrollbar: {
            el: '.swiper-scrollbar-style2-st',
            hide: false,
        },
    } : params;
   
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
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flex: 1 }}>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    margin: '2vw 0',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    position: 'relative',
                    backgroundColor: collocationBg ? '#f7f7f7' : '#222222'
                }}
                // onClick={() => {
                //     handleSetCurrentStyleRegion(-1);
                //     handleSetCurrentStyleRegion2(-1);
                // }}
            >
                <div style={{ width: '20vw', marginBottom: '3vw' }}>
                    <div style={{color: '#fff', position: 'absolute' , right: 0}}>
                        {currentStyle.styleNo}
                    </div>
                    <Swiper
                        {...paramsST}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: '20px'
                            }}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="170px"
                                width={`${(currentStyle.styleSize / 27) * 16}vw`}
                                styleId={`expand-${currentStyle._id}`}
                                colors={selectColorList}
                                {...currentStyle}
                                styleId={currentStyle._id}
                                showGroupStroke={true}
                                // curStylesEditGroupIndex={currentStyleRegion - 1}
                                // onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingTop: '20px'
                            }}
                        >
                            <StyleItem
                                width={`${(currentStyle.styleBackSize / 27) * 16}vw`}
                                colors={selectColorList}
                                {...currentStyle}
                                styleId={`expand-back-${currentStyle._id}`}
                                svgUrl={currentStyle.svgUrlBack}
                                showGroupStroke={true}
                                shadowUrl={currentStyle.shadowUrlBack}
                                // curStylesEditGroupIndex={currentStyleRegion - 1}
                                // onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
                            />
                        </div>
                    </Swiper>
                </div>
                <div style={{ width: '20vw' , display: currentStyle1._id ?'block' :'none' }}>
                <div style={{color: '#fff', position: 'absolute' , right: 0}}>
                        {currentStyle1.styleNo}
                    </div>
                    <Swiper
                        {...params}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '10px'
                            }}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="170px"
                                width={`${(currentStyle1.styleSize / 27) * 16}vw`}
                                styleId={`expand-${currentStyle1._id}`}
                                colors={selectColorList1}
                                {...currentStyle1}
                                showGroupStroke={true}
                                // curStylesEditGroupIndex={currentStyleRegion2 - 1}
                                // onSetEditSvgGroupIndex={handleSetCurrentStyleRegion2}
                            />
                        </div>
                        <div
                            style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '10px'
                            }}
                        >
                            <StyleItem
                                width={`${(currentStyle1.styleBackSize / 27) * 16}vw`}
                                colors={selectColorList1}
                                {...currentStyle1}
                                styleId={`expand-back-${currentStyle1._id}`}
                                svgUrl={currentStyle1.svgUrlBack}
                                showGroupStroke={true}
                                shadowUrl={currentStyle1.shadowUrlBack}
                                // curStylesEditGroupIndex={currentStyleRegion1 - 1}
                                // onSetEditSvgGroupIndex={handleSetCurrentStyleRegion1}
                            />
                        </div>
                    </Swiper>
                </div>
            </div></div>
        </div>
    );
};

export default connect(({ diy = {} }) => ({
    styleList: diy.styleList,
    currentStyle: diy.currentStyle,
    collocationBg: diy.collocationBg,
    collocationPattern: diy.collocationPattern,
    // selectColorList: diy.selectColorList,
    selectColorList: diy.singleSelectColorList,
    selectColorList1: diy.singleSelectColorList1,
    currentStyle1: diy.currentStyle1,
    currentStyleRegion: diy.currentStyleRegion,
    currentStyleRegion1: diy.currentStyleRegion1,
}))(App);
