import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import banner from '@/public/banner.jpeg';
import carousel1 from '@/public/carousel1.jpg';
import React from 'react';
import { Box, Flex, Text } from 'rebass/styled-components';
import Carousel from '../Home/Carousel';
import CapsItem from './Components/CapsItem';
import Search from './Components/Search';
import Switcher from './Components/Switcher';

export default class Capsule extends React.Component {
    render() {
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
                    ></Title>
                    <Box
                        height="800px"
                        mt="40px"
                        css={{
                            background: `url(${carousel1}) no-repeat`,
                            backgroundSize: 'cover',
                        }}
                    ></Box>
                    <Carousel></Carousel>
                </Box>
                <section>
                    <Box bg="#fff" py="90px" maxWidth="1400px" mx="auto">
                        <Title
                            title="胶囊系列名"
                            subtitle="This season's capsule is launched by mrmiss 2021 limited capsule
            series-parent-child family series. I hope you can find your favorite
            products here.."
                        ></Title>
                    </Box>
                    <Box css={{ position: 'relative' }}>
                        <Box css={{ position: 'absolute', left: 0, top: 0 }}>
                            <Text>Beach Shorts</Text>
                            <Text>SWIMUITE ALL</Text>
                        </Box>
                        <Container>
                            <Flex py="30px" justifyContent="space-between">
                                <Search></Search>
                                <Switcher></Switcher>
                            </Flex>
                            <Flex
                                justifyContent="space-between"
                                flexDirection="row"
                                flexWrap="wrap"
                            >
                                {new Array(12).fill(0).map((item, index) => (
                                    <CapsItem key={index}></CapsItem>
                                ))}
                            </Flex>
                        </Container>
                    </Box>
                </section>
            </Layout>
        );
    }
}
