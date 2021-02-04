import temp from '@/public/temp.jpg';
import { useEffect } from 'react';
import Swiper from 'react-id-swiper';
import Modal from 'react-modal';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { CloseBtn } from './ModalSimple';

const StyleSwitcher = ({ bg, ...props }) => (
    <Flex
        flexDirection="column"
        alignItems="center"
        mr="15px"
        css={{
            position: 'relative',
            '&:hover': {
                '.intro': {
                    visibility: 'visible',
                },
            },
        }}
    >
        <Text mb="6px">A</Text>
        <Dot bg={bg} size="30px"></Dot>
        <Flex className="intro" css={{ visibility: 'hidden' }}>
            <Box
                css={{
                    position: 'absolute',
                    top: '48px',
                    width: 'max-content',
                }}
            >
                <Text>1903</Text>
                <Text>罂粟红</Text>
            </Box>
        </Flex>
    </Flex>
);

export const data = [
    {
        channel: 'A',
        children: [
            {
                size: 42,
                num: 2,
            },
            {
                size: 44,
                num: 1,
            },
            {
                size: 46,
                num: 2,
            },
            {
                size: 48,
                num: 3,
            },
        ],
    },
    {
        channel: 'B',
        children: [
            {
                size: 42,
                num: 2,
            },
            {
                size: 44,
                num: 1,
            },
            {
                size: 46,
                num: 2,
            },
            {
                size: 48,
                num: 3,
            },
        ],
    },
    {
        channel: 'C',
        children: [
            {
                size: 42,
                num: 2,
            },
            {
                size: 44,
                num: 1,
            },
            {
                size: 46,
                num: 2,
            },
            {
                size: 48,
                num: 3,
            },
        ],
    },
    {
        channel: 'D',
        children: [
            {
                size: 42,
                num: 2,
            },
            {
                size: 44,
                num: 1,
            },
            {
                size: 46,
                num: 2,
            },
            {
                size: 48,
                num: 3,
            },
        ],
    },
];

export const SizeBox = ({ width, bg, children }) => (
    <Flex
        justifyContent="center"
        alignItems="center"
        width={width || '52px'}
        height="21px"
        bg={bg || '#D0C5C5'}
        mr="5px"
        mb="5px"
        css={{
            borderRadius: '3px',
        }}
    >
        {children}
    </Flex>
);

export default ({ visible, onClose }) => {
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    return (
        <Modal
            isOpen={visible}
            style={{
                overlay: {
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 100,
                },
                content: {
                    padding: 0,
                    left: 0,
                    right: 0,
                    top: 0,
                },
            }}
        >
            <Box bg="#fff" pb="50px">
                <CloseBtn onClick={onClose}></CloseBtn>
                <Flex justifyContent="center">
                    <Box>
                        <Box
                            width="675px"
                            height="675px"
                            bg="#eee"
                            css={{
                                '.swiper-container': {
                                    height: '100%',
                                },
                            }}
                        >
                            <Swiper>
                                {new Array(3).fill(0).map((item, i) => (
                                    <Flex justifyContent="center" alignItems="center" height="100%">
                                        <Image src={temp} maxWidth="400px"></Image>
                                    </Flex>
                                ))}
                            </Swiper>
                        </Box>
                        <Box width="675px" mt="30px" css={{ overflowX: 'auto' }}>
                            <Flex>
                                {new Array(4).fill(0).map((item, i) => (
                                    <Image src={temp} mr="10px" flex="none"></Image>
                                ))}
                            </Flex>
                        </Box>
                    </Box>

                    <Box pl="30px">
                        <Text>2021 swimwear series</Text>
                        <Text color="#313131" fontSize="28px" fontWeight="bold" my="20px">
                            €98
                        </Text>
                        <Text>Ref A W881 </Text>
                        <Flex mt="30px">
                            {new Array(3).fill(0).map((item, i) => (
                                <Image key={i} src={temp} width="60px" height="60px" mr="20px"></Image>
                            ))}
                        </Flex>
                        <Flex mt="60px">
                            {['yellow', 'red', 'green'].map((item, i) => (
                                <StyleSwitcher key={i} bg={item}></StyleSwitcher>
                            ))}
                        </Flex>
                        <Text fontSize="16px" mt="90px">
                            Size / Qu antity
                        </Text>
                        <Box mt="15px">
                            <Flex>
                                <SizeBox>S / Q</SizeBox>
                                {[42, 44, 46, 48].map((item, i) => (
                                    <SizeBox key={i} width="41px" bg="#EEEDED">
                                        {item}
                                    </SizeBox>
                                ))}
                            </Flex>
                            {data.map((item, index) => (
                                <Flex>
                                    <SizeBox key={index} bg="#F7F7F7">
                                        {item.channel}
                                    </SizeBox>
                                    {item.children.map((child, i) => (
                                        <SizeBox key={i} width="41px" bg="#F7F7F7">
                                            {child.num}
                                        </SizeBox>
                                    ))}
                                </Flex>
                            ))}
                        </Box>
                        <Flex mt="40px">
                            <strong>中包:</strong>
                            <Text mr="30px">12pcs</Text>
                            <strong>装箱:</strong>
                            <Text>192pcs</Text>
                        </Flex>
                        <Box bg="#000" width="100%" py="16px" mt="80px" css={{ cursor: 'pointer' }}>
                            <Text color="#fff" textAlign="center">
                                进入订单编辑器
                            </Text>
                        </Box>
                    </Box>
                </Flex>
                <Image></Image>
                <Heading></Heading>
            </Box>
        </Modal>
    );
};
