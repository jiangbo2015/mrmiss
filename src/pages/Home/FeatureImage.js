import bleft from '@/public/b-left.png';
import bright from '@/public/b-right.png';
import { Box, Flex } from 'rebass/styled-components';

import { filterImageUrl } from '@/utils/helper';

export default ({ imgsInfo = {} }) => (
    <Flex flexWrap="wrap">
        <Box
            width={0.4}
            height="500px"
            css={{
                background: `url(${filterImageUrl(imgsInfo.exhibition1)}) no-repeat`,
                backgroundSize: 'cover',
            }}
        ></Box>
        <Box
            width={0.6}
            height="500px"
            css={{
                background: `url(${filterImageUrl(imgsInfo.exhibition2)}) no-repeat`,
                backgroundSize: 'cover',
            }}
        ></Box>
    </Flex>
);
