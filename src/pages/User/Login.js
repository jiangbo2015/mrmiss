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
        <Box bg="background" p="30px">
            <input
                type="text"
                value={account}
                onChange={e => setAccount(e.target.value)}
            />
            <input
                type="text"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
            />
            <Button variant="primary" onClick={handleLogin}>
                提交abc
            </Button>
        </Box>
    );
};

export default connect(state => state)(Login);
