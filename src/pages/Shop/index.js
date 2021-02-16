import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { Button } from 'antd';
import { ReactSVG } from 'react-svg';
import { connect } from 'dva';

import CapsItem from '@/components/Capsule/ShopItem';
import ModalComplex from '@/components/Capsule/ModalShopSimple';
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

const Shop = ({ branchList, dispatch, currentBranch, currentSelectedBar, shopStyleList, currentAdminChannel = {} }) => {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [queryKey, setQueryKey] = useState('');

    const [selectedAll, setSelectedAll] = useState(false);
    const [selectAssignedStyleList, setSelectAssignedStyleList] = useState([]);
    useEffect(() => {
        dispatch({
            type: 'shop/fetchBranchList',
        });
    }, []);
    useEffect(() => {
        if (currentBranch._id) {
            let payload = {
                branch: currentBranch._id,
            };
            if (queryKey) {
                payload.code = queryKey;
            }
            dispatch({
                type: 'shop/fetchShopStyleList',
                payload,
            });
        }
    }, [currentBranch, queryKey]);

    const handleLoadMore = () => {
        if (currentBranch._id) {
            let payload = { branch: currentBranch._id, page: shopStyleList.page + 1 };
            if (queryKey) {
                payload.code = queryKey;
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
    }, [currentAdminChannel]);

    const handleOpenDetail = capsule => {
        if (currentAdminChannel.codename === 'A') {
            dispatch({
                type: 'shop/setCurrentShopStyle',
                payload: capsule,
            });
            setVisible(true);
        } else {
            // 分配
            const findIndex = selectAssignedStyleList.findIndex(x => x.style === capsule._id);
            // console.log('selectAssignedStyleList', selectAssignedStyleList);
            if (findIndex < 0) {
                // console.log({ style: capsule._id, price: capsule.price });x
                console.log('selectAssignedStyleList', selectAssignedStyleList);
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

    return (
        <Layout pt="74px">
            <Flex
                justifyContent="center"
                height="600px"
                width="100%"
                css={{
                    background: `url(${banner}) no-repeat`,
                    backgroundSize: 'cover',
                }}
            >
                {/* <Image src={banner} width="80vw" mx="auto"></Image> */}
            </Flex>
            <section>
                <Box bg="#fff" py="90px" maxWidth="1400px" mx="auto">
                    <Title
                        title="SHOP"
                        subtitle="This season's capsule is launched by mrmiss 2021 limited capsule
            series-parent-child family series. I hope you can find your favorite
            products here.."
                    />
                </Box>
                <Box css={{ position: 'relative' }}>
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
                                />
                            ) : null}
                        </Flex>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, 380px)',
                                placeItems: 'center',
                                gap: '20px',
                            }}
                        >
                            {shopStyleList.docs.map((item, index) => {
                                const selected = selectAssignedStyleList.find(x => x.style === item._id);
                                return (
                                    <CapsItem
                                        item={item}
                                        key={item._id}
                                        handleOpen={() => handleOpenDetail(item)}
                                        curChannelPrice={selected ? selected.price : item.price}
                                        isSelect={!!selected}
                                        onEditPrice={currentAdminChannel.codename === 'A' || !selected ? null : handleEditPrice}
                                    />
                                );
                            })}
                        </Box>
                        <More onLoadMore={handleLoadMore} hasMore={shopStyleList.page < shopStyleList.pages} />
                    </Container>
                </Box>
            </section>
            {visible && <ModalComplex visible={visible} onClose={() => setVisible(false)} />}
        </Layout>
    );
};

export default connect(({ shop, channel }) => ({
    branchList: shop.branchList,
    currentBranch: shop.currentBranch,
    shopStyleList: shop.shopStyleList,
    currentAdminChannel: channel.currentAdminChannel,
    currentSelectedBar: channel.currentSelectedBar,
}))(Shop);
