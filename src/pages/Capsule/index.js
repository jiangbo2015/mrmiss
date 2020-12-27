import ca1 from '@/public/ca1.jpg';
import carousel1 from '@/public/carousel1.jpg';
import temp from '@/public/temp.jpg';
import React from 'react';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Components/Dot';

export const Title = ({ title, subtitle }) => (
    <Box maxWidth="1300px" mx="auto">
        <Heading fontSize="50px" textAlign="center" color="#020202">
            {title}
        </Heading>
        <Text
            fontSize="25px"
            lineHeight="38px"
            textAlign="center"
            mt="46px"
            color="#434242"
        >
            {subtitle}
        </Text>
    </Box>
);

export default class Capsule extends React.Component {
    render() {
        return (
            <>
                <Box bg="#FDE7E1" py="90px">
                    <Box maxWidth="1380px" mx="auto">
                        <Title
                            title="Our capsule"
                            subtitle="This season's capsule is launched by mrmiss 2021 limited capsule series-parent-child family series. I hope you can find your favorite products here.."
                        ></Title>
                        <Flex justifyContent="center" mt="30px">
                            <Image src={carousel1} width="1380px"></Image>
                        </Flex>
                        <Flex
                            justifyContent="space-between"
                            mx="auto"
                            mt="30px"
                        >
                            {new Array(5).fill(0).map((x, i) => (
                                <Image src={ca1} width="260px" key={i}></Image>
                            ))}
                        </Flex>
                    </Box>
                </Box>
                <Box bg="#fff" py="90px" maxWidth="1400px" mx="auto">
                    <Title
                        title="胶囊系列名"
                        subtitle="This season's capsule is launched by mrmiss 2021 limited capsule
            series-parent-child family series. I hope you can find your favorite
            products here.."
                    ></Title>
                    <Flex py="30px" justifyContent="space-between">
                        <Box>
                            <input
                                type="text"
                                style={{
                                    borderRadius: '14px',
                                    height: '28px',
                                    border: '1px solid #000000',
                                }}
                            />
                        </Box>
                        <Box>
                            <Box
                                width="124px"
                                bg="#2E2E2E"
                                textAlign="center"
                                css={{
                                    boxShadow: '0px 3px 7px 0px',
                                    borderRadius: '6px',
                                    color: '#fff',
                                }}
                            >
                                A
                            </Box>
                        </Box>
                    </Flex>
                    <Flex
                        justifyContent="space-between"
                        flexDirection="row"
                        flexWrap="wrap"
                    >
                        {new Array(12).fill(0).map((item, index) => (
                            <Box
                                p="40px"
                                bg="#F7F7F7"
                                width={[1, 0.3]}
                                maxWidth="470px"
                                key={index}
                                mb="30px"
                            >
                                <Flex justifyContent="center">
                                    <Image src={temp} mx="auto" alt="" />
                                </Flex>

                                <Box py="20px" css={{ fontSize: '12px' }}>
                                    <Text>Ref.5024 / 5035</Text>
                                    <Text mt="5px">Size.42 / 44 / 46 / 48</Text>
                                    <Flex
                                        css={{ position: 'relative' }}
                                        mt="14px"
                                        justifyContent="center"
                                    >
                                        <Text
                                            css={{
                                                position: 'absolute',
                                                left: 0,
                                            }}
                                            fontSize="22px"
                                        >
                                            $98
                                        </Text>

                                        {new Array(3).fill(0).map((x, i) => (
                                            <Dot bg="red" key={i}></Dot>
                                        ))}
                                    </Flex>
                                </Box>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </>
        );
    }
}
