import request from '@/utils/request';

export const update = data =>
    request('/api/channel/update', {
        method: 'post',
        data,
    });

export const getMyAssignedChannel = data =>
    request('/api/channel/update', {
        method: 'post',
        data,
    });

export const getMyAdminChannel = params =>
    request('/api/channel/getMyAdminList', {
        method: 'get',
        params,
    });
