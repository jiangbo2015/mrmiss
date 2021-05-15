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
    <Flex alignSelf="flex-end" pt="12px" pb="12px" justifyContent="flex-end" pr="20px" css={{ cursor: 'pointer' }} {...props}>
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

const ItemBox = ({ currentCapsuleStyle, onAddtoCart }) => {
    console.log('currentCapsuleStyle', currentCapsuleStyle);
    const { colorWithStyleImgs = [], code, price, size, _id } = currentCapsuleStyle;
    // console.log('currentCapsuleStyle', currentCapsuleStyle);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    useEffect(() =>{
        setCurrent(0)
    }, [currentCapsuleStyle])

    return (
        <Flex justifyContent='flex-start' width="1000px" p="0 50px">
            <Box mr="10px" height="355px" css={{ overflowY: 'auto' }}>
                <Flex flexDirection="column">
                    {colorWithStyleImgs.map((item, i) => (
                        <Box
                            mb="8px"
                            p="20px 30px"
                            bg="#FFFFFF"
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
                    width="355px"
                    height="355px"
                    bg="#FFFFFF"
                    css={{
                        '.swiper-container': {
                            height: '100%',
                        },
                    }}
                >
                    {colorWithStyleImgs[current].type ? (
                        <Swiper>
                            {colorWithStyleImgs[current].favorite.styleAndColor.map(d => (
                                <Flex justifyContent="center" alignItems="center" height="100%">
                                    <StyleItem
                                        width="220px"
                                        styleId={`${colorWithStyleImgs[current].favorite._id}-${d._id}-item`}
                                        colors={d.colorIds}
                                        key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() * 1000000}`}
                                        {...d.styleId}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Flex>
                            ))}
                            {colorWithStyleImgs[current].favorite.styleAndColor.map(d => (
                                <Flex justifyContent="center" alignItems="center" height="100%">
                                    <StyleItem
                                        width="220px"
                                        styleId={`${colorWithStyleImgs[current].favorite._id}-${d._id}-item`}
                                        colors={d.colorIds}
                                        key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() * 1000000}`}
                                        {...d.styleId}
                                        svgUrl={d.styleId.svgUrlBack}
                                        shadowUrl={d.styleId.shadowUrlBack}
                                        styleSize={d.styleId.styleBackSize}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Flex>
                            ))}
                        </Swiper>
                    ) : null}
                    {colorWithStyleImgs[current].type ? null : (
                        <Swiper>
                            {colorWithStyleImgs[current].imgs.map((item, i) => (
                                <Flex justifyContent="center" alignItems="center" height="100%">
                                    <Image src={filterImageUrl(item)} width='280px'></Image>
                                </Flex>
                            ))}
                        </Swiper>
                    )}
                </Box>
            </Box>

            <Box pl="30px">
                <Text>2021 swimwear series</Text>
                <Text color="#313131" fontSize="28px" fontWeight="bold" my="6px">
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
                                    key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() * 1000000}`}
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
                                    key={`${colorWithStyleImgs[current].favorite._id}-${d._id}-${Math.random() * 1000000}`}
                                    {...d.styleId}
                                    svgUrl={d.styleId.svgUrlBack}
                                    shadowUrl={d.styleId.shadowUrlBack}
                                    styleSize={d.styleId.styleBackSize}
                                />
                            </Flex>
                        ))}
                    </Flex>
                ) : null}

                <Flex mt="16px">
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
                <Text fontSize="16px" mt="20px">
                    尺码/中包
                </Text>
                <Flex mt="10px">
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
                        onAddtoCart(currentCapsuleStyle);
                    }}
                >
                    <Text color="#fff" textAlign="center">
                        加入订单编辑器
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
    currentCapsuleTopStyleIndex,
    currentCapsuleBottomStyleIndex,
    capsuleStyleTopAndBottomList = { top: [], bottom: [] },
}) => {
    // const { colorWithStyleImgs = [], code, price, size, _id } = currentCapsuleStyle;
    // console.log('currentCapsuleStyle', currentCapsuleStyle);
    // console.log('capsuleStyleTopAndBottomList', capsuleStyleTopAndBottomList);
    // console.log('currentCapsuleTopStyleIndex', currentCapsuleTopStyleIndex);
    // const [current, setCurrent] = useState(0);
    useEffect(() => {
        // document.querySelector('body').style = 'overflow:hidden';
        Modal.setAppElement('body');
    }, []);

    const handleAddtoCart = payload => {
        dispatch({
            type: 'capsule/addOrderMark',
            payload: payload,
        });
    };

    const handleChangeTopIndex = payload => {
        let len = capsuleStyleTopAndBottomList.top.length;
        dispatch({
            type: 'capsule/setCurrentCapsuleTopStyleIndex',
            payload: (payload + len) % len,
        });
    };

    const handleChangeBottomIndex = payload => {
        let len = capsuleStyleTopAndBottomList.bottom.length;
        dispatch({
            type: 'capsule/setCurrentCapsuleBottomStyleIndex',
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
                    padding: 0
                },
            }}
        >
            <Flex flexDirection="column" alignItems="center" bg="#F7F7F7" pb="50px">
                <CloseBtn onClick={onClose}></CloseBtn>
                
                <Flex
                    justifyContent='space-between'
                    alignItems='center'
                    pt="6px"
                    width="1060px"
                >
                 
                        <ArrowBtn
                            onClick={() => {
                                handleChangeTopIndex(currentCapsuleTopStyleIndex - 1);
                            }}
                        ></ArrowBtn>
                    <ItemBox
                    onAddtoCart={handleAddtoCart}
                    currentCapsuleStyle={capsuleStyleTopAndBottomList.top[currentCapsuleTopStyleIndex]}
                />
                        <ArrowBtn
                            onClick={() => {
                                handleChangeTopIndex(currentCapsuleTopStyleIndex + 1);
                            }}
                            right
                        ></ArrowBtn>
                  
                </Flex>
               
                <Flex
                     justifyContent='space-between'
                     alignItems='center'
                        pt="6px"
                        width="1060px"
                >
                 
                        <ArrowBtn
                            onClick={() => {
                                handleChangeBottomIndex(currentCapsuleBottomStyleIndex - 1);
                            }}
                        ></ArrowBtn>
                        <ItemBox
                            onAddtoCart={handleAddtoCart}
                            currentCapsuleStyle={capsuleStyleTopAndBottomList.bottom[currentCapsuleBottomStyleIndex]}
                        />
                        <ArrowBtn
                            onClick={() => {
                                handleChangeBottomIndex(currentCapsuleBottomStyleIndex + 1);
                            }}
                            right
                        ></ArrowBtn>
                    
                </Flex>
            </Flex>
        </Modal>
    );
};

export default connect(({ capsule = {} }) => ({
    currentCapsule: capsule.currentCapsule,
    currentCapsuleStyle: capsule.currentCapsuleStyle,
    currentCapsuleTopStyleIndex: capsule.currentCapsuleTopStyleIndex,
    currentCapsuleBottomStyleIndex: capsule.currentCapsuleBottomStyleIndex,
    capsuleStyleTopAndBottomList: capsule.capsuleStyleTopAndBottomList,
}))(ModalSimple);
