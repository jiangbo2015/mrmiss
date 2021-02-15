import CapsItem from '@/components/Capsule/CapsItem';
import ModalSimple from '@/components/Capsule/ModalSimple';
import More from '@/components/Capsule/More';
import Search from '@/components/Capsule/Search';
import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';
import Cart from '@/components/Cart';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import banner from '@/public/banner.jpeg';
import carousel1 from '@/public/carousel1.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import Carousel from '../Home/Carousel';
import ExbImage from './ExbImage';
import OrderMarkModal from './OrderMarkModal';
import { connect } from 'dva';
import { Button } from 'antd';

import { ReactSVG } from 'react-svg';
import IconCapsuleCar from '@/public/icons/icon-capsule-car.svg';

const Capsule = ({ capsuleList, dispatch, currentCapsule, capsuleStyleList }) => {
    useEffect(() => {
        dispatch({
            type: 'capsule/fetchCapsuleList',
        });
    }, []);
    useEffect(() => {
        if (currentCapsule._id) {
            dispatch({
                type: 'capsule/fetchCapsuleStyleList',
                payload: { capsule: currentCapsule._id },
            });
        }
    }, [currentCapsule]);

    const handleSelectCapsule = capsule => {
        dispatch({
            type: 'capsule/setCurrentCapsule',
            payload: capsule,
        });
    };

    const handleOpenDetail = capsule => {
        dispatch({
            type: 'capsule/setCurrentCapsuleStyle',
            payload: capsule,
        });
        setVisible(true);
    };

    // swiper 实例
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [orderVisible, setOrderVisible] = useState(false);
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
            <Box bg="#FDE7E1" py="90px" px="40px">
                <Title
                    title="Our capsule"
                    subtitle="This season's capsule is launched by mrmiss 2021 limited capsule series-parent-child family series. I hope you can find your favorite products here.."
                />
                <ExbImage imgsInfo={currentCapsule} />
                <Carousel carousels={capsuleList.map(c => c.covermap)} />
            </Box>
            <section>
                <Box bg="#fff" py="90px" maxWidth="1400px" mx="auto">
                    <Title title={currentCapsule.namecn} subtitle={currentCapsule.description} />
                </Box>
                <Box css={{ position: 'relative' }}>
                    <SidebarStyles data={capsuleList} selectedItem={currentCapsule} onSelect={handleSelectCapsule} />
                    <Container>
                        <Flex py="30px" justifyContent="space-between">
                            <Search></Search>
                            <Switcher assigned={currentCapsule} ref={ref}></Switcher>
                            <Button
                                onClick={() => {
                                    setOrderVisible(true);
                                }}
                                shape="circle"
                                size="large"
                                icon={<ReactSVG style={{ width: '20px', height: '20px', margin: 'auto' }} src={IconCapsuleCar} />}
                                style={{ backgroundColor: '#D2D2D2', position: 'absolute', right: '20px' }}
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
                            {capsuleStyleList.map((item, index) => (
                                <CapsItem item={item} key={item._id} handleOpen={() => handleOpenDetail(item)} />
                            ))}
                        </Box>
                        <More />
                    </Container>
                </Box>
            </section>
            {visible && <ModalSimple visible={visible} onClose={() => setVisible(false)} />}
            {orderVisible && <OrderMarkModal visible={orderVisible} onCancel={() => setOrderVisible(false)} />}

            <Cart />
        </Layout>
    );
};
export default connect(({ capsule = {} }) => ({
    capsuleList: capsule.capsuleList,
    currentCapsule: capsule.currentCapsule,
    capsuleStyleList: capsule.capsuleStyleList,
}))(Capsule);
