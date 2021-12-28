import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Box, Flex, Image, Text } from 'rebass/styled-components';

import Dot from '../Capsule/Dot';
// import temp from '@/public/temp.jpg';

// import Dot from '../Capsule/Dot';
import { StyleSwitcher, SizeBox } from '../Capsule/ModalShopSimple';
import { filterImageUrl } from '@/utils/helper';
import Modal from '../Modal';

import { connect } from 'dva';

const RoundBtn = props => (
    <Flex
        flex="none"
        width="30px"
        height="30px"
        justifyContent="center"
        alignItems="center"
        css={{
            border: '1px solid #000',
            borderRadius: '50%',
            fontSize: '18px',
            cursor: 'pointer',
        }}
        {...props}
    />
);

const LineItem = ({ data, showNum, onUpdate, readOnly, userRole }) => {
    // console.log('showNum', showNum);
    const { shopStyleObj, count, _id } = data;
    const { price, code, size, colorWithStyleImgs = [], numInBag, bagsNum } = shopStyleObj;
    const [current, setCurrent] = useState(0);
    return (
        <Box p="50px" mb="25px" sx={{ background: '#fff', borderRadius: '6px' }}>
            <Flex alignItems="center" justifyContent="space-between">
                {readOnly ? null : (
                    <RoundBtn
                        mr="10px"
                        onClick={() => {
                            onUpdate({ _id, isDel: 1 });
                        }}
                    >
                        x
                    </RoundBtn>
                )}

                <Box width="120px" m="0 58px">
                    {/* <Swiper> */}
                    {/* {colorWithStyleImgs[current]?.imgs.map((item, i) => ( */}
                    <Flex justifyContent="center" alignItems="center" height="100%">
                        <Image src={filterImageUrl(colorWithStyleImgs[current]?.imgs[0])} />
                    </Flex>
                    {/* ))} */}
                    {/* </Swiper> */}
                </Box>
                <Box width="200px" mx="30px">
                    <Text fontSize="20px" fontWeight="bold" mb="10px">
                        2021 swimwear series
                    </Text>
                    <Text>Ref.{code}</Text>
                    <Text>SIZE.{size}</Text>
                    <Flex mt="20px">
                        {colorWithStyleImgs.map((item, i) => (
                            <StyleSwitcher
                                key={`cart-${item._id}`}
                                type={item.colorObj?.type}
                                bg={item.colorObj?.type ? filterImageUrl(item.colorObj?.value) : item.colorObj?.value}
                                code={item.colorObj?.code}
                                text={item.colorObj?.namecn}
                                isSelect={i === current}
                                size={16}
                                onClick={() => {
                                    setCurrent(i);
                                }}
                            />
                        ))}
                    </Flex>
                </Box>
                <Box width="240px" mx="30px">
                    <Text>Size / Quantity </Text>
                    <Box mt="15px">
                        <Flex>
                            <SizeBox>S / Q</SizeBox>
                            {size?.split('/').map((item, i) => (
                                <SizeBox key={`cart-size-${item._id}`} width="41px" bg="#EEEDED">
                                    {item}
                                </SizeBox>
                            ))}
                        </Flex>
                        {colorWithStyleImgs.map((item, index) => (
                            <Flex>
                                <SizeBox key={`${index}-sizetitle`} bg="#F7F7F7">
                                    <Dot
                                        type={item.colorObj?.type}
                                        bg={item.colorObj?.type ? false : item.colorObj?.value}
                                        src={item.colorObj?.type ? filterImageUrl(item.colorObj?.value) : ''}
                                        code={item.colorObj?.code}
                                        text={item.colorObj?.namecn}
                                        size="14px"
                                    />
                                </SizeBox>
                                {size?.split('/').map((s, i) => (
                                    <SizeBox key={`${i}-sizebox`} width="41px" bg="#F7F7F7">
                                        {item.sizeWithQuantity[s]}
                                    </SizeBox>
                                ))}
                            </Flex>
                        ))}
                    </Box>
                    <Text>{userRole === 4 ? `${numInBag}pcs` : `${numInBag}pcs*${bagsNum}`}</Text>
                </Box>
                <Text>¥.{price}</Text>
                <Box mx="30px">
                    {/* <Text>12pcs</Text> */}
                    <Text>{showNum}pcs</Text>
                </Box>
                <Flex mx="30px" alignItems="center">
                    <RoundBtn
                        onClick={() => {
                            onUpdate({ _id, count: count - 1 });
                        }}
                    >
                        --
                    </RoundBtn>
                    <Text mx="15px">{count}</Text>
                    <RoundBtn
                        onClick={() => {
                            onUpdate({ _id, count: count + 1 });
                        }}
                    >
                        +
                    </RoundBtn>
                </Flex>
                <Text justifyContent="flex-end" width="100px" textAlign="end">
                    ¥{count * showNum * price}
                </Text>
            </Flex>
        </Box>
    );
};

/**
 * data: 购物车列表
 * triggle: 控制器element，由组件自己控制visible
 * onOk: 点击确定
 * onCancel: 取消或者关闭
 * handleAdd: 点击+
 * handleReduce: 点击-
 * handleRemove: 点击x 删除
 */
const Cart = ({
    currentShopOrderData = [],
    dispatch,
    triggle,
    onSave,
    onUpdate,
    visible,
    currentUser,
    currentOrder = {},
    clearSelected = () => {},
    onCancel,
    readOnly,
}) => {
    // const [visible, setVisible] = useState(false);
    let sumCount = 0;
    let sumPrice = 0;
    currentShopOrderData.map(sc => {
        // console.log('sc.count', sc.count);
        let { shopStyleObj = { caseNum: 0, numInBag: 0, price: 0 } } = sc;
        let itemCount = currentUser.role == 1 ? shopStyleObj.caseNum : shopStyleObj.numInBag;
        sumCount += sc.count * itemCount;
        // console.log('sumCount', sumCount);
        sumPrice += sc.count * itemCount * shopStyleObj.price;
    });
    useEffect(() => {
        // // console.log('fetchMyShopCart');
        if (visible) {
            // init();
        } else {
            clearSelected();
        }
    }, [visible]);

    const handleUpdate = data => {
        // console.log('data', data)
        onUpdate(data);
    };

    const handleOrder = async () => {
        if (currentShopOrderData.length < 1) {
            return;
        }
        onSave(currentShopOrderData);
    };
    return (
        <Modal
            footer={null}
            visible={visible}
            width={'100%'}
            onCancel={onCancel}
            style={{ background: '#E6E2E7' }}
            bodyStyle={{
                background: '#E6E2E7',
            }}
        >
            <Flex justifyContent="center" fontSize="18px" pb="20px">
                <b>{currentOrder.orderNo}</b>
            </Flex>

            {currentShopOrderData.map((item, index) => (
                <LineItem
                    readOnly={readOnly}
                    key={`shop-cart-${index}-${item._id}`}
                    userRole={currentUser.role}
                    showNum={currentUser.role == 1 ? item.shopStyleObj.caseNum : item.shopStyleObj.numInBag}
                    data={item}
                    onUpdate={handleUpdate}
                />
            ))}
            <Flex>
                <Text mr="18px">总数:{sumCount}</Text>
                <Text>总金额:¥{sumPrice}</Text>
            </Flex>
            {readOnly ? null : (
                <Flex justifyContent="flex-end">
                    <Button
                        type="primary"
                        style={{
                            padding: '0 50px',
                            height: '45px',
                            lineHeight: 1,
                        }}
                        onClick={handleOrder}
                    >
                        保存
                    </Button>
                </Flex>
            )}
        </Modal>
    );
};

export default Cart;
