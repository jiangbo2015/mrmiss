import { Box } from 'rebass/styled-components';
import { ThemeProvider } from 'styled-components';
import { useIntl } from 'umi';
import theme from './theme';
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { connect } from 'dva';
import LoginBox from '@/pages/User/Login';

const Layout = ({ pt, headerBgColor, dispatch, isLogin, setOpenLogin, bg = '#ffffff', ...props }) => {
    useEffect(() => {
        dispatch({
            type: 'user/getCurrentUser',
        });
    }, []);
    const intl = useIntl();
    return (
        <ThemeProvider theme={theme}>
            <Box pt={pt || 0} pb="112px" bg={bg}>
                {/* 测试多语言：
                {intl.formatMessage({ id: 'hello', defaultMessage: '你好' })} */}
                {/* <Button onClick={() => setLocale('zh-CN', false)}>中文</Button>
                <Button onClick={() => setLocale('en-US', false)}>英文</Button> */}
                <Header headerBgColor={headerBgColor} setOpenLogin={setOpenLogin}></Header>
                {props.children}
            </Box>
            <Footer />
            {isLogin ? <LoginBox setOpenLogin={setOpenLogin} /> : null}
        </ThemeProvider>
    );
};

export default connect(({ user = {}, home = {} }) => ({ currentUser: user.info, systemDetail: home.systemDetail }))(Layout);
