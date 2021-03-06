import bleft from '@/public/b-left.png';
import bright from '@/public/b-right.png';
import { Box, Flex, Image } from 'rebass/styled-components';

import { filterImageUrl } from '@/utils/helper';

export default ({ imgsInfo = {} }) => (
    <Flex flexWrap="wrap">
        <Box
            width={0.4}
            sx={{
                overflow: 'hidden',
            }}
        >
            <Image
                sx={{
                    width: '100%',
                    height: '100%',
                }}
                src={filterImageUrl(imgsInfo.exhibition1)}
            />
        </Box>

        <Box
            width={0.6}
            sx={{
                overflow: 'hidden',
            }}
        >
            <Image
                src={filterImageUrl(imgsInfo.exhibition2)}
                sx={{
                    height: 'auto',
                    width: '100%',
                    transition: 'all 1s',
                    cursor: 'pointer',
                    ':hover': {
                        transform: 'scale(1.3)',
                    },
                }}
            />
        </Box>
    </Flex>
);
