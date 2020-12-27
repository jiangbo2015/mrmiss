import { Box } from 'rebass/styled-components';

export default ({ children, ...props }) => (
    <Box maxWidth="1440px" mx="auto" {...props}>
        {children}
    </Box>
);
