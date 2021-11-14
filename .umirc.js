import { defineConfig } from 'umi';
// console.log(umi);
// const { defineConfig } = umi;
export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    dynamicImport: {},
    history: {
        type: 'hash',
    },
    define: {
        // 'process.env.API_URL': 'http://8.209.64.159:3001',
        // 'process.env.API_URL': 'https://we-idesign.com',
        'process.env.VERSION': '1.2.0',
        'process.env.API_URL': 'http://localhost:3001',
        // 'process.env.DOWNLOAD_URL': 'http://localhost:3001',
        'process.env.DOWNLOAD_URL': 'http://8.209.64.159:3001',
    },
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:3001',
    //         changeOrigin: true,
    //     },
    // },
    theme: {
        'primary-color': '#191b1d',
        'table-selected-row-bg': '#F3F3D3',
    },

    locale: {}, // 开启多言语
    /**
     * 权限部分说明
     * 不设置authority，表示没有限制
     * 设置['admin', 'manager']表示这两种类型用户可见
     * wrappers里面auth组件用于权限判断
     */
    routes: [
        { path: '/', component: '@/pages/Home' },
        { path: '/capsule', component: '@/pages/Capsule' },
        { path: '/shop', component: '@/pages/Shop' },
        { path: '/diy', component: '@/pages/Diy' },
        { path: '/chart', component: '@/pages/Chart' },
        { path: '/contactus', component: '@/pages/ContactUs' },

        {
            path: '/main',
            component: '@/pages/Main',
            wrappers: ['@/wrappers/auth'],
            authority: ['admin', 'manager', 'user'],
        },
        {
            path: '/business',
            component: '@/pages/Business',
        },
        {
            path: '/usercenter',
            component: '@/pages/UserCenter',
        },
        {
            path: '/demo',
            component: '@/pages/Main',
        },
    ],
});
