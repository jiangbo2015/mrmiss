import request from '@/utils/request';

export const login = data =>
    request('/api/user/login', {
        method: 'post',
        data,
    });

export const getCurrentUser = data =>
    request('/api/user/getCurrentUser', {
        method: 'get',
    });
