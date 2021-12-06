import InputNumber from '@/components/InputNumber';
import temp from '@/public/temp.jpg';
import { useEffect } from 'react';
import Swiper from 'react-id-swiper';
import Modal from 'react-modal';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { Arrow } from './Switcher';
import { useIntl } from 'umi'

export const CloseBtn = props => (
    <Flex py="40px" justifyContent="flex-end" pr="30px" css={{ cursor: 'pointer' }} {...props}>
        <Box height="5px" width="30px" bg="#000"></Box>
    </Flex>
);

export const ArrowBtn = props => (
    <Arrow
        width="30px"
        height="30px"
        mx="20px"
        sx={{
            borderRadius: '50%',
            div: {
                width: '30px',
                height: '30px',
                ':hover': {
                    g: {
                        fill: '#aaa !important',
                        stroke: '#aaa !important',
                    },
                },
            },
        }}
        {...props}
    ></Arrow>
);

export const StyleSwitcher = ({ bg, ...props }) => (
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
        <Dot bg={bg} size="30px"></Dot>
        <Flex className="intro" mt="10px" css={{ visibility: 'hidden' }}>
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

export default ({ visible, onClose }) => {
    const { formatMessage } = useIntl()
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
                        <Flex justifyContent="center" mt="20px">
                            <Box mr="30px">
                                <ArrowBtn></ArrowBtn>
                                <ArrowBtn right></ArrowBtn>
                            </Box>
                        </Flex>
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
                            {formatMessage({
                                id: 'size_pkg',
                                defaultMessage:  '尺码/中包',
                            })}
                        </Text>
                        <Flex mt="20px">
                            {['XS', 'S', 'M'].map((item, i) => (
                                <Box key={i} mr="15px">
                                    <Text textAlign="center">{item}</Text>
                                    <InputNumber></InputNumber>
                                </Box>
                            ))}
                        </Flex>
                        <Box bg="#000" width="100%" py="16px" mt="80px" css={{ cursor: 'pointer' }}>
                            <Text color="#fff" textAlign="center">
                                {formatMessage({
                                    id: 'add_to_order_editor',
                                    defaultMessage:  '进入订单编辑器',
                                })}    
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
