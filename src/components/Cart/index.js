import { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Box, Flex, Image, Text } from 'rebass/styled-components';

import { useIntl } from 'umi';

import Dot from '../Capsule/Dot';
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

const LineItem = ({ data, showNum, onUpdate, readOnly, branchKindObj, userRole }) => {
    // // console.log('showNum', showNum);
    const { shopStyle, count, _id } = data;
    const { price, code, size, colorWithStyleImgs = [], numInBag, caseNum, bagsNum } = shopStyle;
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
                        {branchKindObj ? branchKindObj.namecn : ' '}
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
    myShopCartList = [],
    dispatch,
    triggle,
    triggleStyle,
    currentUser,
    selectedList = [],
    currentBranch,
    clearSelected = () => {},
    readOnly,
}) => {
    const intl = useIntl();
    // console.log('currentBranch', currentBranch)
    const [visible, setVisible] = useState(false);
    let sumCount = 0;
    let sumPrice = 0;
    // let branchKindObjArr = []
    myShopCartList.map(sc => {
        // // console.log('sc.count', sc.count);
        let { shopStyle = { caseNum: 0, numInBag: 0, price: 0 } } = sc;
        let itemCount = currentUser.role == 1 ? shopStyle.caseNum : shopStyle.numInBag;
        sumCount += sc.count * itemCount;
        // // console.log('sumCount', sumCount);
        sumPrice += sc.count * itemCount * shopStyle.price;
    });
    useEffect(() => {
        // // console.log('fetchMyShopCart');
        if (visible) {
            init();
        } else {
            clearSelected();
        }
    }, [visible]);
    const init = async () => {
        for (let i = 0; i < selectedList.length; i++) {
            await dispatch({
                type: 'shop/addShopCart',
                payload: {
                    shopStyle: selectedList[i].style,
                    count: 1,
                },
            });
        }

        dispatch({
            type: 'shop/fetchMyShopCart',
        });
    };
    const handleUpdate = data => {
        dispatch({
            type: 'shop/updateShopCart',
            payload: data,
        });
    };

    const handleOrder = async () => {
        if (myShopCartList.length < 1) {
            return;
        }
        await dispatch({
            type: 'shop/addShopOrder',
            payload: {
                sumCount,
                sumPrice,
                orderData: myShopCartList.map(sc => ({
                    shopStyleObj: sc.shopStyle,
                    count: sc.count,
                })),
                scIds: myShopCartList.map(x => x._id),
            },
        });
        setVisible(false);
    };
    return (
        <>
            <Flex width="200px" justifyContent="flex-end" onClick={() => setVisible(true)} style={triggleStyle}>
                {triggle}
            </Flex>
            <Modal
                footer={null}
                visible={visible}
                width={'100%'}
                onCancel={() => setVisible(false)}
                style={{ background: '#E6E2E7' }}
                bodyStyle={{
                    background: '#E6E2E7',
                }}
            >
                {readOnly ? null : (
                    <Flex justifyContent="center" fontSize="18px" pb="20px">
                        <b>
                            {intl.formatMessage({
                                id: 'cart',
                                defaultMessage: '购物车',
                            })}
                        </b>
                    </Flex>
                )}
                {myShopCartList.map((item, index) => (
                    <LineItem
                        readOnly={readOnly}
                        key={`shop-cart-${index}-${item._id}`}
                        showNum={currentUser.role == 1 ? item.shopStyle.caseNum : item.shopStyle.numInBag}
                        userRole={currentUser.role}
                        data={item}
                        branchKindObj={currentBranch.children.find(x => x._id === item.shopStyle.branchKind)}
                        onUpdate={handleUpdate}
                    />
                ))}
                <Flex>
                    <Text mr="18px">
                        {intl.formatMessage({
                            id: 'total_quantity',
                            defaultMessage: '总数',
                        })}
                        :{sumCount}
                    </Text>
                    <Text>
                        {intl.formatMessage({
                            id: 'total_amount',
                            defaultMessage: '总金额',
                        })}
                        :¥{sumPrice}
                    </Text>
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
                            {intl.formatMessage({
                                id: 'buy_now',
                                defaultMessage: '确认购买',
                            })}
                        </Button>
                    </Flex>
                )}
            </Modal>
        </>
    );
};

export default connect(({ shop = {}, user }) => ({
    myShopCartList: shop.myShopCartList,
    currentUser: user.info,
    currentBranch: shop.currentBranch,
}))(Cart);
