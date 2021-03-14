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
export const getMyOrderList = data =>
    request('/api/order/getMyList', {
        method: 'get',
        params: data,
    });

export const delOrder = data =>
    request('/api/order/delete', {
        method: 'post',
        data,
    });
export const changePwd = data =>
    request('/api/user/changePwd', {
        method: 'post',
        data,
    });
export const getUserShopOrderList = data =>
    request('/api/shopOrder/getMyList', {
        method: 'get',
    });
export const getUserCapsuleOrderList = data =>
    request('/api/capsuleOrder/getMyList', {
        method: 'get',
        params: data,
    });
export const delCapsuleOrder = data =>
    request('/api/capsuleOrder/delete', {
        method: 'post',
        data,
    });
export const delShopOrder = data =>
    request('/api/shopOrder/delete', {
        method: 'post',
        data,
    });

export const downloadOrder = data =>
    request('/api/order/postDownload', {
        method: 'post',
        data,
    });
