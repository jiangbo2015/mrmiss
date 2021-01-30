import CapsItem from '@/components/Capsule/CapsItem';
import ModalComplex from '@/components/Capsule/ModalComplex';
import More from '@/components/Capsule/More';
import Search from '@/components/Capsule/Search';
import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';
import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import banner from '@/public/banner.jpeg';
import React, { useRef, useState } from 'react';
import { Box, Flex } from 'rebass/styled-components';

export default () => {
    // swiper 实例
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
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
                    <SidebarStyles></SidebarStyles>
                    <Container>
                        <Flex py="30px" justifyContent="space-between">
                            <Search></Search>
                            <Switcher ref={ref}></Switcher>
                        </Flex>
                        <Flex justifyContent="space-between" flexDirection="row" flexWrap="wrap">
                            {new Array(12).fill(0).map((item, index) => (
                                <CapsItem key={index} handleOpen={() => setVisible(true)}></CapsItem>
                            ))}
                        </Flex>
                        <More></More>
                    </Container>
                </Box>
            </section>
            {visible && <ModalComplex visible={visible} onClose={() => setVisible(false)}></ModalComplex>}
        </Layout>
    );
};
