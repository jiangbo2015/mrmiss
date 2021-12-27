import InputNumber from '@/components/InputNumber';
import StyleItem from '@/components/StyleItem';
import { filterImageUrl } from '@/utils/helper';
import {useIntl} from 'umi';
import { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import Modal from 'react-modal';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { Arrow } from './Switcher';
import { connect } from 'dva';
export const CloseBtn = props => (
    <Flex py="20px" justifyContent="flex-end" alignSelf="flex-end" pr="20px" css={{ cursor: 'pointer' }} {...props}>
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
        fill
        {...props}
    />
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
            <Flex
                css={{
                    position: 'absolute',
                    top: '28px',
                    width: 'max-content',
                }}
            >
                <Text>{code}</Text>
                <Text>{text}</Text>
            </Flex>
        </Flex>
    </Flex>
);

const ItemBox = ({ currentShopStyle, onAddtoCart,curBranchKind }) => {
    if (!currentShopStyle) return null;
    // add_to_cart
    const { formatMessage } = useIntl()
    const { colorWithStyleImgs = [], code, price, size, _id } = currentShopStyle;
    // // console.log('currentShopStyle', currentShopStyle);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    const handleAddtoCart = () => {
        onAddtoCart({
            shopStyle: _id,
            count: 1,
        });
    };
    return (
        <Flex justifyContent="flex-start" width="1000px" p="0 50px">
            <Flex>
                <Box mr="10px" height="355px" css={{ overflowY: 'auto',minWidth:'160px' }}>
                    <Flex flexDirection="column">
                        {colorWithStyleImgs.map((item, i) => (
                            <Box
                                mb="8px"
                                p="0px 30px"
                                bg="#FFFFFF"
                                height="113px"
                                onClick={() => {
                                    setCurrent(i);
                                }}
                            >
                                {item.type ? (
                                    item.favorite.styleAndColor.map(d => (
                                        <StyleItem
                                            width="80px"
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
                        width="355px"
                        height="355px"
                        bg="#FFFFFF"
                        css={{
                            '.swiper-container': {
                                height: '100%',
                            },
                        }}
                    >
                        <Swiper>
                            {colorWithStyleImgs[current]?.imgs.map((item, i) => (
                                <Flex justifyContent="center" alignItems="center" height="100%">
                                    <Image src={filterImageUrl(item)} width="300px"></Image>
                                </Flex>
                            ))}
                        </Swiper>
                    </Box>
                </Box>
            </Flex>
            <Box pl="30px">
                <Text>{curBranchKind}</Text>
                <Text color="#313131" fontSize="28px" fontWeight="bold" my="4px">
                    ¥{price}
                </Text>
                <Text>Ref {code} </Text>

                <Flex mt="8px" pb='12px'>
                    {colorWithStyleImgs.map((item, i) => (
                        <StyleSwitcher
                            key={i}
                            type={item.colorObj?.type}
                            bg={item.colorObj?.type ? filterImageUrl(item.colorObj?.value) : item.colorObj?.value}
                            code={item.colorObj?.code}
                            text={item.colorObj?.namecn}
                            isSelect={i === current}
                        />
                    ))}
                </Flex>
                <Text fontSize="16px" mt="4px">
                    Size / Quantity
                </Text>
                <Box mt="2px">
                    <Flex>
                        <SizeBox>S / Q</SizeBox>
                        {size?.split('/').map((item, i) => (
                            <SizeBox key={i} width="41px" bg="#EEEDED">
                                {item}
                            </SizeBox>
                        ))}
                    </Flex>
                    {colorWithStyleImgs.map((item, index) => (
                        <Flex>
                            <SizeBox key={`${index}-sizetitle`} bg="#F7F7F7">
                            <Dot type={item.colorObj?.type}
                                            bg={item.colorObj?.type ? false : item.colorObj?.value}
                                            src = { item.colorObj?.type ? filterImageUrl(item.colorObj?.value) : '' }
                                            code={item.colorObj?.code}
                                            text={item.colorObj?.namecn} size='14px' />
                            </SizeBox>
                            {size?.split('/').map((s, i) => (
                                <SizeBox key={`${i}-sizebox`} width="41px" bg="#F7F7F7">
                                    {item.sizeWithQuantity[s]}
                                </SizeBox>
                            ))}
                        </Flex>
                    ))}
                </Box>
                <Flex mt="2px">
                    <strong>
                        {formatMessage({
                            id: 'pkg',
                            defaultMessage:  '中包',
                        })}:
                    </strong>
                    <Text mr="30px">{currentShopStyle.numInBag}pcs</Text>
                        <strong>{formatMessage({
                                id: 'ctn',
                                defaultMessage:  '装箱',
                            })}:
                        </strong>
                    <Text>{currentShopStyle.caseNum}pcs</Text>
                </Flex>
                <Box bg="#000" width="100%" py="10px" mt="6px" css={{ cursor: 'pointer' }} onClick={handleAddtoCart}>
                    <Text color="#fff" textAlign="center">
                        {formatMessage({
                            id: 'add_to_cart',
                            defaultMessage:  '加入购物车',
                        })}
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

const ModalSimple = ({
    visible,
    onClose,
    dispatch,
    currentBranch,
    currentShopTopStyleIndex,
    currentShopBottomStyleIndex,
    shopStyleTopAndBottomList = { top: [], bottom: [] },
}) => {
    // const { colorWithStyleImgs = [], code, price, size, _id } = currentShopStyle;
    // console.log('currentBranch', currentBranch);
    // console.log('shopStyleTopAndBottomList', shopStyleTopAndBottomList)
    // console.log('currentShopBottomStyleIndex', currentShopBottomStyleIndex);
    const { locale } = useIntl();
    const curTopBranchKind = currentBranch.children.find(x => x._id === shopStyleTopAndBottomList.top[0].branchKind)
    const curBomBranchKind = currentBranch.children.find(x => x._id === shopStyleTopAndBottomList.bottom[0].branchKind)
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    const handleAddtoCart = payload => {
        dispatch({
            type: 'shop/addShopCart',
            payload,
        });
    };

    const handleChangeTopIndex = payload => {
        let len = shopStyleTopAndBottomList.top.length;
        dispatch({
            type: 'shop/setCurrentShopTopStyleIndex',
            payload: (payload + len) % len,
        });
    };

    const handleChangeBottomIndex = payload => {
        let len = shopStyleTopAndBottomList.bottom.length;
        dispatch({
            type: 'shop/setCurrentShopBottomStyleIndex',
            payload: (payload + len) % len,
        });
    };

    return (
        <Modal
            isOpen={visible}
            style={{
                overlay: {
                    background: 'rgba(0,0,0,0.5)',
                    zIndex: 100,
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center',
                },
                content: {
                    width: '1120px',
                    margin: 'auto',
                    inset: 'auto',
                    maxHeight: '98%',
                    padding: 0,
                },
            }}
        >
            <Flex flexDirection="column" alignItems="center" bg="#f7f7f7" pb="10px">
                <CloseBtn onClick={onClose}></CloseBtn>
                {shopStyleTopAndBottomList.top.length <= 0 ? null : (
                    <>
                        <Flex justifyContent="space-between" alignItems="center" pt="6px" width="1060px">
                            <ArrowBtn
                                onClick={() => {
                                    handleChangeTopIndex(currentShopTopStyleIndex - 1);
                                }}
                            ></ArrowBtn>
                            <ItemBox
                                onAddtoCart={handleAddtoCart}
                                currentShopStyle={shopStyleTopAndBottomList.top[currentShopTopStyleIndex]}
                                curBranchKind={curTopBranchKind.namecn}
                            />
                            <ArrowBtn
                                onClick={() => {
                                    handleChangeTopIndex(currentShopTopStyleIndex + 1);
                                }}
                                right
                            ></ArrowBtn>
                        </Flex>
                    </>
                )}
                {shopStyleTopAndBottomList.bottom.length <= 0 ? null : (
                    <>
                        <Flex justifyContent="space-between" alignItems="center" pt="6px" width="1060px">
                            <ArrowBtn
                                onClick={() => {
                                    handleChangeBottomIndex(currentShopBottomStyleIndex - 1);
                                }}
                            ></ArrowBtn>
                            <ItemBox
                                curBranchKind={locale==='zh-US' ? curBomBranchKind.nameen : curBomBranchKind.namecn}
                                onAddtoCart={handleAddtoCart}
                                currentShopStyle={shopStyleTopAndBottomList.bottom[currentShopBottomStyleIndex]}
                            />
                            <ArrowBtn
                                onClick={() => {
                                    handleChangeBottomIndex(currentShopBottomStyleIndex + 1);
                                }}
                                right
                            ></ArrowBtn>
                        </Flex>
                    </>
                )}
            </Flex>
        </Modal>
    );
};

export default connect(({ shop = {} }) => ({
    currentBranch: shop.currentBranch,
    currentShopStyle: shop.currentShopStyle,
    currentShopTopStyleIndex: shop.currentShopTopStyleIndex,
    currentShopBottomStyleIndex: shop.currentShopBottomStyleIndex,
    shopStyleTopAndBottomList: shop.shopStyleTopAndBottomList[shop.currentShopKey],
}))(ModalSimple);
