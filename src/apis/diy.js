import request from '@/utils/request';

export const update = data =>
    request('/api/user/update', {
        method: 'post',
        data,
    });

export const getVisibleList = data =>
    request('/api/goods/getVisibleList', {
        method: 'get',
    });

export const getUserStyleList = data =>
    request('/api/style/getUserStyleList', {
        method: 'get',
        params: data,
    });

export const getColorList = data =>
    request('/api/color/getList', {
        method: 'get',
        params: data,
    });

export const getFavoriteList = data =>
    request('/api/user/getFavoriteList', {
        method: 'get',
        params: data,
    });

export const getMyOrderList = data =>
    request('/api/order/getMyList', {
        method: 'get',
        params: data,
    });

export const getOrderList = data =>
    request('/api/order/getList', {
        method: 'get',
        params: data,
    });

export const addFavorite = data =>
    request('/api/user/addFavorite', {
        method: 'post',
        data,
    });
export const addFavorites = data =>
    request('/api/user/addFavorites', {
        method: 'post',
        data,
    });
export const updateFavorite = data =>
    request('/api/user/updateFavorite', {
        method: 'post',
        data,
    });

export const deleteFavorite = data =>
    request('/api/user/deleteFavorite', {
        method: 'post',
        data,
    });

export const addOrder = data =>
    request('/api/order/add', {
        method: 'post',
        data,
    });
export const updateOrder = data =>
    request('/api/order/update', {
        method: 'post',
        data,
    });

export const addCapsule = data =>
    request('/api/capsule/add', {
        method: 'post',
        data,
    });

export const addCapsuleStyle = data =>
    request('/api/capsuleStyle/add', {
        method: 'post',
        data,
    });
