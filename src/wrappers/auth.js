import Loading from '@/components/Loading';
import request from '@/utils/request';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { Redirect } from 'umi';

/**
 * 自定义获取用户信息hook
 */
function useUserInfo() {
    const [info, setInfo] = useState('loading');
    useEffect(() => {
        const getUser = async () => {
            try {
                const { data } = await request.get('/api/user/getCurrentUser');
                if (data) {
                    setInfo(data);
                }
            } catch (e) {
                // // console.log(e, 'catch');
                setInfo(null);
            }
        };
        getUser();
    }, []);
    return [info, setInfo];
}

const Wrapper = props => {
    const [info] = useUserInfo();
    // // console.log(info, 'info');
    /**
     * 1，默认状态为loading，接口拿到数据后判断
     */
    if (info === 'loading') {
        return <Loading></Loading>;
    }

    /**
     * 2，非loading，且没有用户信息，重定向到首页
     */
    if (!info) {
        return <Redirect to="/" />;
    }

    /**
     * 3，获取到信息后，判断当前路由是否需要鉴权，即是否有authority
     * 根据获取到的用户信息和authority做映射匹配
     */
    props.dispatch({
        type: 'user/setUserInfo',
        payload: info,
    });
    const { authority } = props.route;
    const AuthMap = {
        1: 'admin',
        2: 'manage',
        3: 'user',
    };
    // 需要鉴权，但是当前用户权限不在列表，返回首页
    if (authority && !authority.includes(AuthMap[info.role])) {
        return <Redirect to="/" />;
    }
    // 否则显示对应页面
    return props.children;
};

export default connect()(Wrapper);
