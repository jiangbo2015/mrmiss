import temp from '@/public/temp.jpg';
import { Box, Flex, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';

export default () => (
    <Box p="40px" bg="#F7F7F7" width={[1, 0.3]} maxWidth="470px" mb="30px">
        <Flex justifyContent="center">
            <Image src={temp} mx="auto" alt="" />
        </Flex>

        <Box py="20px" css={{ fontSize: '12px' }}>
            <Text>Ref.5024 / 5035</Text>
            <Text mt="5px">Size.42 / 44 / 46 / 48</Text>
            <Flex
                css={{ position: 'relative' }}
                mt="14px"
                justifyContent="center"
            >
                <Text
                    css={{
                        position: 'absolute',
                        left: 0,
                    }}
                    fontSize="22px"
                >
                    $98
                </Text>

                {new Array(3).fill(0).map((x, i) => (
                    <Dot bg="red" key={i}></Dot>
                ))}
            </Flex>
        </Box>
    </Box>
);
