import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env.API_URL': 'prod 环境api url',
        'process.env.DOWNLOAD_URL': 'https://crm.we-idesign.com',
    },
});
