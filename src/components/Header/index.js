import 'normalize.css';
import './index.less';
import { useEffect, useState } from 'react';
import { useIntl, setLocale, history } from 'umi';
import { connect } from 'dva';
import { Menu, Dropdown, Form, Button } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';
import ChartIcon from '@/public/icons/icon-chart.svg';
import WhiteChartIcon from '@/public/icons/icon-chart-white.svg';

import IconUser from '@/public/icons/icon-menuuser.svg';
import IconUserSign from '@/public/icons/icon-usersign.svg';
import IconDIYOrder from '@/public/icons/icon-menudiyorder.svg';
import IconCapOrder from '@/public/icons/icon-menucaporder.svg';
import IconManage from '@/public/icons/icon-menumanage.svg';
import IconShopOrder from '@/public/icons/icon-shop.svg';
import IconBack from '@/public/icons/icon-menuback.svg';

import UserCenter from '@/pages/UserCenter';
import Modal from '@/components/Modal';
import Input from '@/components/Input';

const MyMenu = ({ onOpenMyCenter, onChangePassword }) => (
    <Menu>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(1);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconUser} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                我的用户信息
            </a>
        </Menu.Item>
        <Menu.Item
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconDIYOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                我的定制订单
            </a>
        </Menu.Item>
        <Menu.Item
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconCapOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                我的胶囊订单
            </a>
        </Menu.Item>
        <Menu.Item
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconShopOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                我的网店订单
            </a>
        </Menu.Item>
        <Menu.Item className="menuItemH" icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconManage} />}>
            <a target="_blank" rel="noopener noreferrer" href="/business">
                业务管理
            </a>
        </Menu.Item>
        <Menu.Item className="menuItemH" icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconBack} />}>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                退出登录
            </a>
        </Menu.Item>
        <Menu.Item
            className="menuItemH"
            onClick={() => {
                onChangePassword();
            }}
        >
            <a target="_blank" rel="noopener noreferrer">
                修改密码
            </a>
        </Menu.Item>
    </Menu>
);

const Header = ({ currentUser, headerBgColor = '#fff' }) => {
    const intl = useIntl();
    const [headBg, setHeadBg] = useState(false);
    const [myCenter, setMyCenter] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
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
                background: !headBg && headerBgColor === '#fff' ? 'rgba(0,0,0,0)' : headerBgColor,
                color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
            }}
        >
            <Modal
                width="100%"
                style={{ padding: 0 }}
                bodyStyle={{ padding: 0 }}
                visible={myCenter}
                onCancel={() => {
                    setMyCenter(false);
                }}
                footer={null}
            >
                <UserCenter />
            </Modal>
            <Modal
                className="mm-yellow-modal"
                footer={false}
                visible={changePassword}
                onCancel={() => {
                    setChangePassword(false);
                }}
                title={
                    <Flex bg="#FDDB3A" width={1} justifyContent="center">
                        修改密码
                    </Flex>
                }
                bodyStyle={{
                    backgroundColor: '#F0F0F0',
                }}
                width="400px"
            >
                <Form>
                    <Form.Item label="旧密码">
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item label="新密码">
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item label="确认新密码">
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="default" htmlType="submit">
                            确认
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div style={{ display: 'flex' }}>
                <div className="menuItem">
                    <span onClick={() => setLocale('zh-CN', false)}>CN</span>/
                    <span onClick={() => setLocale('en-US', false)}>EN</span>
                </div>
                <div
                    className="menuItem"
                    onClick={() => {
                        history.push('/#aboutas');
                    }}
                >
                    {intl.formatMessage({
                        id: 'about_us',
                        defaultMessage: '关于我们',
                    })}
                </div>
                <div
                    className="menuItem"
                    onClick={() => {
                        history.push('/contactus');
                    }}
                >
                    {intl.formatMessage({
                        id: 'concat_us',
                        defaultMessage: '联系我们',
                    })}
                </div>
            </div>
            <div>
                <ReactSVG
                    src={headerBgColor !== '#fff' ? WhiteChartIcon : ChartIcon}
                    style={{ width: '32px' }}
                    onClick={() => {
                        history.push('/chart');
                    }}
                />
            </div>
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
                <div
                    className="menuItem"
                    onClick={() => {
                        history.push('/shop');
                    }}
                >
                    {intl.formatMessage({ id: 'shop', defaultMessage: '网店' })}
                </div>
                {!currentUser._id ? (
                    <div className="menuItem" style={{ display: 'flex', alignItems: 'flex-end' }}>
                        <ReactSVG src={IconUserSign} style={{ width: '24px', height: '24px', paddingRight: '4px' }} />
                        <span>
                            {intl.formatMessage({
                                id: 'login',
                                defaultMessage: '登录',
                            })}
                        </span>
                    </div>
                ) : null}
                {currentUser._id ? (
                    <Dropdown
                        overlay={
                            <MyMenu
                                onOpenMyCenter={() => {
                                    setMyCenter(true);
                                }}
                                onChangePassword={() => {
                                    setChangePassword(true);
                                }}
                            />
                        }
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <div style={{ padding: '0 50px 0 40px', display: 'flex', alignItems: 'center' }}>{currentUser.name}</div>
                    </Dropdown>
                ) : null}
            </div>
        </header>
    );
};

export default connect(({ user = { info: {} } }) => ({ currentUser: user.info }))(Header);
