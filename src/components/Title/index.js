import { Box, Heading, Text } from 'rebass/styled-components';

export default ({ title, subtitle }) => (
    <Box maxWidth="1300px" mx="auto">
        <Heading fontSize="32px" textAlign="center" color="#020202">
            {title}
        </Heading>
        <Text fontSize="16px" lineHeight="38px" textAlign="center" mt="10px" color="#434242">
            {subtitle}
        </Text>
    </Box>
);
