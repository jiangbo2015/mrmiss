import request from '@/utils/request';
import { connect } from 'dva';
import { useState } from 'react';
import './index.less';

const Login = ({ dispatch, history }) => {
    const [account, setAccount] = useState('xixi');
    const [pwd, setPwd] = useState('123456');

    const handleLogin = async () => {
        const { data } = await request('/user/login', {
            method: 'post',
            data: {
                account,
                password: pwd,
            },
        });
        // 登录成功，将token写入本地，并跳转到主体
        if (data && data.token) {
            localStorage.token = data.token;
            dispatch({
                type: 'user/setUserInfo',
                payload: data,
            });
            history.push('/main');
        }
    };

    return (
        <div className="loginWrapper">
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
            <button onClick={handleLogin}>提交</button>
        </div>
    );
};

export default connect(state => state)(Login);
