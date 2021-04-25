import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, Image } from 'rebass/styled-components';
import { Button } from 'antd';
import { ReactSVG } from 'react-svg';
import { connect } from 'dva';

import CapsItem from '@/components/Capsule/ShopItem';
import ModalShopSimple from '@/components/Capsule/ModalShopSimple';
import ModalComplex from '@/components/Capsule/ModalShopComplex';
import More from '@/components/Capsule/More';
import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import banner from '@/public/shop.jpeg';
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
        console.log('currentSelectedBar', currentSelectedBar);
        handleLoadMore(1);
    }, [queryKey, currentSelectedBar]);

    useEffect(() => {
        if (currentAdminChannel.codename === 'A') {
            let haveTop = false;
            let haveBottom = false;
            currentBranch.children.map(x => {
                if (x.nameen.toUpperCase() === 'TOP') {
                    haveTop = x;
                } else if (x.nameen.toUpperCase() === 'BOTTOM') {
                    haveBottom = x;
                }
            });

            if (haveTop && haveBottom) {
                setHaveTopAndBottom({ top: haveTop, bottom: haveBottom });
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
        console.log('handleLoadMore', page);
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
        console.log('currentAdminChannel', shopStyles);
    }, [currentAdminChannel]);

    const handleOpenDetail = capsule => {
        if (currentAdminChannel.codename === 'A') {
            if (haveTopAndBottom) {
                let index = 0;
                if (capsule.branchKind === haveTopAndBottom.top._id) {
                    console.log('--top--');
                    index = shopStyleTopAndBottomList.top.findIndex(x => x._id === capsule._id);
                    dispatch({
                        type: 'shop/setCurrentShopTopStyleIndex',
                        payload: index > 0 ? index : 0,
                    });
                    setVisibleComplex(true);
                    return;
                } else if (capsule.branchKind === haveTopAndBottom.bottom._id) {
                    console.log('--bottom--');
                    index = shopStyleTopAndBottomList.bottom.findIndex(x => x._id === capsule._id);
                    dispatch({
                        type: 'shop/setCurrentShopBottomStyleIndex',
                        payload: index > 0 ? index : 0,
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
        console.log('selectedAll', selectedAll);
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
        console.log(capsule);
        const findIndex = selectedList.findIndex(x => x.style === capsule._id);
        if (findIndex < 0) {
            setSelectedList([...selectedList, { style: capsule._id, price: capsule.price }]);
        } else {
            selectedList.splice(findIndex, 1);
            setSelectedList([...selectedList]);
        }
    };

    return (
        <Layout pt="74px" bg="#ffffff">
            <section>
                <Box bg="#fff" py="90px" maxWidth="1440px" mx="auto">
                    <Title
                        title="SHOP"
                        subtitle="This season's capsule is launched by mrmiss 2021 limited capsule
            series-parent-child family series. I hope you can find your favorite
            products here..."
                    />
                </Box>
                <Box css={{ position: 'relative' }} maxWidth="1440px" mx="auto">
                    <SidebarStyles data={branchList} selectedItem={currentSelectedBar} onSelect={handleSelectBranch} />
                    <Container>
                        <Flex pt="30px" pb="79px" justifyContent="space-between">
                            <Search
                                mode="white"
                                style={{ width: '200px' }}
                                placeholder="SEARCH STYLE"
                                onSearch={handleOnSearch}
                            />
                            {currentAdminChannel.codename === 'A' ? null : (
                                <Flex alignItems="center">
                                    <Box bg="#DFDFDF" p="4px" mr="30px" width="24px" height="24px" sx={{ borderRadius: '4px' }}>
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

                                    <EditOutlined
                                        size="30px"
                                        style={{ fontSize: '32px', cursor: 'pointer' }}
                                        onClick={handleAssigned}
                                    />
                                </Flex>
                            )}

                            <Switcher assigned={currentBranch} ref={ref}></Switcher>
                            {currentAdminChannel.codename === 'A' ? ( //通道A才能下单
                                <Cart
                                    triggleStyle={{
                                        position: 'absolute',
                                        right: '20px',
                                    }}
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
                            ) : null}
                        </Flex>
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
                        <More
                            onLoadMore={() => {
                                handleLoadMore();
                            }}
                            hasMore={shopStyleList.page < shopStyleList.pages}
                        />
                    </Container>
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
