import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env.API_URL': 'test 环境api url',
    },
});
