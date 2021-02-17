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

export const saveSetting = data =>
    request('/api/user/update', {
        method: 'post',
        data,
    });

export const getCurrentUserOrder = data =>
    request('/api/user/getCurrentUserOrder', {
        method: 'get',
    });

export const addUser = data =>
    request('/api/user/add', {
        method: 'post',
        data,
    });

export const getCustomerUser = data =>
    request('/api/user/getOwnList', {
        method: 'get',
        params: data,
    });

export const delOwnUser = data =>
    request('/api/user/delOwnUser', {
        method: 'post',
        data,
    });

export const getOwnOrderList = data =>
    request('/api/user/getOwnOrderList', {
        method: 'get',
        params: data,
    });

export const delOwnOrder = data =>
    request('/api/user/delOwnOrder', {
        method: 'post',
        data,
    });
