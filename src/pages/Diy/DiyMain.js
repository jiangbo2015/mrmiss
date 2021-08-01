import React,{useState, useEffect} from 'react';
import ColorSelector from './ColorSelector';
import StyleImgDownload from '@/components/StyleItem/style-img-download';
import FlowerSelector from './FlowerSelector';
import StyleDIYCenter from './StyleDIYCenter/index';
import { ReactSVG } from 'react-svg';
import { message } from 'antd';
import { Box, Flex, Image } from 'rebass/styled-components';

import IconUnHeart from '@/public/icons/icon-unheart.svg';
import IconConfirm from '@/public/icons/icon-confirm.svg';
import { connect } from 'dva';

import svg2pngFile from '@/utils/new.svg2pngFile';
import request from '@/utils/request';
let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const App = ({
    dispatch,
    currentGood,
    currentGoodCategory,
    currentGoodCategoryMultiple,
    currentStyle,
    currentStyle1,
    selectStyleList,
    selectColorList,
    collocationPattern,
    currentAdminChannel,
    currentUser,
    favoriteEditObj,
    singleSelectColorList,
    singleSelectColorList1,
    styleList
}) => {

    const [favoriteStyleList, setFavoriteStyleList] = useState([])
    const [styleColorUrls, setStyleColorUrls] = useState([])
    
    // const onPngLoaded = ({ colorUrl }) => {
    //     window.favoriteLoadedNums++
    //     setStyleColorUrls([...styleColorUrls, colorUrl])
    // }


    const uploadStyleImage = async (svgString, imgUrl) => {
        console.log('uploadStyleImage');
        const { file } = await svg2pngFile(svgString, imgUrl);
        console.log('file');
        // /api/common/uploadkit

        var postData = new FormData();
        postData.append('file', file);
        const res = await request('/api/common/uploadkit', {
            data: postData,
            method: 'post',
        });
        console.log('res', res);
        return { url: res.data.url };
    };
    // // console.log('currentGoodCategoryMultiple',currentGoodCategoryMultiple)
    const handleAddFavorite = async () => {
        window.favoriteLoadedNums = 0

        console.log('currentGoodCategory', currentGoodCategory)
        console.log('currentGoodCategoryMultiple', currentGoodCategoryMultiple)
        // let goodCategory = currentGood.category.find(x => x._id === currentGoodCategory);
        let goodCategoryMultiple = currentGood.category.find(x => x._id === currentGoodCategoryMultiple);

        if (collocationPattern === 'single' || collocationPattern === 'expand') {
            let payload = {
                goodId: currentGood._id,
                goodCategory: goodCategoryMultiple,
                styleAndColor: [],
            };
            if (currentStyle._id) {
                payload.styleAndColor.push({
                    styleId: currentStyle._id,
                    style: currentStyle,
                    colorIds: singleSelectColorList.map(x => x._id),
                    colors: singleSelectColorList,
                });
                console.log('addFavorite', currentStyle)
            }
            if (currentStyle1._id) {
                payload.styleAndColor.push({
                    styleId: currentStyle1._id,
                    style: currentStyle1,
                    colorIds: singleSelectColorList1.map(x => x._id),
                    colors: singleSelectColorList1,
                });
            }
            const hide = message.loading('收藏中，请稍等...', 0);
            setFavoriteStyleList([payload.styleAndColor])
            await wait(3000)
            for(let i=0;i<payload.styleAndColor.length; i++){
                let item = payload.styleAndColor[i]
                let svgId = `${item.styleId}-diy-front`
                let svgDom = document.getElementById(svgId);
                console.log('svgDom', svgDom)
                if (svgDom) {
                    let svgString = document.getElementById(svgId).outerHTML;
                    // // console.log('svgString', svgString);
                    const res = await uploadStyleImage(svgString, item.style.shadowUrl);
                    item.favoriteImgUrl = res.url
                    console.log(res.url)
                }
            }
            await dispatch({
                type: 'diy/addFavorite',
                payload,
            });
            hide()
            message.info('收藏成功');
            
        } else if (collocationPattern === 'multiple') {
            if (selectStyleList.length === 0) {
                message.info('请选择');
                return;
            }

            const colorIds = selectColorList.map(x => x._id);
            const docs = styleList[currentGoodCategoryMultiple]
            const selectedStyle = docs.filter(x => x.isSelected)
            console.log('selectedStyle')
            const favorites = selectedStyle.map(x => ({
                user: currentUser._id,
                goodId: currentGood._id,
                goodCategory: goodCategoryMultiple,
                styleAndColor: [
                    {
                        styleId: x._id,
                        style: x,
                        colorIds: [colorIds[0], colorIds[0], colorIds[0], colorIds[0], colorIds[0], colorIds[0]],
                        colors: [selectColorList[0],selectColorList[0],selectColorList[0],selectColorList[0],selectColorList[0],selectColorList[0]],
                    },
                ],
            }));
            
            const hide = message.loading('收藏中，请稍等...', 0);
            setFavoriteStyleList(favorites.map(x => x.styleAndColor))
            await wait(3000)
            for(let j=0;j<favorites.length;j++){
                let favorite = favorites[j]
                for(let i=0;i<favorite.styleAndColor.length; i++){
                    let item = favorite.styleAndColor[i]
                    let svgId = `${item.styleId}-diy-front`
                    let svgDom = document.getElementById(svgId);
                    console.log('svgDom', svgDom)
                    if (svgDom) {
                        let svgString = document.getElementById(svgId).outerHTML;
                        // // console.log('svgString', svgString);
                        const res = await uploadStyleImage(svgString, item.style.shadowUrl);
                        item.favoriteImgUrl = res.url
                        console.log(res.url)
                    }
                }

            }

            await dispatch({
                type: 'diy/addFavorites',
                payload: favorites,
            });
            hide()
        } else if (collocationPattern === 'edit') {
            let payload = {
                _id: favoriteEditObj._id,
                goodId: currentGood._id,
                goodCategory: goodCategoryMultiple,
                styleAndColor: [],
            }
            // | favoriteStyleList | favoriteStyleList
            if (favoriteEditObj._id) { 
                payload.styleAndColor = favoriteEditObj.styleAndColor.map(x => ({
                    style: x.style,
                    styleId: x.style._id,
                    colorIds: x.colorIds.map(x => x._id),
                    colors: x.colorIds,
                }));
                const hide = message.loading('收藏修改中，请稍等...', 0);
                setFavoriteStyleList([payload.styleAndColor])
                await wait(3000)
                for(let i=0;i<payload.styleAndColor.length; i++){
                    let item = payload.styleAndColor[i]
                    let svgId = `${item.styleId}-diy-front`
                    let svgDom = document.getElementById(svgId);
                    console.log('svgDom', svgDom)
                    if (svgDom) {
                        let svgString = document.getElementById(svgId).outerHTML;
                        // // console.log('svgString', svgString);
                        const res = await uploadStyleImage(svgString, item.style.shadowUrl);
                        item.favoriteImgUrl = res.url
                        console.log(res.url)
                    }
                }
                await dispatch({
                    type: 'diy/updateFavorite',
                    payload,
                });
                hide()
                message.info('修改成功');
            }

            // updateFavorite
        }
    };

    const handleAssigned = async () => {
        if (collocationPattern === 'assign') {
            const styles = selectStyleList.map(x => ({ style: x.style, price: x.price }));
            // console.log('styles', styles);
            await dispatch({
                type: 'channel/update',
                payload: {
                    assignedId: currentGood._id,
                    codename: currentAdminChannel.codename,
                    styles,
                    plainColors: selectColorList.filter(x => x.type === 0).map(x => x._id),
                    flowerColors: selectColorList.filter(x => x.type === 1).map(x => x._id),
                },
            });
        }
    };
    return (
        <div style={{ width: '100%', padding: '0 2.1%', background: '#323232' }}>
            <div
                style={{
                    width: '100%',
                    background: '#323232',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <ColorSelector />
                <StyleDIYCenter />
                <FlowerSelector />
            </div>
            <div
                style={{
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '28px',
                        borderRadius: '14px',
                        background: '#1C1C1C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {collocationPattern === 'assign' ? (
                        <ReactSVG
                            src={IconConfirm}
                            onClick={() => {
                                handleAssigned();
                            }}
                            style={{
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }}
                        />
                    ) : collocationPattern === 'bigPicColor' ? null : (
                        <ReactSVG
                            src={IconUnHeart}
                            onClick={() => {
                                handleAddFavorite()
                            }}
                            style={{
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                            }}
                        />
                    )}
                </div>
            </div>

            {/* const { styleList, favoriteId, margin, width, onPngLoaded } = this.props; */}
        {/* return ( */}
        <div style={{
            display: 'none'
        }}>
        {favoriteStyleList.map(styleList => {
            return (
            <Flex
                flexDirection="column"
                // alignItems="center"
                justifyContent="space-evenly"
                margin={'auto'}
                // width={width ? width : "150px"}
            >
                {Array.isArray(styleList) &&
                    styleList.map((style, index) => {
                        const { styleBackSize = 27, styleSize = 27, scale = 58 } = style.style;
                        return (
                            <Box p="13px">
                                <StyleImgDownload
                                    marginTemp="0.04rem"
                                    key={`style-img-${index}`}
                                    width={`${styleSize * 20}px`}
                                    backWidth={`${styleBackSize * 2}px`}
                                    onPngLoaded={()=>{}}
                                    vposition={style.style.vposition}
                                    styleSize={style.style.styleSize}
                                    styleBackSize={style.style.styleBackSize}
                                    svgUrl={style.style.svgUrl}
                                    svgUrlBack={style.style.svgUrlBack}
                                    shadowUrlBack={style.style.shadowUrlBack}
                                    id={style.style._id}
                                    styleId={style.style._id}
                                    shadowUrl={style.style.shadowUrl}
                                    imgValsAttrs={style.style.attrs}
                                    colors={style.colors}
                                    svgId={`${style.style._id}-diy-front`}
                                />
                            </Box>
                        );
                    })}
            </Flex>
        
            )

        })}
        </div>

            );
        </div>
    );
};

export default connect(({ diy = {}, channel, user }) => ({
    collocationPattern: diy.collocationPattern,
    currentGoodCategory: diy.currentGoodCategory,
    currentGoodCategoryMultiple: diy.currentGoodCategoryMultiple,
    currentGood: diy.currentGood,
    currentStyle: diy.currentStyle,
    currentStyle1: diy.currentStyle1,
    selectColorList: diy.selectColorList,
    selectStyleList: diy.selectStyleList,
    favoriteEditObj: diy.favoriteEditObj,
    currentAdminChannel: channel.currentAdminChannel,
    currentUser: user.info,
    singleSelectColorList: diy.singleSelectColorList,
    singleSelectColorList1: diy.singleSelectColorList1,
    styleList: diy.styleList,
}))(App);
