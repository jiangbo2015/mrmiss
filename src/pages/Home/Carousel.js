import cat1 from '@/public/3.png';
import bleft from '@/public/b-left.png';
import bright from '@/public/b-right.png';
import { Box, Flex } from 'rebass/styled-components';

export default () => (
    <Box py="60px">
        <Flex flexWrap="wrap">
            <Box
                width={0.4}
                height="500px"
                css={{
                    background: `url(${bleft}) no-repeat`,
                    backgroundSize: 'cover',
                }}
            ></Box>
            <Box
                width={0.6}
                height="500px"
                css={{
                    background: `url(${bright}) no-repeat`,
                    backgroundSize: 'cover',
                }}
            ></Box>
        </Flex>
        <Flex justifyContent="space-between" mt="40px">
            {new Array(5).fill(0).map((x, i) => (
                <Box
                    width={0.18}
                    height="300px"
                    key={i}
                    css={{
                        background: `url(${cat1}) no-repeat`,
                        backgroundSize: 'cover',
                    }}
                ></Box>
            ))}
        </Flex>
    </Box>
);
