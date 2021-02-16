import request from '@/utils/request';

export const capsuleOrderRank = data =>
    request('/api/capsuleOrder/orderRank', {
        method: 'get',
        params: data,
    });

export const capsuleStyleRank = data =>
    request('/api/capsuleOrder/styleRank', {
        method: 'get',
        params: data,
    });

export const capsuleUserRank = data =>
    request('/api/capsuleOrder/userRank', {
        method: 'get',
        params: data,
    });

export const shopOrderRank = data =>
    request('/api/shopOrder/orderRank', {
        method: 'get',
        params: data,
    });

export const shopStyleRank = data =>
    request('/api/shopOrder/styleRank', {
        method: 'get',
        params: data,
    });

export const shopUserRank = data =>
    request('/api/shopOrder/userRank', {
        method: 'get',
        params: data,
    });
export const diyOrderRank = data =>
    request('/api/order/orderRank', {
        method: 'get',
        params: data,
    });

export const diyStyleRank = data =>
    request('/api/order/styleRank', {
        method: 'get',
        params: data,
    });

export const diyUserRank = data =>
    request('/api/order/userRank', {
        method: 'get',
        params: data,
    });
