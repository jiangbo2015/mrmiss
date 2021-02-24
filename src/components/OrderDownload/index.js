import React, { useState, useEffect } from 'react';
import { Flex, Box } from 'rebass';
import { Spin } from 'antd';
import StyleItem from '@/components/StyleItem';

import _ from 'lodash';

import svg2pngFile from '@/utils/new.svg2pngFile';
import request from '@/utils/request';

const downloadUrl = process.env.DOWNLOAD_URL;

export default ({ orderData = [], _id, onClose }) => {
    const [isDownloading, setIsDownloading] = useState(true);
    const [styleSvgIdMap, setStyleSvgIdMap] = useState({});

    const uploadStyleImage = async (svgString, imgUrl) => {
        const { file, height } = await svg2pngFile(svgString, imgUrl);
        // /api/common/uploadkit
        const res = await request('/api/common/upload', { file }, 'post');
        return { url: res.url, height };
    };
    const getFileUrl = async query => {
        const res = await request('/api/order/postDownload', query, 'post');
        if (res) {
            window.open(`${downloadUrl}${res.url}`);
            setStyleSvgIdMap({});
            props.onClose();
        }
    };
    const handleDownload = async () => {
        let orderItemImages = {};
        for (let i = 0; i < stylesImageInfoList.length; i++) {
            const { fsId, shadowUrl } = stylesImageInfoList[i];
            let svgDom = document.getElementById(`${fsId}-front`);
            if (svgDom) {
                let svgString = document.getElementById(`${fsId}-front`).outerHTML;
                const res = await uploadStyleImage(svgString, shadowUrl);

                orderItemImages[fsId] = {
                    frontImageUrl: res.url,
                    frontHeight: res.height,
                };
            }
        }

        getFileUrl({
            _id: OrderDetail._id,
            rateSign: rate.sign,
            rateVal: rate.val,
            orderItemImages,
            file: '',
        });
    };

    useEffect(() => {
        // setTimeout(() => {
        //     handleDownload();
        // }, 1500);
    }, []);
    return (
        <Spin spinning={isDownloading} tip="订单文件生成中，请稍等....">
            <Flex
                flexDirection="column"
                justifyContent="space-between"
                sx={{
                    cursor: 'pointer',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        padding: '0 18px 18px 18px',
                        height: 'max-content',
                        width: '800px',
                        display: 'table',
                    }}
                ></Box>
            </Flex>
        </Spin>
    );
};
