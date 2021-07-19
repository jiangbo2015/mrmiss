import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import { InputNumber, Tooltip } from 'antd';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
// import InfiniteScroll from 'react-infinite-scroll-component';
import ReactList from 'react-list';
// react-list
import SelectedIcon from '@/public/icons/icon-selected.svg';
import SingleIcon from '@/public/icons/icon-single.svg';
import AllIcon from '@/public/icons/icon-all.svg';

const waitTime = time => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};
window.timeOrder = false;
const App = ({
    selectColorList,
    currentGoodCategoryMultiple = '',
    assign,
    styleList,
    handleStyle,
    // curChannslPrice,
    currentGoodCategoryIsTop
}) => {
    let docs = [];
    // let selectedNum = 0;
    if (styleList[currentGoodCategoryMultiple]) {
        docs = styleList[currentGoodCategoryMultiple];
        // selectedNum = docs.filter(x => x.isSelected).length;
        // console.log('docs', docs);
    }

    return (
            <div
                style={{
                    width: '100%',
                    height: '600px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
                    justifyItems: 'center',
                    alignItems: 'center',
                    gridGap: '20px 0',
                    justifyContent: 'center',
                    alignContent: 'start',
                    overflowY: 'scroll',
                    gridTemplateRows: 'repeat(3, 1fr)',
                }}
                loader={<h4 style={{ color: '#fff' }}>Loading...</h4>}
            >
                {docs.map((d, index) => {
                    return (
                        <div
                            key={`${d._id}-${currentGoodCategoryMultiple}-${index}`}
                            style={{
                                position: 'relative',
                                justifySelf: 'stretch',
                                alignSelf: 'stretch',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                color: '#ffffff',
                            }}
                        >
                            <ReactSVG
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    opacity: d.isSelected ? 1 : 0,
                                }}
                                src={SelectedIcon}
                            />
                            <Tooltip
                                title={d.styleNo}
                                key={`${d._id}-tooltip`}
                                getPopupContainer={() => {
                                    if (!window.multipleModeDiv) {
                                        window.multipleModeDiv = document.getElementById('multiple-mode');
                                    }
                                    if (!window.multipleModeDiv) {
                                        return document.body;
                                    }
                                    return window.multipleModeDiv;
                                }}
                            >
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: currentGoodCategoryIsTop ? 'flex-start' : 'center',
                                    }}
                                    onClick={() => {
                                        handleStyle({ item: d, index });
                                    }}
                                >
                                    <StyleItem
                                        width={`${(d.styleSize / 27) * 7}vw`}
                                        styleId={`${d._id}-item`}
                                        colors={
                                            assign
                                                ? []
                                                : [
                                                      selectColorList[0],
                                                      selectColorList[0],
                                                      selectColorList[0],
                                                      selectColorList[0],
                                                      selectColorList[0],
                                                      selectColorList[0],
                                                  ]
                                        }
                                        key={`${d._id}-${index}-${Math.random() * 1000000}`}
                                        {...d}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    );
                })}
            </div>
    );
};

export default connect(({ diy = {}}) => ({
    styleList: diy.styleList,
    selectColorList: diy.selectColorList,
    currentGoodCategoryMultiple: diy.currentGoodCategoryMultiple,
}))(App);
