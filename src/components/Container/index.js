import { Box } from 'rebass/styled-components';

export default ({ children, ...props }) => (
    <Box
        // maxWidth={window.screen.width > 1680 ? '1440px' : '1200px'}
        maxWidth={['1300px']}
        width="calc(100% - 260px)"
        {...props}
    >
        {children}
    </Box>
);
