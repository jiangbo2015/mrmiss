import request from '@/utils/request';

export const getCapsuleList = data =>
    request('/api/capsule/getVisibleList', {
        method: 'get',
        params: data,
    });

export const getCapsuleStyleList = data =>
    request('/api/capsuleStyle/getList', {
        method: 'get',
        params: data,
    });

export const getMyOrderList = data =>
    request('/api/capsuleOrder/getMyList', {
        method: 'get',
        params: data,
    });

export const addOrder = data =>
    request('/api/capsuleOrder/add', {
        method: 'post',
        data,
    });
export const updateOrder = data =>
    request('/api/capsuleOrder/update', {
        method: 'post',
        data,
    });
