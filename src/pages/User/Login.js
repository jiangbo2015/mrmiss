import { connect } from 'dva';
import { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Button, Flex } from 'rebass/styled-components';
import { useIntl } from 'umi';
import './index.less';
import IconClose from '@/public/icons/icon-close.svg';

const Login = ({ dispatch, setOpenLogin }) => {
    const [account, setAccount] = useState('');
    const [pwd, setPwd] = useState('');
    const intl = useIntl();
    const handleLogin = async () => {
        console.log('click');
        await dispatch({
            type: 'user/login',
            payload: {
                account,
                password: pwd,
            },
        });
        setOpenLogin(false);
    };

    return (
        <div
            // bg="background"
            // p="30px"
            // sx={{ position: 'absolute', zIndex: 999 }}
            className="loginWrapper"
        >
            <Flex width={[1]} justifyContent="flex-end">
                <ReactSVG
                    onClick={() => {
                        setOpenLogin(false);
                    }}
                    src={IconClose}
                    style={{ width: '20px', height: '20px', marginRight: '-20px' }}
                />
            </Flex>

            <div className="loginTitle">
                {intl.formatMessage({
                    id: 'sign_in',
                    defaultMessage: '登录',
                })}
            </div>
            <p>
                <input type="text" value={account} onChange={e => setAccount(e.target.value)} />
            </p>
            <p>
                <input type="text" value={pwd} onChange={e => setPwd(e.target.value)} />
            </p>

            <Button variant="primary" onClick={handleLogin}>
                {intl.formatMessage({
                    id: 'login',
                    defaultMessage: '登录',
                })}
            </Button>
        </div>
    );
};

export default connect(state => state)(Login);
