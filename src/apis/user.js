import request from '@/utils/request';

export const login = data =>
    request('/api/user/login', {
        method: 'post',
        data,
    });
export const feedback = data =>
    request('/api/user/feedback', {
        method: 'post',
        data,
    });

export const getCurrentUser = data =>
    request('/api/user/getCurrentUser', {
        method: 'get',
    });

export const saveSetting = data =>
    request('/api/user/update', {
        method: 'post',
        data,
    });
export const update = data =>
    request('/api/user/update', {
        method: 'post',
        data,
    });

export const getCurrentUserOrder = data =>
    request('/api/user/getCurrentUserOrder', {
        method: 'get',
    });
