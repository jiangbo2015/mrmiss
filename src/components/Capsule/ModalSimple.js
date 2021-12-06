import InputNumber from '@/components/InputNumber';
import StyleItem from '@/components/StyleItem';
import { filterImageUrl } from '@/utils/helper';
import ShopItem from './CapsItem';
import { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import Modal from 'react-modal';
import { Box, Flex, Heading, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { Arrow } from './Switcher';
import { connect } from 'dva';
import { useIntl } from 'umi'
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
    ></Arrow>
);

export const StyleSwitcher = ({ bg, type, code, text, isSelect, ...props }) => (
    <Flex
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
        <Dot bg={type ? false : bg} src={type ? bg : ''} size="26px" isSelect={isSelect} />
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

const ModalSimple = ({ visible, onClose, currentCapsuleStyle, capsuleStyleAboutList = [], dispatch }) => {
    const { formatMessage } = useIntl()
    const { colorWithStyleImgs = [], code, price, size, goodCategory = {} } = currentCapsuleStyle;
    const [current, setCurrent] = useState(0);
    let isTopOrBottom = false;
    if (
        (goodCategory.nameen && goodCategory.nameen.toUpperCase()) === 'TOP' ||
        goodCategory.namecn === '单衣'
    ) {
        isTopOrBottom = true;
    } else if (
        (goodCategory.nameen && goodCategory.nameen.toUpperCase()) === 'BOTTOM' ||
        goodCategory.namecn === '单裤'
    ) {
        isTopOrBottom = true;
    } else if (
        (goodCategory.name && goodCategory.name.toUpperCase()) === 'BOTTOM' ||
        goodCategory.name === '单裤' ||
        goodCategory.name === '单衣'
    ) {
        isTopOrBottom = true;
    }
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    const handleAddOrder = () => {
        // console.log('handleAddOrder');
        dispatch({
            type: 'capsule/addOrderMark',
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
            <Flex flexDirection="column" alignItems="center" alignItems="center" bg="#f7f7f7" pb="50px">
                <CloseBtn onClick={onClose}></CloseBtn>
                <Flex justifyContent="center">
                    <Box height="375px" mr="10px" css={{ overflowY: 'auto' }}>
                        {colorWithStyleImgs.map((item, i) => (
                            <Flex
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                mb="8px"
                                p="0px 30px"
                                bg="#FFFFFF"
                                height={isTopOrBottom ? '119px' : '183.5px'}
                                onClick={() => {
                                    setCurrent(i);
                                }}
                            >
                                {item.type ? (
                                    item.favorite.styleAndColor.map((d, i) => (
                                        <StyleItem
                                            width="80px"
                                            styleId={`${item.favorite._id}-${d._id}-item`}
                                            colors={d.colorIds}
                                            key={`${item.favorite._id}-${d._id}-${Math.random() * 1000000}`}
                                            {...d.styleId}
                                            style={{
                                                cursor: 'pointer',
                                                marginTop: i ? '20px' : 0,
                                            }}
                                        />
                                    ))
                                ) : (
                                    <Image width="80px" src={filterImageUrl(item.imgs[0])} mx="auto" />
                                )}
                            </Flex>
                        ))}
                    </Box>
                    <Box>
                        <Box
                            width="375px"
                            minHeight="375px"
                            bg="#FFFFFF"
                            css={{
                                '.swiper-container': {
                                    height: '100%',
                                },
                            }}
                        >
                            {colorWithStyleImgs[current].type ? (
                                <Swiper
                                    scrollbar={{
                                        el: '.swiper-scrollbar-style2',
                                        hide: false,
                                    }}
                                >
                                    <Flex alignItems="center" flexDirection="column" minHeight="375px" justifyContent="center">
                                        {colorWithStyleImgs[current].favorite.styleAndColor.map((d, i) => (
                                            // <Flex >
                                            <StyleItem
                                                width="170px"
                                                styleId={`${colorWithStyleImgs[current].favorite._id}-${d._id}-item`}
                                                colors={d.colorIds}
                                                key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() *
                                                    1000000}`}
                                                {...d.styleId}
                                                style={{
                                                    cursor: 'pointer',
                                                    marginTop: i ? '40px' : 0,
                                                }}
                                            />
                                            // </Flex>
                                        ))}
                                    </Flex>
                                    <Flex alignItems="center" flexDirection="column" minHeight="375px" justifyContent="center">
                                        {colorWithStyleImgs[current].favorite.styleAndColor.map((d, i) => (
                                            // <Flex justifyContent="center" alignItems="center" height="100%">
                                            <StyleItem
                                                width="170px"
                                                styleId={`${colorWithStyleImgs[current].favorite._id}-${d._id}-item`}
                                                colors={d.colorIds}
                                                key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() *
                                                    1000000}`}
                                                {...d.styleId}
                                                svgUrl={d.styleId.svgUrlBack}
                                                shadowUrl={d.styleId.shadowUrlBack}
                                                styleSize={d.styleId.styleBackSize}
                                                style={{
                                                    cursor: 'pointer',
                                                    marginTop: i ? '40px' : 0,
                                                }}
                                            />
                                        ))}
                                    </Flex>
                                </Swiper>
                            ) : null}
                            {colorWithStyleImgs[current].type ? null : (
                                <Swiper>
                                    {colorWithStyleImgs[current].imgs.map((item, i) => (
                                        <Flex justifyContent="center" alignItems="center" height="100%">
                                            <Image src={filterImageUrl(item)} width="300px"></Image>
                                        </Flex>
                                    ))}
                                </Swiper>
                            )}
                        </Box>
                    </Box>

                    <Box pl="30px">
                        <Text>{currentCapsuleStyle.goodCategory ? currentCapsuleStyle.goodCategory.namecn || currentCapsuleStyle.goodCategory.name : ''}</Text>
                        <Text color="#313131" fontSize="28px" fontWeight="bold" my="10px">
                            ¥{price}
                        </Text>
                        <Text>Ref {code} </Text>
                        {currentCapsuleStyle.type ? (
                            <Flex mt="14px">
                                {colorWithStyleImgs[0].favorite.styleAndColor.map(d => (
                                    <Flex justifyContent="center" alignItems="center" height="100%">
                                        <StyleItem
                                            width="70px"
                                            styleId={`${colorWithStyleImgs[current].favorite._id}-${d._id}-item`}
                                            colors={[{ value: '#000' }, { value: '#000' }, { value: '#000' }]}
                                            key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() *
                                                1000000}`}
                                            {...d.styleId}
                                            style={{
                                                marginRight: '10px',
                                            }}
                                        />
                                    </Flex>
                                ))}
                                {colorWithStyleImgs[0].favorite.styleAndColor.map(d => (
                                    <Flex justifyContent="center" alignItems="center" height="100%">
                                        <StyleItem
                                            width="70px"
                                            styleId={`${colorWithStyleImgs[current].favorite._id}-${d._id}-item`}
                                            colors={[{ value: '#000' }, { value: '#000' }, { value: '#000' }]}
                                            key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() *
                                                1000000}`}
                                            {...d.styleId}
                                            svgUrl={d.styleId.svgUrlBack}
                                            shadowUrl={d.styleId.shadowUrlBack}
                                            styleSize={d.styleId.styleBackSize}
                                        />
                                    </Flex>
                                ))}
                            </Flex>
                        ) : null}

                        <Flex mt="30px">
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
                        <Text fontSize="16px" mt="40px">
                            {formatMessage({
                                id: 'size_pkg',
                                defaultMessage:  '尺码/中包',
                            })}
                        </Text>
                        <Flex mt="20px">
                            {size?.split('/').map((item, i) => (
                                <Box key={i} mr="15px">
                                    <Text textAlign="center">{item}</Text>
                                    <InputNumber></InputNumber>
                                </Box>
                            ))}
                        </Flex>
                        <Box
                            bg="#000"
                            width="100%"
                            py="12px"
                            mt="40px"
                            css={{ cursor: 'pointer' }}
                            onClick={() => {
                                handleAddOrder();
                            }}
                        >
                            <Text color="#fff" textAlign="center">
                                {formatMessage({
                                    id: 'add_to_order_editor',
                                    defaultMessage:  '加入订单编辑器',
                                })}   
                            </Text>
                        </Box>
                    </Box>
                </Flex>
                <Box width="1060px" pt="30px">
                    <Text pb="38px" fontSize="24px">
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
                        {capsuleStyleAboutList.map((item, index) => {
                            return (
                                <ShopItem
                                    item={item}
                                    key={item._id}
                                    handleOpen={() => {
                                        dispatch({
                                            type: 'capsule/setCurrentCapsuleStyle',
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

export default connect(({ capsule = {} }) => ({
    capsuleList: capsule.capsuleList,
    currentCapsule: capsule.currentCapsule,
    currentCapsuleStyle: capsule.currentCapsuleStyle,
    capsuleStyleAboutList: capsule.capsuleStyleAboutList,
}))(ModalSimple);
