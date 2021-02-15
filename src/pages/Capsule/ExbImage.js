import bleft from '@/public/b-left.png';
import bright from '@/public/b-right.png';
import { Box, Flex, Image } from 'rebass/styled-components';

import { filterImageUrl } from '@/utils/helper';

export default ({ imgsInfo = {} }) => (
    <Flex>
        <Box width={5 / 8}>
            <Image width={1} src={filterImageUrl(imgsInfo.exhibition1)} />
        </Box>
        <Box width={3 / 8}>
            <Box width={1}>
                <Image width={1} src={filterImageUrl(imgsInfo.exhibition2)} />
            </Box>
            <Flex>
                <Box width={2 / 3}>
                    <Image width={1} src={filterImageUrl(imgsInfo.exhibition3)} />
                </Box>
                <Box width={1 / 3}>
                    <Box width={1}>
                        <Image width={1} src={filterImageUrl(imgsInfo.exhibition4)} />
                    </Box>
                    <Box width={1}>
                        <Image width={1} src={filterImageUrl(imgsInfo.exhibition5)} />
                    </Box>
                </Box>
            </Flex>
        </Box>
    </Flex>
);
