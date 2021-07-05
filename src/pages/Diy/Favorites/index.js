import React, { useState, useEffect } from 'react';
import { message, Popconfirm } from 'antd';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import lodash from 'lodash';
import { Flex, Box } from 'rebass/styled-components';
import Propmt from '@/components/Propmt';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import SelectAll from '@/components/SelectAll';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import ReactList from 'react-list';

import AllIcon from '@/public/icons/icon-all.svg';
import SelectedIcon from '@/public/icons/icon-selected-black.svg';
import OrderIcon from '@/public/icons/icon-order.svg';
import CapsuleIcon from '@/public/icons/icon-capsule.svg';
import EditIcon from '@/public/icons/icon-edit.svg';
import DelIcon from '@/public/icons/icon-del.svg';
import BigIcon from '@/public/icons/icon-big+.svg';
import ComputerIcon from '@/public/icons/icon-computer.svg';

import styles from './index.less';
import OrderModal from './order/index';

const favoriteBox = {
    small: { h: '16vw', w: 'calc(16.52% - 16px)', size: 6 },
    middle: { h: '23.4vw', w: 'calc(25% - 15px)', size: 9 },
    large: { h: '31.2vw', w: 'calc(33.3% - 13px)', size: 12 },
};

const App = ({ favoriteArr, dispatch, favoritePattern, currentGood = {}, currentAdminChannel }) => {
    const selectAll = favoriteArr.length === favoriteArr.filter(x => x.isSelected).length;
    // console.log('favoritePattern', favoritePattern);
    const [orderVisible, setOrderVisible] = useState(false);
    const [bigerVisible, setBigerVisible] = useState(false);
    const [capsuleInputVisible, setCapsuleInputVisible] = useState(false);
    // const handleFetchMore = async () => {
    //     // if (currentGood._id) {
    //     //     dispatch({
    //     //         type: 'diy/fetchFavoriteList',
    //     //         payload: { goodsId: currentGood._id },
    //     //     });
    //     // }
    // };
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
        window.scrollTo(0, 0);
        dispatch({
            type: 'diy/setFavoriteEditObj',
            payload: favorite,
        });

        let selectedColorsArr = favorite.styleAndColor.map(x => x.colorIds);
        let selectColors = lodash.union(lodash.flatten(selectedColorsArr).map(x => x._id));
        // console.log(selectColors);
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: {
                plainColors: selectColors,
                flowerColors: selectColors,
            },
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
    const handleToggleTime = async val => {
        window.timeOrder = !window.timeOrder;
        // // console.log('window.timeOrder', window.timeOrder);
        let nfavoriteArr = [];

        switch (val) {
            case 'Earliest':
                {
                    nfavoriteArr = favoriteArr.sort((a, b) => {
                        return new Date(a.updateTime).getTime() - new Date(b.updateTime).getTime();
                    });
                }
                break;
            case 'Latest':
                {
                    nfavoriteArr = favoriteArr.sort((a, b) => {
                        return new Date(b.updateTime).getTime() - new Date(a.updateTime).getTime();
                    });
                }
                break;
            case 'category':
                {
                    nfavoriteArr = favoriteArr.sort((a, b) => {
                        // // console.log('a.goodCategory.sort - b.goodCategory.sort', a.goodCategory.sort-b.goodCategory.sort)
                        return a.goodCategory.sort - b.goodCategory.sort;
                    });
                }
                break;
        }
        dispatch({
            type: 'diy/setFavoriteArr',
            payload: [...nfavoriteArr],
        });
    };

    const handleSelectAll = () => {
        // // console.log('handleSelectAll');
        dispatch({
            type: 'diy/toogleSelectAllFavorite',
            payload: !selectAll,
        });
    };

    const renderCountsInfo = () => {
        let infos = lodash.groupBy(favoriteArr, x => (x.goodCategory ? x.goodCategory.name : ''));
        return Object.keys(infos).map((k, gi) => (
            <Flex key={`${k.goodCategory?.name}-${gi}-counts`} flexDirection="column" alignItems="center" pl="10px">
                <div>{k}</div>
                <div>{infos[k].length}</div>
            </Flex>
        ));
    };

    const renderItem = index => {
        const favorite = favoriteArr[index];
        return (
            <div
                key={`${favorite._id}-favorite-${Math.random() * 1000000}`}
                style={{
                    position: 'relative',
                    justifySelf: 'stretch',
                    alignSelf: 'stretch',
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    background: '#FFFFFF',
                    borderRadius: '5px',
                    width: favoriteBox[favoritePattern].w,
                    height: favoriteBox[favoritePattern].h,
                    margin: '0 0 18px 18px',
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
                            width={`${(favoriteBox[favoritePattern].size * d.style.styleSize) / 27}vw`}
                            // width={favoriteBox[favoritePattern].size}
                            styleId={`${favorite._id}-${d._id}-favorite`}
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
        );
    };
    return (
        <div
            style={{
                padding: '30px 2.1%',
                background: '#4A4949',
                display: currentAdminChannel.codename === 'A' ? 'block' : 'none',
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
                    <Box
                        sx={{
                            display: 'grid',
                            gridAutoFlow: 'column',
                            gridTemplateColumns: '50% 50%',
                            gridTemplateRows:
                                Array.isArray(bigerVisible.styleAndColor) && bigerVisible.styleAndColor.length > 1
                                    ? '50% 50%'
                                    : '',
                        }}
                        width="700px"
                        color="#000"
                    >
                        {bigerVisible.styleAndColor.map((d, bi) => (
                            <Flex
                                alignItems={d.style.vposition}
                                key={`bigerVisible-${d._id}-${bi}`}
                                justifyContent="center"
                                width="350px"
                                py="40px"
                            >
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
                            </Flex>
                        ))}

                        {bigerVisible.styleAndColor.map((d, i) => (
                            <Flex
                                key={`bigerVisible-back-${d._id}-${i}`}
                                alignItems={d.style.vposition}
                                justifyContent="center"
                                width="350px"
                                py="40px"
                            >
                                <StyleItem
                                    width={`${(300 * d.style.styleBackSize) / 27}px`}
                                    styleId={`${bigerVisible._id}-${d._id}-${i}-big`}
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
                            </Flex>
                        ))}
                    </Box>
                ) : null}
            </Modal>
            <OrderModal
                visible={orderVisible}
                onCancel={() => {
                    setOrderVisible(false);
                    dispatch({
                        type: 'diy/toogleSelectAllFavorite',
                        payload: false,
                    });
                }}
            />
            <Propmt
                visible={capsuleInputVisible}
                placeholder="请输入胶囊名称："
                onOk={async input => {
                    // console.log('covermap');
                    if (!input) {
                        message.info('胶囊名称不能为空');
                        return;
                    }
                    await dispatch({
                        type: 'diy/createCapsule',
                        payload: { input },
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
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <Select
                        style={{ marginRight: '20px' }}
                        width="110px"
                        onChange={val => {
                            handleToggleTime(val);
                        }}
                        defaultValue="Latest"
                        options={[
                            { label: 'Latest', value: 'Latest' },
                            { label: 'Earliest', value: 'Earliest' },
                            { label: 'By category', value: 'category' },
                        ]}
                    />
                    <ReactSVG
                        style={{
                            width: '14px',
                            height: '14px',
                            marginRight: '6px',
                        }}
                        src={ComputerIcon}
                    />
                    <Select
                        value={favoritePattern}
                        onChange={val => {
                            handleChangeFavoritePattern(val);
                        }}
                        width="100px"
                        options={[
                            { label: 'Large', value: 'large' },
                            { label: 'Middle', value: 'middle' },
                            { label: 'Small', value: 'small' },
                        ]}
                    />
                </div>
                <SelectAll
                    selectAll={selectAll}
                    onSelectAll={() => {
                        handleSelectAll();
                    }}
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
                <Flex alignItems="center">
                    <Flex>
                        {renderCountsInfo()}
                        <Flex flexDirection="column" alignItems="center" pl="20px" pr="40px">
                            <div>ALL</div>
                            <div>{favoriteArr.length}</div>
                        </Flex>
                    </Flex>
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
            {/* <InfiniteScroll
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
                }} */}

            <Box
                // dataLength={favoriteArr.length}
                // next={handleFetchMore}
                // hasMore={false}
                // height={600}
                // inverse={true}
                mb="20px"
                style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: `repeat(auto-fill, ${favoriteBox[favoritePattern].w})`,
                    justifyItems: 'center',
                    alignItems: 'center',
                    gridGap: '20px 20px',
                    justifyContent: 'center',
                    alignContent: 'start',
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
                            background: '#FFFFFF',
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
                                    width={`${(favoriteBox[favoritePattern].size * d.style.styleSize) / 27}vw`}
                                    // width={favoriteBox[favoritePattern].size}
                                    styleId={`${favorite._id}-${d._id}-favorite`}
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
            </Box>
        </div>
    );
};

export default connect(({ diy = {}, channel = {} }) => ({
    favoriteArr: diy.favoriteArr,
    favoritePattern: diy.favoritePattern,
    currentGood: diy.currentGood,
    currentAdminChannel: channel.currentAdminChannel,
}))(App);
