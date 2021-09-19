import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env.API_URL': 'http://8.209.64.159:3001',
        'process.env.DOWNLOAD_URL': 'http://8.209.64.159:3006',
        'process.env.VERSION': '1.1.14',
    },
});
