import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { Button } from 'antd';
import { ReactSVG } from 'react-svg';
import { connect } from 'dva';

import CapsItem from '@/components/Capsule/ShopItem';
import ModalComplex from '@/components/Capsule/ModalShopSimple';
import More from '@/components/Capsule/More';
import Search from '@/components/Capsule/Search';
import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import banner from '@/public/shop.jpeg';

import Cart from '@/components/Cart';
import IconShopCar from '@/public/icons/icon-shop.svg';

const Shop = ({ branchList, dispatch, currentBranch, shopStyleList }) => {
    useEffect(() => {
        dispatch({
            type: 'shop/fetchBranchList',
        });
    }, []);
    useEffect(() => {
        if (currentBranch._id) {
            dispatch({
                type: 'shop/fetchShopStyleList',
                payload: { branch: currentBranch._id },
            });
        }
    }, [currentBranch]);
    // swiper 实例
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    const handleSelectBranch = branch => {
        dispatch({
            type: 'shop/setCurrentBranch',
            payload: branch,
        });
    };

    const handleOpenDetail = capsule => {
        dispatch({
            type: 'shop/setCurrentShopStyle',
            payload: capsule,
        });
        setVisible(true);
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
                    ></Title>
                </Box>
                <Box css={{ position: 'relative' }}>
                    <SidebarStyles data={branchList} selectedItem={currentBranch} onSelect={handleSelectBranch} />
                    <Container>
                        <Flex py="30px" justifyContent="space-between">
                            <Search></Search>
                            <Switcher ref={ref}></Switcher>
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
                        </Flex>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, 380px)',
                                placeItems: 'center',
                                gap: '20px',
                            }}
                        >
                            {shopStyleList.map((item, index) => (
                                <CapsItem
                                    item={item}
                                    key={index}
                                    handleOpen={() => {
                                        handleOpenDetail(item);
                                    }}
                                />
                            ))}
                        </Box>
                        <More></More>
                    </Container>
                </Box>
            </section>
            {visible && <ModalComplex visible={visible} onClose={() => setVisible(false)} />}
        </Layout>
    );
};

export default connect(({ shop }) => ({
    branchList: shop.branchList,
    currentBranch: shop.currentBranch,
    shopStyleList: shop.shopStyleList,
}))(Shop);
