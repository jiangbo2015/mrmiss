import React from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import SelectedIcon from '@/public/icons/icon-selected-black.svg';
import SingleIcon from '@/public/icons/icon-single.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

import styles from './index.less';

const favoriteBox = {
    small: { h: '210px', w: '200px', size: '70px' },
    middle: { h: '290px', w: '280px', size: '100px' },
    large: { h: '370px', w: '360px', size: '140px' },
};

const App = ({ favoriteArr, dispatch, favoritePattern }) => {
    console.log('favoritePattern', favoritePattern);
    // const { docs } = styleList;
    const handleFetchMore = async () => {
        console.log('fetchStyleList');
        // await waitTime(1000);
        console.log('go go');
        // dispatch({
        //     type: 'diy/fetchStyleList',
        // });
    };
    const handleChangeFavoritePattern = pattern => {
        dispatch({
            type: 'diy/setFavoritePattern',
            payload: pattern,
        });
    };
    const handleSelectFavorite = style => {
        dispatch({
            type: 'diy/toogleSelectFavorite',
            payload: style,
        });
    };
    return (
        <div
            style={{
                padding: '28px 20px',
                background: '#4A4949',
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
                        style={{ marginRight: '28px' }}
                        options={[
                            { label: 'Time', value: 'time' },
                            { label: 'Color', value: 'color' },
                        ]}
                    />
                    <Select
                        value={favoritePattern}
                        onChange={val => {
                            handleChangeFavoritePattern(val);
                        }}
                        options={[
                            { label: 'Large', value: 'large' },
                            { label: 'middle', value: 'middle' },
                            { label: 'small', value: 'small' },
                        ]}
                    />
                </div>
            </div>
            <InfiniteScroll
                dataLength={favoriteArr.length}
                next={handleFetchMore}
                hasMore={true}
                height={600}
                // inverse={true}
                style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, ${favoriteBox[favoritePattern].w})`,
                    justifyItems: 'center',
                    alignItems: 'center',
                    gridGap: '20px 20px',
                    justifyContent: 'center',
                    alignContent: 'start',
                    overflowY: 'scroll',
                    gridTemplateRows: 'repeat(3, 1fr)',
                }}
                loader={<h4 style={{ color: '#fff' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center', color: '#fff' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {favoriteArr.map((favorite, index) => (
                    <div
                        key={`${favorite._id}-favorite-${Math.random() *
                            1000000}`}
                        style={{
                            position: 'relative',
                            justifySelf: 'stretch',
                            alignSelf: 'stretch',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            background: '#DAD9D7',
                            borderRadius: '5px',
                            height: favoriteBox[favoritePattern].h,
                        }}
                        className="favoriteItem"
                        onClick={() => {
                            handleSelectFavorite({ item: favorite, index });
                        }}
                    >
                        <ReactSVG
                            style={{
                                width: '10px',
                                height: '10px',
                                opacity: favorite.isSelected ? 1 : 0,
                            }}
                            src={SelectedIcon}
                        />
                        <div
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                            }}
                        >
                            {favorite.styleAndColor.map(d => (
                                <StyleItem
                                    width={favoriteBox[favoritePattern].size}
                                    styleId={`${favorite._id}-${d._id}-item`}
                                    colors={d.colorIds}
                                    key={`${favorite._id}-${
                                        d._id
                                    }-${Math.random() * 1000000}`}
                                    {...d.style}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="toolBar" style={{ display: 'flex' }}>
                            <ReactSVG
                                style={{
                                    width: '10px',
                                    height: '10px',
                                }}
                                src={SelectedIcon}
                            />
                            <ReactSVG
                                style={{
                                    width: '10px',
                                    height: '10px',
                                }}
                                src={SelectedIcon}
                            />
                            <ReactSVG
                                style={{
                                    width: '10px',
                                    height: '10px',
                                }}
                                src={SelectedIcon}
                            />
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default connect(({ diy }) => ({
    favoriteArr: diy.favoriteArr,
    favoritePattern: diy.favoritePattern,
}))(App);
