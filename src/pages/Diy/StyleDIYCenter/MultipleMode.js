import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import { InputNumber, Tooltip } from 'antd';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

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
    styleList = { docs: [] },
    selectStyleList,
    dispatch,
    selectColorList,
    currentGood = { category: [] },
    currentGoodCategory = '',
    styleQueryKey,
    styleQueryChangeKey,
    currentAdminChannel,
    assign,
    curChannslPrice,
}) => {
    const [selectAssignedStyleList, setSelectAssignedStyleList] = useState([]);
    let docs = [];
    if (styleList[currentGoodCategory]) {
        docs = styleList[currentGoodCategory];
        // console.log('docs', docs);
    }

    const handleFetchMore = async () => {
        if (currentGood._id) {
            const payload = {
                _id: currentGood._id,
            };
            if (styleQueryKey) {
                payload.styleNo = styleQueryKey;
            }
            dispatch({
                type: 'diy/fetchStyleList',
                payload,
            });
        }
    };

    const handleToggleTime = async () => {
        window.timeOrder = !window.timeOrder;
        console.log('window.timeOrder', window.timeOrder);

        styleList[currentGoodCategory] = styleList[currentGoodCategory].sort((a, b) => {
            return window.timeOrder
                ? new Date(b.createdAt ? b.createdAt : b.createTime).getTime() -
                      new Date(a.createdAt ? a.createdAt : a.createTime).getTime()
                : new Date(a.createdAt ? a.createdAt : a.createTime).getTime() -
                      new Date(b.createdAt ? b.createdAt : b.createTime).getTime();
        });
        dispatch({
            type: 'diy/setStyleList',
            payload: {
                ...styleList,
            },
        });
    };
    const handleChangeCollocationPattern = pattern => {
        dispatch({
            type: 'diy/setCollocationPattern',
            payload: pattern,
        });
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: { plainColors: [], flowerColors: [] },
        });
    };
    const handleSelectStyle = style => {
        dispatch({
            type: 'diy/toogleSelectStyle',
            payload: style,
        });
    };
    const handleSelectAll = () => {
        if (docs.length > selectStyleList.length) {
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload: [...selectStyleList, ...docs.filter(x => selectStyleList.findIndex(s => s._id === x._id) < 0)],
            });
        } else {
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload: [],
            });
        }
    };
    useEffect(() => {
        if (Array.isArray(currentGood.category) && currentGood.category.length > 0) {
            handleSetCurrentGoodCategory(currentGood.category[0]._id);
            handleFetchMore();
        }
    }, [currentGood, styleQueryKey]);
    useEffect(() => {
        dispatch({
            type: 'diy/setStyleQueryChangeKey',
            payload: '',
        });
        dispatch({
            type: 'diy/setStyleQueryKey',
            payload: '',
        });
    }, [currentGood, currentGoodCategory]);

    useEffect(() => {
        const { shopStyles = [] } = currentAdminChannel;
        setSelectAssignedStyleList(shopStyles);
        console.log('currentAdminChannel', shopStyles);
    }, [currentAdminChannel]);

    const handleEditPrice = ({ price, style }) => {
        console.log(selectStyleList);
        const findIndex = selectStyleList.findIndex(x => x._id === style);
        if (findIndex >= 0) {
            selectStyleList[findIndex].price = price;
            dispatch({
                type: 'diy/setSelectStyleList',
                payload: [...selectStyleList],
            });
        }
    };

    const handleSetCurrentGoodCategory = category => {
        dispatch({
            type: 'diy/setCurrentGoodCategory',
            payload: category,
        });
    };
    return (
        <div
            style={{
                padding: '28px 20px',
                background: '#222222',
            }}
        >
            <div
                style={{
                    marginBottom: '60px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Select
                        value={currentGoodCategory}
                        style={{ marginRight: '20px' }}
                        options={currentGood.category.filter(x => x.name !== '分体').map(c => ({ label: c.name, value: c._id }))}
                        onSelect={val => handleSetCurrentGoodCategory(val)}
                    />
                    <Select onClick={handleToggleTime} value="Time" disabled options={[{ label: 'Time', value: 'time' }]} />
                    <ReactSVG
                        src={AllIcon}
                        style={{
                            width: '20px',
                            height: '20px',
                            padding: '4px',
                            marginLeft: '12px',
                            marginBottom: '4px',
                            opacity: assign ? (selectStyleList.length < docs.length ? 0.3 : 1) : 0,
                            pointerEvents: assign ? 'painted' : 'none',
                        }}
                        onClick={() => {
                            handleSelectAll();
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
                        src={SingleIcon}
                        className="mode-icon"
                        style={{
                            opacity: assign ? 0 : 1,
                            pointerEvents: assign ? 'none' : 'painted',
                        }}
                        onClick={() => {
                            handleChangeCollocationPattern('single');
                        }}
                    />
                </div>
            </div>
            {/* InfiniteScroll */}
            <div
                // dataLength={docs.length}
                // next={handleFetchMore}
                // hasMore={false}
                // height={600}
                // inverse={true}
                style={{
                    width: '100%',
                    height: '600px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 160px)',
                    justifyItems: 'center',
                    alignItems: 'center',
                    gridGap: '20px 10px',
                    justifyContent: 'center',

                    alignContent: 'start',
                    overflowY: 'scroll',
                    gridTemplateRows: 'repeat(3, 1fr)',
                }}
                loader={<h4 style={{ color: '#fff' }}>Loading...</h4>}
            >
                {docs.map((d, index) => {
                    let selected = null;
                    if (d.isSelected) {
                        selected = selectStyleList.find(x => x.style === d._id);
                    }
                    return (
                        <div
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
                            <Tooltip title={d.styleNo} key={`${d._id}-tooltip`}>
                                <div
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onClick={() => {
                                        handleSelectStyle({ item: d, index });
                                    }}
                                >
                                    <StyleItem
                                        width={`${(d.styleSize / 27) * 100}px`}
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
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    padding: '0 20px',
                                    width: '100%',
                                    opacity: assign && d.isSelected ? 1 : 0,
                                    pointerEvents: assign && d.isSelected ? '' : 'none',
                                }}
                            >
                                <span>¥.{d.price}</span>
                                <InputNumber
                                    formatter={value => `¥${value}`}
                                    style={{ width: '70px' }}
                                    value={selected ? selected.price : d.price}
                                    onChange={value => {
                                        handleEditPrice({ style: d._id, price: value });
                                    }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default connect(({ diy = {}, channel = {} }) => ({
    styleList: diy.styleList,
    selectColorList: diy.selectColorList,
    selectStyleList: diy.selectStyleList,
    currentGood: diy.currentGood,
    currentGoodCategory: diy.currentGoodCategory,
    styleQueryKey: diy.styleQueryKey,
    styleQueryChangeKey: diy.styleQueryChangeKey,
    currentAdminChannel: channel.currentAdminChannel,
}))(App);
