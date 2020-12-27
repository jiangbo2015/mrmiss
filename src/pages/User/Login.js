import { connect } from 'dva';
import { useState } from 'react';
import { Box, Button } from 'rebass/styled-components';
import './index.less';

const Login = ({ dispatch }) => {
    const [account, setAccount] = useState('xixi');
    const [pwd, setPwd] = useState('123456');

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
            <div className="loginTitle">Sign in</div>
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
                登录
            </Button>
        </div>
    );
};

export default connect(state => state)(Login);
