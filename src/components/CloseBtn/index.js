import { Box, Flex } from 'rebass/styled-components';

const CloseBtn = props => (
    <Flex py="40px" justifyContent="flex-end" pr="30px" css={{ cursor: 'pointer' }} {...props}>
        <Box height="5px" width="30px" bg="#000"></Box>
    </Flex>
);

export default CloseBtn;
