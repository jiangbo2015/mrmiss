import Input from '@/components/Input';
import Modal from '@/components/Modal';
import UserCenter from '@/pages/UserCenter';
import WhiteChartIcon from '@/public/icons/icon-chart-white.svg';
import ChartIcon from '@/public/icons/icon-chart.svg';
import WLogoIcon from '@/public/w-logo.svg';
import IconBack from '@/public/icons/icon-menuback.svg';
import IconCapOrder from '@/public/icons/icon-menucaporder.svg';
import IconDIYOrder from '@/public/icons/icon-menudiyorder.svg';
import IconManage from '@/public/icons/icon-menumanage.svg';
import IconUser from '@/public/icons/icon-menuuser.svg';
import IconShopOrder from '@/public/icons/icon-shop.svg';
import IconUserSign from '@/public/icons/icon-usersign.svg';
import { Button, Dropdown, Form, Menu, message } from 'antd';
import { connect } from 'dva';
import 'normalize.css';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';
import { history, setLocale, useIntl } from 'umi';
import './index.less';

const MyMenu = ({ onOpenMyCenter, onChangePassword, handleLogout, businessUserd, innerDataUserd }) => (
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
            onClick={() => {
                onOpenMyCenter(2);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconDIYOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                我的定制订单
            </a>
        </Menu.Item>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(3);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconCapOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                我的胶囊订单
            </a>
        </Menu.Item>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(4);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconShopOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                我的网店订单
            </a>
        </Menu.Item>
        {businessUserd ? (
            <Menu.Item
                className="menuItemH"
                icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconManage} />}
                onClick={() => {
                    history.push('/business');
                }}
            >
                <a>业务管理</a>
            </Menu.Item>
        ) : null}
        {innerDataUserd ? (
            <Menu.Item
                className="menuItemH"
                icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={ChartIcon} />}
                onClick={() => {
                    history.push('/chart');
                }}
            >
                <a>数据分析</a>
            </Menu.Item>
        ) : null}


        <Menu.Item
            onClick={handleLogout}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px' }} src={IconBack} />}
        >
            <a target="_blank" rel="noopener noreferrer">
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

const Header = ({ currentUser, headerBgColor = '#fff', dispatch }) => {
    const intl = useIntl();
    const [headBg, setHeadBg] = useState(false);
    const [myCenter, setMyCenter] = useState(false);
    const [activeKey, setActiveKey] = useState(1);
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

    const [form] = Form.useForm();

    const onFinish = () => {
        form.validateFields().then(async (values, error) => {
            if (error) {
                return;
            }
            if (values.newPwd !== values.confirmPwd) {
                message.error('两次密码不一致');
                return;
            }
            await dispatch({
                type: 'user/changePwd',
                payload: values,
            });
            message.success('修改成功，请重新登录');
            setTimeout(() => {
                history.push('/');
                location.reload();
            }, 500);
        });
    };

    const handleLogout = () => {
        dispatch({
            type: 'user/logout',
        });
    };

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
                <UserCenter activeKey={activeKey} changeActiveKey={key => setActiveKey(key)} />
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
                <Form onFinish={onFinish} form={form}>
                    <Form.Item
                        label="旧密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password',
                            },
                        ]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item
                        label="新密码"
                        name="newPwd"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password',
                            },
                        ]}
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item
                        label="确认新密码"
                        name="confirmPwd"
                        rules={[
                            {
                                required: true,
                                message: 'Please input confirm new password',
                            },
                        ]}
                    >
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
                        src={WLogoIcon}
                        style={{
                            width: '96px',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            color: headerBgColor !== '#fff' ? '#fff' :'#000',
                            transform: 'translate(-50%, -50%)',
                        }}
                        onClick={() => {
                            history.push('/');
                        }}
                    />
            </div>
            <div style={{ display: 'flex' }}>
                {currentUser._id ? (
                    <>
                        {currentUser.goods.length ? (
                            <div
                                className="menuItem"
                                onClick={() => {
                                    history.push('/diy');
                                }}
                            >
                                {intl.formatMessage({ id: 'diy', defaultMessage: '定制' })}
                            </div>
                        ) : null}
                        {currentUser.capsules.length ? (
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
                        ) : null}
                        {currentUser.branchs.length ? (
                            <div
                                className="menuItem"
                                onClick={() => {
                                    history.push('/shop');
                                }}
                            >
                                {intl.formatMessage({ id: 'shop', defaultMessage: '网店' })}
                            </div>
                        ) : null}
                    </>
                ) : null}
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
                                onOpenMyCenter={key => {
                                    setMyCenter(true);
                                    setActiveKey(key);
                                }}
                                onChangePassword={() => {
                                    setChangePassword(true);
                                }}
                                handleLogout={handleLogout}
                                businessUserd={currentUser.businessUserd}
                                innerDataUserd={currentUser.innerDataUserd}
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
