import temp from '@/public/temp.jpg';
import { Box, Flex, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';

// 胶囊组件
export default ({ handleOpen }) => (
    <Box
        p="8px"
        width={[1, 0.3]}
        maxWidth={['380px', '470px']}
        mb="30px"
        onClick={handleOpen}
        css={{
            border: '1px solid transparent',
            borderRadius: '10px',
            cursor: 'pointer',
            '&:hover': {
                borderColor: '#4B4B4B',
            },
        }}
    >
        <Box p="30px" bg="#F7F7F7" css={{ borderRadius: '10px' }}>
            <Flex justifyContent="center" mb="40px">
                <Image src={temp} mx="auto" alt="" />
            </Flex>

            <Box py="20px" css={{ fontSize: '12px' }}>
                <Text fontWeight="bold" fontSize="14px" mb="10px">
                    12 PCS
                </Text>
                <Text>Ref.5024 / 5035</Text>
                <Text mt="5px">Size.42 / 44 / 46 / 48</Text>
                <Flex css={{ position: 'relative' }} mt="14px" justifyContent="center" alignItems="center">
                    <Text
                        css={{
                            position: 'absolute',
                            left: 0,
                        }}
                        fontSize="22px"
                    >
                        $98
                    </Text>

                    {/* 底部小圆点，可以传图片或者背景，具体看组件用法 */}
                    {new Array(3).fill(0).map((x, i) => (
                        <Dot src={temp} key={i}></Dot>
                    ))}
                </Flex>
            </Box>
        </Box>
    </Box>
);
