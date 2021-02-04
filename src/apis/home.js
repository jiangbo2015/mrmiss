import request from '@/utils/request';

export const getSystemDetail = data =>
    request('/api/system/detail', {
        method: 'get',
    });
