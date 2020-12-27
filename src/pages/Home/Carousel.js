import cat1 from '@/public/3.png';
import { Box, Flex } from 'rebass/styled-components';

export default () => (
    <Box py="60px">
        <Flex justifyContent="space-between">
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
