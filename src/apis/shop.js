import request from '@/utils/request';

export const getBranchList = data =>
    request('/api/branch/getVisibleList', {
        method: 'get',
        params: data,
    });

export const getShopStyleList = data =>
    request('/api/shopStyle/getList', {
        method: 'get',
        params: data,
    });

export const addShopCart = data =>
    request('/api/shopCart/add', {
        method: 'post',
        data,
    });

export const updateShopCart = data =>
    request('/api/shopCart/update', {
        method: 'post',
        data,
    });

export const getMyShopCart = data =>
    request('/api/shopCart/getMyList', {
        method: 'get',
        params: data,
    });

export const addOrder = data =>
    request('/api/shopOrder/add', {
        method: 'post',
        data,
    });
