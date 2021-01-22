import 'normalize.css';
import './index.less';
import { useEffect, useState } from 'react';
import { useIntl, setLocale, history } from 'umi';
import { connect } from 'dva';

const Header = ({ currentUser, headerBgColor = '#fff' }) => {
    const intl = useIntl();
    const [headBg, setHeadBg] = useState(false);
    useEffect(() => {
        window.onscroll = () => {
            let scrollTopPx = window.scrollY;
            if (scrollTopPx > 70 && !headBg) {
                setHeadBg(true);
            } else if (scrollTopPx <= 70) {
                setHeadBg(false);
            }
        };
    }, []);
    return (
        <header
            className="header"
            style={{
                background:
                    !headBg && headerBgColor === '#fff'
                        ? 'rgba(0,0,0,0)'
                        : headerBgColor,
                color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
            }}
        >
            <div style={{ display: 'flex' }}>
                <div className="menuItem">
                    <span onClick={() => setLocale('zh-CN', false)}>CN</span>/
                    <span onClick={() => setLocale('en-US', false)}>EN</span>
                </div>
                <div className="menuItem">
                    {intl.formatMessage({
                        id: 'about_us',
                        defaultMessage: '关于我们',
                    })}
                </div>
                <div className="menuItem">
                    {intl.formatMessage({
                        id: 'concat_us',
                        defaultMessage: '联系我们',
                    })}
                </div>
            </div>
            <div>chart</div>
            <div style={{ display: 'flex' }}>
                <div
                    className="menuItem"
                    onClick={() => {
                        history.push('/diy');
                    }}
                >
                    {intl.formatMessage({ id: 'diy', defaultMessage: '定制' })}
                </div>
                <div
                    className="menuItem"
                    onClick={() => {
                        history.push('/capsule');
                    }}
                >
                    {intl.formatMessage({
                        id: 'capsule',
                        defaultMessage: '胶囊系列',
                    })}
                </div>
                <div className="menuItem">
                    {intl.formatMessage({ id: 'shop', defaultMessage: '网店' })}
                </div>
                <div className="menuItem">
                    {currentUser._id
                        ? intl.formatMessage({
                              id: 'logout',
                              defaultMessage: '登出',
                          })
                        : intl.formatMessage({
                              id: 'login',
                              defaultMessage: '登录',
                          })}
                </div>
            </div>
        </header>
    );
};

export default connect(({ user }) => ({ currentUser: user.info }))(Header);
