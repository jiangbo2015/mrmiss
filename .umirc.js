import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/Home', a: [] },
        { path: '/user', component: '@/pages/User' },
    ],
});
