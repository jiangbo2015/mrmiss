import React, { useState, useEffect } from 'react';
import { Box, Flex, Image } from 'rebass/styled-components';
import { Spin } from 'antd';
import StyleItem from '@/components/StyleItem/min-style-item-download';

import _ from 'lodash';

import svg2pngFile from '@/utils/new.svg2pngFile';
import request from '@/utils/request';

const downloadUrl = process.env.DOWNLOAD_URL;
// const ItemsPic = (items) => {
//     return <Flex>
//         {items.map(i => (

//         ))}
//     </Flex>
// }

export default ({ order, onGetDownloadUrlAndOpen }) => {
    const { orderData = [], _id } = order;
    const [isDownloading, setIsDownloading] = useState(true);
    const [styleSvgIdMap, setStyleSvgIdMap] = useState([]);
    const [styleSvgIdMapCount, setStyleSvgIdMapCount] = useState({});
    useEffect(() => {
        let tempStyleSvgIdMapCount = {};
        orderData.map(group => {
            group.items.map((item, index) => {
                if (item.type === 1) {
                    item.favorite.styleAndColor.map(x => {
                        if (!x.styleId) return;

                        x.colorIds.map((color, index) => {
                            if (color.type) {
                                let colorUrl = `${item.favorite._id}-${x.styleId}-${color.value}`;
                                if (!tempStyleSvgIdMapCount[colorUrl]) {
                                    tempStyleSvgIdMapCount[colorUrl] = 1;
                                } else {
                                    tempStyleSvgIdMapCount[colorUrl]++;
                                }
                            }
                        });
                    });
                }
            });
        });
        window.pngNum = 0;
        setStyleSvgIdMapCount(tempStyleSvgIdMapCount);
    }, [orderData]);
    const handlePngLoaded = ({ colorUrl }) => {
        // // console.log(window.pngNum++);
        setStyleSvgIdMap([...styleSvgIdMap, colorUrl]);
    };

    const uploadStyleImage = async (svgString, imgUrl) => {
        // // console.log('uploadStyleImage');
        const { file } = await svg2pngFile(svgString, imgUrl);
        // /api/common/uploadkit

        var postData = new FormData();
        postData.append('file', file);
        const res = await request('/api/common/uploadkit', {
            data: postData,
            method: 'post',
        });
        return { url: res.data.url };
    };
    // const getFileUrl = async query => {
    //     const res = await request('/api/capsuleOrder/postDownload', {
    //         data: query,
    //         method: 'post',
    //     });
    //     if (res) {
    //         window.open(`${downloadUrl}/${res.data.url}`);
    //         // setStyleSvgIdMap({});
    //         // props.onClose();
    //         setIsDownloading(false);
    //     }
    // };

    const handleDownload = async () => {
        let orderItemImages = [];
        // // console.log('handleDownload', orderData);
        for (let i = 0; i < orderData.length; i++) {
            // stylesImageInfoList
            // // console.log(`----${i}----`);
            let rowImages = [];
            const { items } = orderData[i];

            for (let j = 0; j < items.length; j++) {
                // // console.log(`----${i}----`, j);

                const item = items[j];
                let styleImgs = [];
                if (item.type === 0) {
                    styleImgs.push(item.imgs[0]);
                } else {
                    //diy款式生成,需合成图片
                    for (let k = 0; k < item.favorite.styleAndColor.length; k++) {
                        // // console.log(`----${i}----${j}`, k);
                        const x = item.favorite.styleAndColor[k];
                        let fsId = `${item.favorite._id}-${x.styleId._id}`;
                        let shadowUrl = x.styleId.shadowUrl;
                        let svgDom = document.getElementById(`${fsId}-front`);
                        if (svgDom) {
                            let svgString = document.getElementById(`${fsId}-front`).outerHTML;
                            // // console.log('svgString', svgString);
                            const res = await uploadStyleImage(svgString, shadowUrl);
                            styleImgs.push(res.url);
                        }
                    }
                }
                rowImages.push(styleImgs);
            }
            orderItemImages.push(rowImages);
        }
        onGetDownloadUrlAndOpen({ orderItemImages, _id });
    };

    useEffect(() => {
        if (window.pngNum >= Object.keys(styleSvgIdMapCount).length && isDownloading) {
            window.pngNum = -100;
            setTimeout(() => {
                handleDownload();
            }, 2000);
        }
    }, [styleSvgIdMap]);
    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 999,
                background: 'rgba(255,255,255,0.5)',
                overflow: 'hidden',
            }}
        >
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                bg="#fff"
                sx={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    zIndex: 99,
                }}
            >
                <Spin spinning={isDownloading} tip="订单文件生成中，请稍等...."></Spin>
            </Flex>
            <Box width={[1]}>
                {orderData.map(od => (
                    <Flex width="100%" justifyContent="space-evenly">
                        {od.items
                            .filter(x => x.type !== 0)
                            .map((item, index) => (
                                <StyleItem
                                    onPngLoaded={handlePngLoaded}
                                    rowspan={2}
                                    hasBorder={'1px solid'}
                                    margin={'1px'}
                                    key={`${index}-style-img`}
                                    favoriteId={item.favorite._id}
                                    styleList={item.favorite.styleAndColor.map(x => {
                                        // styleList.push({ style: x.style, colors: x.colorIds })
                                        return { style: x.styleId, colors: x.colorIds };
                                    })}
                                    index={index}
                                    tool={false}
                                />
                            ))}
                    </Flex>
                ))}
            </Box>
        </Flex>
    );
};
