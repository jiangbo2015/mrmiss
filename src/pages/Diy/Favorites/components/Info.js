import { Flex, Box } from 'rebass/styled-components';

export default ({ label, value }) => {
    return (
        <Flex alignItems="center">
            <Box
                width="4px"
                height="4px"
                m="6px"
                sx={{ borderRadius: '2px' }}
                bg="#000"
            />
            {label}：{value}
        </Flex>
    );
};
