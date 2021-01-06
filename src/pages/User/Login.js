import { connect } from 'dva';
import { useIntl } from 'umi';
import { useState } from 'react';
import { Box, Button } from 'rebass/styled-components';
import './index.less';

const Login = ({ dispatch }) => {
    const [account, setAccount] = useState('paige');
    const [pwd, setPwd] = useState('123456');
    const intl = useIntl();
    const handleLogin = async () => {
        dispatch({
            type: 'user/login',
            payload: {
                account,
                password: pwd,
            },
        });
    };

    return (
        <div
            // bg="background"
            // p="30px"
            // sx={{ position: 'absolute', zIndex: 999 }}
            className="loginWrapper"
        >
            <div className="loginTitle">
                {intl.formatMessage({
                    id: 'sign_in',
                    defaultMessage: '登录',
                })}
            </div>
            <p>
                <input
                    type="text"
                    value={account}
                    onChange={e => setAccount(e.target.value)}
                />
            </p>
            <p>
                <input
                    type="text"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                />
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
