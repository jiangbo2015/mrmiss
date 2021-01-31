import { Box } from 'rebass/styled-components';

export default ({ children, ...props }) => (
    <Box
        // maxWidth={window.screen.width > 1680 ? '1440px' : '1200px'}
        maxWidth={['1200px', '1440px']}
        mx="auto"
        {...props}
    >
        {children}
    </Box>
);
