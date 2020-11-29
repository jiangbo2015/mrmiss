import Header from '@/components/Header';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import theme from './theme';

export default props => (
    <ThemeProvider theme={theme}>
        <Box pt="100px">
            <Header></Header>
            {props.children}
        </Box>
    </ThemeProvider>
);
