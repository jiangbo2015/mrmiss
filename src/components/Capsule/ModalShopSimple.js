import InputNumber from '@/components/InputNumber';
import StyleItem from '@/components/StyleItem';
import ShopItem from './ShopItem';
import { filterImageUrl } from '@/utils/helper';
import { useIntl } from 'umi';
import { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import Modal from 'react-modal';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { Arrow } from './Switcher';
import { connect } from 'dva';
export const CloseBtn = props => (
    <Flex alignSelf="flex-end" pt="20px" pb="40px" justifyContent="flex-end" pr="20px" css={{ cursor: 'pointer' }} {...props}>
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
        <Dot {...props} bg={type ? false : bg} src={type ? bg : ''} size={`${size}px`} isSelect={isSelect} />
        <Flex className="intro" mt="2px" css={{ visibility: 'hidden' }}>
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

const ModalSimple = ({ visible, onClose, currentShopStyle, shopStyleAboutList = [], dispatch, currentBranch }) => {
    const { colorWithStyleImgs = [], code, price, size, _id, goodCategoryId } = currentShopStyle;

    const curBranchKind = currentBranch.children.find(x => x._id === goodCategoryId);
    let isTopOrBottom = false;
    if (curBranchKind.namecn.includes('单衣') || curBranchKind.namecn.includes('单裤')) {
        isTopOrBottom = true;
    }
    const { locale, formatMessage } = useIntl();
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
                    width: '1120px',
                    margin: 'auto',
                    maxHeight: '98%',
                    padding: 0,
                    backgroundColor: '#f7f7f7',
                },
            }}
        >
            <Flex alignItems="center" flexDirection="column" bg="#f7f7f7" pb="50px">
                <CloseBtn onClick={onClose}></CloseBtn>
                <Flex justifyContent="center">
                    <Box mr="10px" height="355px" css={{ overflowY: 'auto' }}>
                        <Flex flexDirection="column">
                            {colorWithStyleImgs.map((item, i) => (
                                <Box
                                    mb="8px"
                                    p="10px 15px"
                                    bg="#FFFFFF"
                                    height={isTopOrBottom ? '119px' : '183.5px'}
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
                                        <Image width="120px" src={filterImageUrl(item.imgs[0])} mx="auto" />
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
                                        <Image src={filterImageUrl(item)} width="340px"></Image>
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
                        <Text>{locale === 'en-US' ? curBranchKind.nameen : curBranchKind.namecn}</Text>
                        <Text color="#313131" fontSize="28px" fontWeight="bold" my="4px">
                            ¥{price}
                        </Text>
                        <Text>Ref {code} </Text>

                        <Flex mt="8px" pb="12px">
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
                        <Box mt="4px">
                            <Flex>
                                <SizeBox>S / Q</SizeBox>
                                {size?.split('/').map((item, i) => (
                                    <SizeBox key={i} width="41px" bg="#EEEDED">
                                        {item}
                                    </SizeBox>
                                ))}
                            </Flex>
                            {colorWithStyleImgs.map((item, index) => (
                                <Flex key={`${item._id}-index`}>
                                    <SizeBox key={`${index}-sizetitle`} bg="#F7F7F7">
                                        <Dot
                                            type={item.colorObj?.type}
                                            bg={item.colorObj?.type ? false : item.colorObj?.value}
                                            src={item.colorObj?.type ? filterImageUrl(item.colorObj?.value) : ''}
                                            code={item.colorObj?.code}
                                            text={item.colorObj?.namecn}
                                            size="14px"
                                        />
                                        {/* {item.code} */}
                                    </SizeBox>
                                    {size?.split('/').map((s, i) => (
                                        <SizeBox key={`${i}-sizebox`} width="41px" bg="#F7F7F7">
                                            {item.sizeWithQuantity[s]}
                                        </SizeBox>
                                    ))}
                                </Flex>
                            ))}
                        </Box>
                        <Flex mt="4px">
                            <strong>
                                {formatMessage({
                                    id: 'pkg',
                                    defaultMessage: '中包',
                                })}
                                :
                            </strong>
                            <Text mr="30px">{currentShopStyle.numInBag}pcs</Text>
                            <strong>
                                {formatMessage({
                                    id: 'ctn',
                                    defaultMessage: '装箱',
                                })}
                                :
                            </strong>
                            <Text>{currentShopStyle.caseNum}pcs</Text>
                        </Flex>
                        <Box bg="#000" width="100%" py="10px" mt="4px" css={{ cursor: 'pointer' }} onClick={handleAddtoCart}>
                            <Text color="#fff" textAlign="center">
                                {formatMessage({
                                    id: 'add_to_cart',
                                    defaultMessage: '加入购物车',
                                })}
                            </Text>
                        </Box>
                    </Box>
                </Flex>
                <Box width="1060px" pt="10px">
                    <Text pb="22px" fontSize="24px">
                        Related Products 类似产品
                    </Text>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, 340px)',
                            placeItems: 'center',
                            gap: '20px',
                        }}
                    >
                        {shopStyleAboutList.map((item, index) => {
                            return (
                                <ShopItem
                                    item={item}
                                    key={item._id}
                                    handleOpen={() => {
                                        dispatch({
                                            type: 'shop/setCurrentShopStyle',
                                            payload: item,
                                        });
                                    }}
                                    curChannelPrice={item.price}
                                    onEditPrice={false}
                                />
                            );
                        })}
                    </Box>
                </Box>
            </Flex>
        </Modal>
    );
};

export default connect(({ shop = {} }) => ({
    shopList: shop.shopList,
    currentBranch: shop.currentBranch,
    currentShopStyle: shop.currentShopStyle,
    shopStyleAboutList: shop.shopStyleAboutList,
}))(ModalSimple);
