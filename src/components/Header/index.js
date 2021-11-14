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
import { AlignLeftOutlined } from '@ant-design/icons';

{
    /* <AlignLeftOutlined /> */
}
import 'normalize.css';
import { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';
import { history, setLocale, useIntl, Link } from 'umi';
import './index.less';

const MyMenu = ({ onOpenMyCenter, onChangePassword, handleLogout, businessUserd, innerDataUserd, intl }) => (
    <Menu>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(1);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px', height: '24px' }} src={IconUser} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({
                    id: 'my_data',
                    defaultMessage: '我的用户信息',
                })}
            </a>
        </Menu.Item>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(2);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px', height: '22.5px' }} src={IconDIYOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({
                    id: 'my_diy_order',
                    defaultMessage: '我的定制订单',
                })}
            </a>
        </Menu.Item>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(3);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px', height: '26px' }} src={IconCapOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({
                    id: 'my_capsule_order',
                    defaultMessage: '我的胶囊订单',
                })}
            </a>
        </Menu.Item>
        <Menu.Item
            onClick={() => {
                onOpenMyCenter(4);
            }}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px', height: '24px' }} src={IconShopOrder} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({
                    id: 'my_shop_order',
                    defaultMessage: '我的网店订单',
                })}
            </a>
        </Menu.Item>
        {businessUserd ? (
            <Menu.Item
                className="menuItemH"
                icon={<ReactSVG style={{ display: 'inline-block', width: '24px', height: '24px' }} src={IconManage} />}
                // onClick={() => {
                //     history.push('/business');
                // }}
            >
                <Link to="/business">
                    {intl.formatMessage({
                        id: 'business_management',
                        defaultMessage: '业务管理',
                    })}
                </Link>
            </Menu.Item>
        ) : null}
        {innerDataUserd ? (
            <Menu.Item className="menuItemH" icon={<ReactSVG style={{ width: '24px', height: '28px' }} src={ChartIcon} />}>
                <Link to="/chart">
                    {intl.formatMessage({
                        id: 'data_analysis',
                        defaultMessage: '数据分析',
                    })}
                </Link>
            </Menu.Item>
        ) : null}

        <Menu.Item
            onClick={handleLogout}
            className="menuItemH"
            icon={<ReactSVG style={{ display: 'inline-block', width: '24px', height: '27px' }} src={IconBack} />}
        >
            <a target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({
                    id: 'log_out',
                    defaultMessage: '退出登录',
                })}
            </a>
        </Menu.Item>
        <Menu.Item
            className="menuItemH"
            onClick={() => {
                onChangePassword();
            }}
        >
            <a target="_blank" rel="noopener noreferrer">
                {intl.formatMessage({
                    id: 'change_password',
                    defaultMessage: '修改密码',
                })}
            </a>
        </Menu.Item>
    </Menu>
);

const Header = ({ currentUser, setOpenLogin, headerBgColor = '#fff', dispatch }) => {
    const intl = useIntl();
    const [headBg, setHeadBg] = useState(false);
    const [myCenter, setMyCenter] = useState(false);
    const [showMore, setShowMore] = useState(false);
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

            <div style={{ position: 'relative', width: '240px', display: 'flex', marginLeft: '50px' }}>
                <AlignLeftOutlined
                    style={{ fontSize: '24px', marginRight: '30px' }}
                    onClick={() => {
                        setShowMore(!showMore);
                    }}
                />
                <Link to="/">
                    <ReactSVG
                        src={WLogoIcon}
                        style={{
                            width: '96px',
                            position: 'relative',
                            color: headerBgColor !== '#fff' ? '#fff' : '#000',
                        }}
                    />
                </Link>
                <div style={{ position: 'absolute', left: 0, top: '40px', display: showMore ? 'initial' : 'none' }}>
                    <div className="menuItemH2">
                        <span onClick={() => setLocale('zh-CN', true)}>CN</span>/
                        <span onClick={() => setLocale('en-US', true)}>EN</span>
                    </div>
                    <Link to="/#aboutas">
                        <div
                            style={{
                                color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
                            }}
                            className="menuItemH2"
                            onClick={() => {
                                console.log('Whitout _blank');
                                history.push('/#aboutas');
                            }}
                        >
                            {intl.formatMessage({
                                id: 'about_us',
                                defaultMessage: '关于我们',
                            })}
                        </div>
                    </Link>
                    <Link to="/contactus">
                        <div
                            className="menuItemH2"
                            style={{
                                color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
                            }}
                        >
                            {intl.formatMessage({
                                id: 'concat_us',
                                defaultMessage: '联系我们',
                            })}
                        </div>
                    </Link>
                </div>
            </div>

            <div style={{ display: 'flex' }}>
                {currentUser._id ? (
                    <>
                        {currentUser?.goods?.length ? (
                            <Link to="/diy">
                                <div
                                    className="menuItem"
                                    style={{
                                        color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
                                    }}
                                >
                                    {intl.formatMessage({ id: 'diy', defaultMessage: '定制' })}
                                </div>
                            </Link>
                        ) : null}
                        {currentUser?.capsules?.length ? (
                            <Link to="/capsule">
                                <div
                                    className="menuItem"
                                    style={{
                                        color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
                                    }}
                                >
                                    {intl.formatMessage({
                                        id: 'capsule',
                                        defaultMessage: '胶囊系列',
                                    })}
                                </div>
                            </Link>
                        ) : null}
                        {currentUser?.branchs?.length ? (
                            <Link to="/shop">
                                <div
                                    className="menuItem"
                                    style={{
                                        color: headerBgColor !== '#fff' ? '#fff' : 'inherit',
                                    }}
                                >
                                    {intl.formatMessage({ id: 'shop', defaultMessage: '网店' })}
                                </div>
                            </Link>
                        ) : null}
                    </>
                ) : null}
                {!currentUser._id ? (
                    <div
                        className="menuItem"
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={() => {
                            if (setOpenLogin) {
                                setOpenLogin(true);
                            } else {
                                history.push('/');
                            }
                            //  ?  : ;
                        }}
                    >
                        <ReactSVG src={IconUserSign} style={{ width: '20px', height: '20px', marginRight: '4px' }} />
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
                                intl={intl}
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
