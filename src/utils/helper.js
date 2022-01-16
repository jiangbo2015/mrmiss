// import { parse } from "querystring";
export const baseUrl = window.location.hostname === 'we-idesign.com' ? process.env.API_URL + '/' : 'http://8.209.64.159:3007/';
// export const baseUrl = 'http://we-idesign.com/';

export const imgUrl = 'https://ik.imagekit.io/';

export const filterImageUrl = url => {
    if (!url || !url.split) {
        return '';
    }
    let arrs = url.split('/');
    // 本地数据
    if (arrs.length >= 3) {
        if (url.indexOf('.svg') >= 0) {
            // // console.log("svg-url", `/${url}`);

            return `${baseUrl}${url}`;
        } else {
            return `${imgUrl}mrmiss//${arrs[2]}`;
        }
    } else {
        return `${imgUrl}${url}`;
    }
};
