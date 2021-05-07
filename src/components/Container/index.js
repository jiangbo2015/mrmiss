import { Box } from 'rebass/styled-components';

export default ({ children, ...props }) => (
    <Box
        // maxWidth={window.screen.width > 1680 ? '1440px' : '1200px'}
        maxWidth={['1480px']}
        mx="auto"
        width="calc(100% - 300px)"
        {...props}
    >
        {children}
    </Box>
);
