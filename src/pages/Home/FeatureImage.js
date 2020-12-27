import bleft from '@/public/b-left.png';
import bright from '@/public/b-right.png';
import { Box, Flex } from 'rebass/styled-components';

export default () => (
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
);
