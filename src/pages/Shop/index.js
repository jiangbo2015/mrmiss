import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, Image } from 'rebass/styled-components';
import { Button } from 'antd';
import { ReactSVG } from 'react-svg';
import { connect } from 'dva';
import lodash from 'lodash'

import CapsItem from '@/components/Capsule/ShopItem';
import ModalShopSimple from '@/components/Capsule/ModalShopSimple';
import ModalComplex from '@/components/Capsule/ModalShopComplex';
import More from '@/components/Capsule/More';
import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import SaveIcon from '@/public/icons/icon-save2.svg';
import { EditOutlined } from '@ant-design/icons';
import Search from '@/components/SearchInput';
import SelectedIcon from '@/public/icons/icon-selected-black.svg';

import Cart from '@/components/Cart';
import IconShopCar from '@/public/icons/icon-shop.svg';

const Shop = ({
    branchList,
    dispatch,
    currentBranch,
    currentShopStyle = {},
    currentSelectedBar,
    shopStyleList,
    currentAdminChannel = {},
    shopStyleTopAndBottomList,
    currentUser,
}) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [visibleComplex, setVisibleComplex] = useState(false);
    const [haveTopAndBottom, setHaveTopAndBottom] = useState(false);
    const [queryKey, setQueryKey] = useState('');

    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const [selectAssignedStyleList, setSelectAssignedStyleList] = useState([]);
    useEffect(() => {
        dispatch({
            type: 'shop/fetchBranchList',
        });
    }, []);
    useEffect(() => {
        // console.log('currentSelectedBar', currentSelectedBar);
        handleLoadMore(1);
    }, [queryKey, currentSelectedBar]);

    useEffect(() => {
        if (currentAdminChannel.codename === 'A' && currentBranch) {
            let haveTopMap = {}
            currentBranch.children.map(x => {
                if ((x.nameen && x.nameen.toUpperCase()) === 'TOP' || x.namecn.includes('单衣')) {
                    let key = x.namecn.replace('单衣','')
                    if(!haveTopMap[key]) {
                        haveTopMap[key] = {}
                    }
                    
                    haveTopMap[key].top = x
                } else if ((x.nameen && x.nameen.toUpperCase()) === 'BOTTOM' || x.namecn.includes('单裤')) {
                    let key = x.namecn.replace('单裤','')
                    if(!haveTopMap[key]) {
                        haveTopMap[key] = {}
                    }
                    haveTopMap[key].bottom = x
                }
            });

            console.log('haveTopMap', haveTopMap)

            for (const key in haveTopMap) {
                if(!haveTopMap[key].top || !haveTopMap[key].bottom) {
                    delete haveTopMap[key]
                }
            }

            if (Object.keys(haveTopMap).length) {
                setHaveTopAndBottom(haveTopMap);
            } else {
                setHaveTopAndBottom(false);
            }
        } else {
            setHaveTopAndBottom(false);
        }
    }, [currentBranch, currentAdminChannel]);

    useEffect(() => {
        if (haveTopAndBottom) {
            dispatch({
                type: 'shop/fetchShopStyleTopAndList',
                payload: haveTopAndBottom,
            });
        }
    }, [haveTopAndBottom]);

    useEffect(() => {
        if (currentShopStyle._id) {
            let payload = { branch: currentBranch._id, branchKind: currentShopStyle.branchKind, limit: 4 };

            dispatch({
                type: 'shop/fetchShopStyleAboutList',
                payload,
            });
        }
    }, [currentShopStyle]);

    const handleLoadMore = page => {
        // console.log('handleLoadMore', page);
        if (currentBranch._id) {
            let payload = { branch: currentBranch._id, page: page ? page : shopStyleList.page + 1 };
            if (queryKey) {
                payload.code = queryKey;
            }
            if (currentBranch._id !== currentSelectedBar._id) {
                payload.branchKind = currentSelectedBar._id;
            }
            dispatch({
                type: 'shop/fetchShopStyleList',
                payload,
            });
        }
    };

    const handleOnSearch = e => {
        setQueryKey(e.target.value);
    };
    // swiper 实例

    const handleSelectBranch = (branch, select) => {
        dispatch({
            type: 'shop/setCurrentBranch',
            payload: branch,
        });
        dispatch({
            type: 'shop/setCurrentSelectedBar',
            payload: select,
        });
    };

    useEffect(() => {
        const { shopStyles = [] } = currentAdminChannel;
        setSelectAssignedStyleList(shopStyles);
        // console.log('currentAdminChannel', shopStyles);
    }, [currentAdminChannel]);

    const handleOpenDetail = capsule => {
        if (currentAdminChannel.codename === 'A') {
            for (const key in haveTopAndBottom) {
                const element = haveTopAndBottom[key];
                if(capsule.branchKind === element.top._id){
                    const index = shopStyleTopAndBottomList[key].top.findIndex(x => x._id === capsule._id);
                    dispatch({
                        type: 'shop/setCurrentShopKey',
                        payload: key,
                    });
                    dispatch({
                        type: 'shop/setCurrentShopTopStyleIndex',
                        payload: index > 0 ? index : 0,
                    });
                    dispatch({
                        type: 'shop/setCurrentShopBottomStyleIndex',
                        payload: lodash.random(shopStyleTopAndBottomList[key].bottom.length - 1),
                    });
                    setVisibleComplex(true);
                    return;
                }else if (capsule.branchKind === element.bottom._id) {
                    // console.log('--bottom--');
                    const index = shopStyleTopAndBottomList[key].bottom.findIndex(x => x._id === capsule._id);
                    dispatch({
                        type: 'shop/setCurrentShopKey',
                        payload: key,
                    });
                    dispatch({
                        type: 'shop/setCurrentShopBottomStyleIndex',
                        payload: index > 0 ? index : 0,
                    });
                    dispatch({
                        type: 'shop/setCurrentShopTopStyleIndex',
                        payload: lodash.random(shopStyleTopAndBottomList[key].top.length - 1),
                    });
                    setVisibleComplex(true);
                    return;
                }
            }

            dispatch({
                type: 'shop/setCurrentShopStyle',
                payload: capsule,
            });
            setVisible(true);
        } else {
            // 分配
            const findIndex = selectAssignedStyleList.findIndex(x => x.style === capsule._id);
            if (findIndex < 0) {
                setSelectAssignedStyleList([...selectAssignedStyleList, { style: capsule._id, price: capsule.price }]);
            } else {
                selectAssignedStyleList.splice(findIndex, 1);
                setSelectAssignedStyleList([...selectAssignedStyleList]);
            }
        }
    };

    const handleAssigned = async () => {
        await dispatch({
            type: 'channel/update',
            payload: {
                codename: currentAdminChannel.codename,
                assignedId: currentAdminChannel.assignedId,
                shopStyles: selectAssignedStyleList,
            },
        });
    };

    const handleEditPrice = ({ price, style }) => {
        const findIndex = selectAssignedStyleList.findIndex(x => x.style === style);
        if (findIndex >= 0) {
            selectAssignedStyleList[findIndex].price = price;
            setSelectAssignedStyleList([...selectAssignedStyleList]);
        }
    };

    const handleSelectAll = () => {
        // console.log('selectedAll', selectedAll);
        if (!selectedAll) {
            setSelectedAll(true);
            setSelectAssignedStyleList(
                selectAssignedStyleList.concat(
                    shopStyleList.docs
                        .filter(x => selectAssignedStyleList.findIndex(s => s.style === x._id) < 0)
                        .map(c => ({ style: c._id, price: c.price })),
                ),
            );
        } else {
            setSelectedAll(false);
            setSelectAssignedStyleList([]);
        }
    };

    const handleSelect = capsule => {
        // console.log(capsule);
        const findIndex = selectedList.findIndex(x => x.style === capsule._id);
        if (findIndex < 0) {
            setSelectedList([...selectedList, { style: capsule._id, price: capsule.price }]);
        } else {
            selectedList.splice(findIndex, 1);
            setSelectedList([...selectedList]);
        }
    };

    return (
        <Layout pt="74px" bg="#F7F7F7">
            <section>
                <Box bg="#F7F7F7" py="90px" maxWidth="1480px" mx="auto">
                    <Title
                        title="SHOP"
                        subtitle="This season's capsule is launched by mrmiss 2021 limited capsule
            series-parent-child family series. I hope you can find your favorite
            products here..."
                    />
                </Box>
                <Box css={{ position: 'relative' }} maxWidth="1480px" mx="auto">
                <Flex mx="auto" pt="30px" pb="20px" px="8px" maxWidth="1480px"  justifyContent="space-between" sx={{ position: 'relative' }}>
                            <Search
                                mode="white"
                                style={{ width: '200px' }}
                                placeholder="SEARCH STYLE"
                                onSearch={handleOnSearch}
                            />
                            

                            <Switcher assigned={currentBranch} ref={ref} noRelative>
                                <Box
                                    bg="#DFDFDF"
                                    p="4px"
                                    mt="20px"
                                    width="24px"
                                    height="24px"
                                    sx={{
                                        borderRadius: '4px',
                                        visibility: currentAdminChannel.codename === 'A' ? 'hidden' : 'visible',
                                    }}
                                >
                                    <ReactSVG
                                        src={SelectedIcon}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            opacity: selectedAll ? '1' : '0.3',
                                        }}
                                        onClick={handleSelectAll}
                                    />
                                </Box>
                            </Switcher>

                            <Flex width="200px" justifyContent="flex-end" alignItems="flex-start">
                            {currentAdminChannel.codename === 'A' ? ( //通道A才能下单
                                <Cart
                                    triggle={
                                        <Button
                                            shape="circle"
                                            size="large"
                                            icon={
                                                <ReactSVG
                                                    style={{ width: '20px', height: '20px', margin: 'auto' }}
                                                    src={IconShopCar}
                                                />
                                            }
                                            style={{ backgroundColor: '#D2D2D2' }}
                                        />
                                    }
                                    selectedList={selectedList}
                                    clearSelected={() => {
                                        setSelectedList([]);
                                    }}
                                />
                            ) : <Button
                            onClick={handleAssigned}
                            shape="circle"
                            size="large"
                            icon={
                                <ReactSVG
                                    style={{ width: '20px', height: '20px', margin: '4px 11px 10px 11px' }}
                                    src={SaveIcon}
                                />
                            }
                            style={{ backgroundColor: '#D2D2D2', marginTop: '-4px'}}
                        />}
                                </Flex>
                        </Flex>
                        
                    
                    <Flex py='80px' css={{ position: 'relative' }} justifyContent="space-between" maxWidth="1480px" mx="auto">
                        <SidebarStyles data={branchList} selectedItem={currentSelectedBar} onSelect={handleSelectBranch} />
                        <Container>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, 32%)',
                                placeItems: 'center',
                                gap: '20px',
                            }}
                        >
                            {shopStyleList.docs.map((item, index) => {
                                const selected =
                                    currentAdminChannel.codename === 'A'
                                        ? selectedList.find(x => x.style === item._id)
                                        : selectAssignedStyleList.find(x => x.style === item._id);
                                return (
                                    <CapsItem
                                        bg="#ffffff"
                                        item={item}
                                        key={`${item._id}-capsule`}
                                        showNum={currentUser.role == 1 ? item.caseNum : item.numInBag}
                                        handleOpen={() => handleOpenDetail(item)}
                                        curChannelPrice={selected ? selected.price : item.price}
                                        isSelect={!!selected}
                                        isAssign={currentAdminChannel.codename !== 'A'}
                                        onSelect={handleSelect}
                                        onEditPrice={currentAdminChannel.codename === 'A' || !selected ? null : handleEditPrice}
                                    />
                                );
                            })}
                        </Box>
                        

                        </Container>
<More
                            onLoadMore={() => {
                                handleLoadMore();
                            }}
                            hasMore={shopStyleList.page < shopStyleList.pages}
                        />
                    </Flex>
                </Box>
            </section>
            {visible && <ModalShopSimple visible={visible} onClose={() => setVisible(false)} />}
            {visibleComplex && <ModalComplex visible={visibleComplex} onClose={() => setVisibleComplex(false)} />}
        </Layout>
    );
};

export default connect(({ shop, channel, user }) => ({
    branchList: shop.branchList,
    currentBranch: shop.currentBranch,
    shopStyleList: shop.shopStyleList,
    shopStyleTopAndBottomList: shop.shopStyleTopAndBottomList,
    currentAdminChannel: channel.currentAdminChannel,
    currentSelectedBar: shop.currentSelectedBar,
    currentShopStyle: shop.currentShopStyle,
    currentUser: user.info,
}))(Shop);
