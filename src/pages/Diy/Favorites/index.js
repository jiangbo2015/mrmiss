import React, { useState, useEffect } from 'react';
import { message, Popconfirm } from 'antd';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';
import Propmt from '@/components/Propmt';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import SelectedIcon from '@/public/icons/icon-selected-black.svg';
import OrderIcon from '@/public/icons/icon-order.svg';
import CapsuleIcon from '@/public/icons/icon-capsule.svg';
import EditIcon from '@/public/icons/icon-edit.svg';
import DelIcon from '@/public/icons/icon-del.svg';
import BigIcon from '@/public/icons/icon-big+.svg';

import styles from './index.less';
import OrderModal from './order/index';

const favoriteBox = {
    small: { h: '210px', w: '200px', size: '70px' },
    middle: { h: '290px', w: '280px', size: '100px' },
    large: { h: '370px', w: '360px', size: '140px' },
};

const App = ({ favoriteArr, dispatch, favoritePattern, currentGood = {} }) => {
    console.log('favoritePattern', favoritePattern);
    const [orderVisible, setOrderVisible] = useState(false);
    const [bigerVisible, setBigerVisible] = useState(false);
    const [capsuleInputVisible, setCapsuleInputVisible] = useState(false);
    const handleFetchMore = async () => {
        // if (currentGood._id) {
        //     dispatch({
        //         type: 'diy/fetchFavoriteList',
        //         payload: { goodsId: currentGood._id },
        //     });
        // }
    };
    useEffect(() => {
        if (currentGood._id) {
            dispatch({
                type: 'diy/fetchFavoriteList',
                payload: { goodsId: currentGood._id },
            });
        }
    }, [currentGood]);

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
    const handleEdit = favorite => {
        dispatch({
            type: 'diy/setFavoriteEditObj',
            payload: favorite,
        });
    };
    const handleBig = favorite => {
        setBigerVisible(favorite);
    };
    const handleDel = favorite => {
        dispatch({
            type: 'diy/deleteFavorite',
            payload: { _id: favorite._id },
        });
    };
    const handleToggleTime = async () => {
        window.timeOrder = !window.timeOrder;
        console.log('window.timeOrder', window.timeOrder);

        const nfavoriteArr = favoriteArr.sort((a, b) => {
            return window.timeOrder
                ? new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime()
                : new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime();
        });
        dispatch({
            type: 'diy/setFavoriteArr',
            payload: [...nfavoriteArr],
        });
    };
    return (
        <div
            style={{
                padding: '28px 20px',
                background: '#4A4949',
            }}
        >
            <Modal
                width="800px"
                visible={bigerVisible}
                onCancel={() => {
                    setBigerVisible(false);
                }}
                footer={false}
            >
                {bigerVisible ? (
                    <Flex m="60px" justifyContent="space-around">
                        <Box>
                            {bigerVisible.styleAndColor.map(d => (
                                <StyleItem
                                    width={`${(300 * d.style.styleSize) / 27}px`}
                                    styleId={`${bigerVisible._id}-${d._id}-item`}
                                    colors={d.colorIds}
                                    key={`${bigerVisible._id}-${d._id}-${Math.random() * 1000000}`}
                                    {...d.style}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Box>
                        <Box>
                            {bigerVisible.styleAndColor.map(d => (
                                <StyleItem
                                    width={`${(300 * d.style.styleBackSize) / 27}px`}
                                    styleId={`${bigerVisible._id}-${d._id}-item`}
                                    colors={d.colorIds}
                                    key={`${bigerVisible._id}-${d._id}-${Math.random() * 1000000}`}
                                    {...d.style}
                                    svgUrl={d.style.svgUrlBack}
                                    shadowUrl={d.style.shadowUrlBack}
                                    styleSize={d.style.styleBackSize}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </Box>
                    </Flex>
                ) : null}
            </Modal>
            <OrderModal
                visible={orderVisible}
                onCancel={() => {
                    setOrderVisible(false);
                    console.log('setOrderVisible');
                }}
            />
            <Propmt
                visible={capsuleInputVisible}
                placeholder="请输入胶囊名称："
                onOk={async input => {
                    if (!input) {
                        message.info('胶囊名称不能为空');
                        return;
                    }

                    console.log('input', input);
                    await dispatch({
                        type: 'diy/createCapsule',
                        payload: input,
                    });
                    setCapsuleInputVisible(false);
                }}
                onCancel={() => {
                    setCapsuleInputVisible(false);
                }}
            />
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
                        style={{ marginRight: '20px' }}
                        onClick={handleToggleTime}
                        value="Time"
                        disabled
                        options={[{ label: 'Time', value: 'time' }]}
                    />

                    <Select
                        value={favoritePattern}
                        onChange={val => {
                            handleChangeFavoritePattern(val);
                        }}
                        width="100px"
                        options={[
                            { label: 'Large', value: 'large' },
                            { label: 'middle', value: 'middle' },
                            { label: 'small', value: 'small' },
                        ]}
                    />
                </div>
                <Flex alignItems="baseline">
                    <ReactSVG
                        style={{
                            padding: '8px',
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#161616',
                            borderRadius: '50%',
                            marginRight: '16px',
                        }}
                        src={CapsuleIcon}
                        onClick={() => {
                            setCapsuleInputVisible(true);
                        }}
                    />
                    <ReactSVG
                        style={{
                            padding: '7px',
                            width: '32px',
                            height: '32px',
                            backgroundColor: '#161616',
                            borderRadius: '50%',
                        }}
                        src={OrderIcon}
                        onClick={() => {
                            setOrderVisible(true);
                            dispatch({ type: 'diy/toDoOrder' });
                        }}
                    />
                </Flex>
            </div>
            <InfiniteScroll
                dataLength={favoriteArr.length}
                next={handleFetchMore}
                hasMore={false}
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
            >
                {favoriteArr.map((favorite, index) => (
                    <div
                        key={`${favorite._id}-favorite-${Math.random() * 1000000}`}
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
                                margin: '12px 0 0 14px',
                                width: '14px',
                                height: '14px',
                                opacity: favorite.isSelected ? 1 : 0,
                                alignSelf: 'flex-start',
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
                                    key={`${favorite._id}-${d._id}-${Math.random() * 1000000}`}
                                    {...d.style}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                />
                            ))}
                        </div>
                        <div className="toolBar" style={{ display: 'flex', marginBottom: '10px' }}>
                            <ReactSVG
                                style={{
                                    width: '14px',
                                    height: '14px',
                                }}
                                src={EditIcon}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleEdit(favorite);
                                }}
                            />
                            <ReactSVG
                                style={{
                                    width: '14px',
                                    height: '14px',
                                    margin: '0 30px',
                                }}
                                src={BigIcon}
                                onClick={e => {
                                    e.stopPropagation();
                                    handleBig(favorite);
                                }}
                            />
                            <Popconfirm
                                title="确认删除吗？"
                                onConfirm={() => {
                                    handleDel(favorite);
                                }}
                            >
                                <ReactSVG
                                    style={{
                                        width: '14px',
                                        height: '14px',
                                    }}
                                    src={DelIcon}
                                    onClick={e => {
                                        e.stopPropagation();
                                    }}
                                />
                            </Popconfirm>
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default connect(({ diy = {} }) => ({
    favoriteArr: diy.favoriteArr,
    favoritePattern: diy.favoritePattern,
    currentGood: diy.currentGood,
}))(App);
