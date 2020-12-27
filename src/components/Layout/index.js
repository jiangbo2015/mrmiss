import Header from '@/components/Header';
import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import { useIntl } from 'umi';
import theme from './theme';

export default props => {
    const intl = useIntl();
    return (
        <ThemeProvider theme={theme}>
            <Box pt="74px">
                {/* 测试多语言：
                {intl.formatMessage({ id: 'hello', defaultMessage: '你好' })} */}
                {/* <Button onClick={() => setLocale('zh-CN', false)}>中文</Button>
                <Button onClick={() => setLocale('en-US', false)}>英文</Button> */}
                <Header></Header>
                {props.children}
            </Box>
        </ThemeProvider>
    );
};
