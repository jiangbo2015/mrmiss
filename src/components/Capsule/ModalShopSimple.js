import InputNumber from '@/components/InputNumber';
import StyleItem from '@/components/StyleItem';
import { filterImageUrl } from '@/utils/helper';
import temp from '@/public/temp.jpg';
import { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import Modal from 'react-modal';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { Arrow } from './Switcher';
import { connect } from 'dva';
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
export const StyleSwitcher = ({ bg, type, code, text, isSelect, size = 26, ...props }) => (
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
        <Dot bg={type ? false : bg} src={type ? bg : ''} size={`${size}px`} isSelect={isSelect} />
        <Flex className="intro" mt="10px" css={{ visibility: 'hidden' }}>
            <Box
                css={{
                    position: 'absolute',
                    top: '48px',
                    width: 'max-content',
                }}
            >
                <Text>{code}</Text>
                <Text>{text}</Text>
            </Box>
        </Flex>
    </Flex>
);

const ModalSimple = ({ visible, onClose, currentShopStyle, dispatch }) => {
    const { colorWithStyleImgs = [], code, price, size, _id } = currentShopStyle;
    // console.log('currentShopStyle', currentShopStyle);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    const handleAddtoCart = () => {
        dispatch({
            type: 'shop/addShopCart',
            payload: {
                shopStyle: _id,
                count: 1,
            },
        });
    };

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
                    <Box mr="10px" height="675px" css={{ overflowY: 'auto' }}>
                        <Flex flexDirection="column">
                            {colorWithStyleImgs.map((item, i) => (
                                <Box
                                    mb="8px"
                                    p="20px 30px"
                                    bg="#F8F8F8"
                                    onClick={() => {
                                        setCurrent(i);
                                    }}
                                >
                                    {item.type ? (
                                        item.favorite.styleAndColor.map(d => (
                                            <StyleItem
                                                styleId={`${item.favorite._id}-${d._id}-item`}
                                                colors={d.colorIds}
                                                key={`${item.favorite._id}-${d._id}-${Math.random() * 1000000}`}
                                                {...d.styleId}
                                                style={{
                                                    cursor: 'pointer',
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <Image width="100px" src={filterImageUrl(item.imgs[0])} mx="auto" />
                                    )}
                                </Box>
                            ))}
                        </Flex>
                    </Box>
                    <Box>
                        <Box
                            width="675px"
                            height="675px"
                            bg="#F8F8F8"
                            css={{
                                '.swiper-container': {
                                    height: '100%',
                                },
                            }}
                        >
                            <Swiper>
                                {colorWithStyleImgs[current].imgs.map((item, i) => (
                                    <Flex justifyContent="center" alignItems="center" height="100%">
                                        <Image src={filterImageUrl(item)} maxWidth="400px"></Image>
                                    </Flex>
                                ))}
                            </Swiper>
                        </Box>

                        {/* <Flex justifyContent="center" mt="20px">
                            <Box mr="30px">
                                <ArrowBtn></ArrowBtn>
                                <ArrowBtn right></ArrowBtn>
                            </Box>
                        </Flex> */}
                    </Box>

                    <Box pl="30px">
                        <Text>2021 swimwear series</Text>
                        <Text color="#313131" fontSize="28px" fontWeight="bold" my="20px">
                            ¥{price}
                        </Text>
                        <Text>Ref {code} </Text>

                        <Flex mt="60px">
                            {colorWithStyleImgs.map((item, i) => (
                                <StyleSwitcher
                                    key={i}
                                    type={item.colorObj.type}
                                    bg={item.colorObj.type ? filterImageUrl(item.colorObj.value) : item.colorObj.value}
                                    code={item.colorObj.code}
                                    text={item.colorObj.namecn}
                                    isSelect={i === current}
                                />
                            ))}
                        </Flex>
                        <Text fontSize="16px" mt="90px">
                            Size / Quantity
                        </Text>
                        <Box mt="15px">
                            <Flex>
                                <SizeBox>S / Q</SizeBox>
                                {size.split('/').map((item, i) => (
                                    <SizeBox key={i} width="41px" bg="#EEEDED">
                                        {item}
                                    </SizeBox>
                                ))}
                            </Flex>
                            {colorWithStyleImgs.map((item, index) => (
                                <Flex>
                                    <SizeBox key={`${index}-sizetitle`} bg="#F7F7F7">
                                        {item.colorObj.code}
                                    </SizeBox>
                                    {size.split('/').map((s, i) => (
                                        <SizeBox key={`${i}-sizebox`} width="41px" bg="#F7F7F7">
                                            {item.sizeWithQuantity[s]}
                                        </SizeBox>
                                    ))}
                                </Flex>
                            ))}
                        </Box>
                        <Flex mt="40px">
                            <strong>中包:</strong>
                            <Text mr="30px">{currentShopStyle.numInBag}pcs</Text>
                            <strong>装箱:</strong>
                            <Text>{currentShopStyle.caseNum}pcs</Text>
                        </Flex>
                        <Box bg="#000" width="100%" py="16px" mt="80px" css={{ cursor: 'pointer' }} onClick={handleAddtoCart}>
                            <Text color="#fff" textAlign="center">
                                加入购物车
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

export default connect(({ shop = {} }) => ({
    shopList: shop.shopList,
    currentShop: shop.currentShop,
    currentShopStyle: shop.currentShopStyle,
}))(ModalSimple);
