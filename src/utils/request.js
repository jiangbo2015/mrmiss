/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';

/**
 * 配置request请求时的默认参数
 */

const request = extend({
    // errorHandler,
    prefix: window.location.hostname === 'we-idesign.com' ? process.env.API_URL : 'http://8.209.64.159:3002',
    // 默认错误处理
    // credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use(async (url, options) => {
    const { token } = localStorage;
    options.headers.Authorization = `Bearer ${token}`;
    return {
        url,
        options,
    };
});

request.use(async (ctx, next) => {
    await next();

    const { res } = ctx;
    const { success = false, message } = res; // 假设返回结果为 : { success: false, errorCode: 'B001' }
    if (!success) {
        console.error({
            description: message || '操作失败',
            message: '提示',
        });
    }
});

export default request;
