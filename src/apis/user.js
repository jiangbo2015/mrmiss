import request from '@/utils/request';

export const login = data =>
    request('/user/login', {
        method: 'post',
        data,
    });
