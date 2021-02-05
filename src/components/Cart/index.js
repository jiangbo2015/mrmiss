import temp from '@/public/temp.jpg';
import { useState } from 'react';
import { Box, Flex, Image, Text } from 'rebass/styled-components';
import Dot from '../Capsule/Dot';
import { data, SizeBox } from '../Capsule/ModalComplex';
import Modal from '../Modal';

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
        }}
        {...props}
    />
);

const LineItem = () => (
    <Box mb="50px">
        <Flex alignItems="center">
            <RoundBtn mr="50px">x</RoundBtn>
            <Box width="150px">
                <Image src={temp}></Image>
            </Box>
            <Box width="200px" mx="30px">
                <Text fontSize="20px" fontWeight="bold" mb="10px">
                    2021 swimwear series
                </Text>
                <Text>Ref.5024 / 5035</Text>
                <Text>.42 / 44 / 46 / 48</Text>
                <Flex mt="20px">
                    {['red', 'yellow', 'green'].map((item, i) => (
                        <Box key={i} css={{ textAlign: 'center' }}>
                            <Dot bg={item} size="30px"></Dot>
                            <Text mt="0px">A</Text>
                        </Box>
                    ))}
                </Flex>
            </Box>
            <Box width="200px" mx="30px">
                <Text>Size / Qu antity </Text>
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
            </Box>
            <Text>$98</Text>
            <Box mx="30px">
                <Text>12pcs</Text>
                <Text>192pcs</Text>
            </Box>
            <Flex mx="30px" alignItems="center">
                <RoundBtn>-</RoundBtn>
                <Text mx="15px">2</Text>
                <RoundBtn>+</RoundBtn>
            </Flex>
            <Text>$192</Text>
        </Flex>
    </Box>
);

/**
 * data: 购物车列表
 * triggle: 控制器element，由组件自己控制visible
 * onOk: 点击确定
 * onCancel: 取消或者关闭
 * handleAdd: 点击+
 * handleReduce: 点击-
 * handleRemove: 点击x 删除
 */
export default ({ data, triggle, onOk, onCancel, handleAdd, handleReduce, handleRemove }) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <span onClick={() => setVisible(!visible)}>{triggle}</span>
            <Modal title="购物编号 STOCK20201108JOSE-01" visible={visible} width="1200px">
                {new Array(3).fill(0).map((item, index) => (
                    <LineItem key={index} data={item} />
                ))}
            </Modal>
        </>
    );
};
