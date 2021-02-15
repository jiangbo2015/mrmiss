import React, { useEffect } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import SelectedIcon from '@/public/icons/icon-selected.svg';
import SingleIcon from '@/public/icons/icon-single.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

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
    selectColorList,
    currentGood = { category: [] },
    currentGoodCategory = '',
}) => {
    let docs = [];
    if (styleList[currentGoodCategory]) {
        docs = styleList[currentGoodCategory];
        // console.log('docs', docs);
    }
    const handleFetchMore = async () => {
        if (currentGood._id) {
            dispatch({
                type: 'diy/fetchStyleList',
                payload: {
                    _id: currentGood._id,
                },
            });
        }
    };
    const handleChangeCollocationPattern = pattern => {
        dispatch({
            type: 'diy/setCollocationPattern',
            payload: pattern,
        });
    };
    const handleSelectStyle = style => {
        dispatch({
            type: 'diy/toogleSelectStyle',
            payload: style,
        });
    };

    useEffect(() => {
        if (Array.isArray(currentGood.category) && currentGood.category.length > 0) {
            handleSetCurrentGoodCategory(currentGood.category[0]._id);
            handleFetchMore();
        }
    }, [currentGood]);
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
                    <Select value="Time" disabled options={[{ label: 'Time', value: 'time' }]} />
                </div>
                <SearchInput style={{ width: '180px' }} placeholder="SEARCH STYLE" />
                <div style={{ display: 'flex' }}>
                    <ReactSVG
                        src={SingleIcon}
                        className="mode-icon"
                        onClick={() => {
                            handleChangeCollocationPattern('single');
                        }}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={docs.length}
                next={handleFetchMore}
                hasMore={false}
                height={600}
                // inverse={true}
                style={{
                    width: '100%',
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
                {docs.map((d, index) => (
                    <div
                        style={{
                            position: 'relative',
                            justifySelf: 'stretch',
                            alignSelf: 'stretch',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
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
                                colors={selectColorList}
                                key={`${d._id}-${index}-${Math.random() * 1000000}`}
                                {...d}
                                style={{
                                    cursor: 'pointer',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default connect(({ diy = {} }) => ({
    styleList: diy.styleList,
    selectColorList: diy.selectColorList,
    currentGood: diy.currentGood,
    currentGoodCategory: diy.currentGoodCategory,
}))(App);
