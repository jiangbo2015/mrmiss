import { defineConfig } from 'umi';

export default defineConfig({
    define: {
        'process.env.API_URL': 'https://we-idesign.com',
        'process.env.DOWNLOAD_URL': 'https://crm.we-idesign.com',
        'process.env.VERSION': '1.1.14',
    },
});
