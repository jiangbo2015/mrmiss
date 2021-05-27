import React from 'react';
import ColorSelector from './ColorSelector';
import FlowerSelector from './FlowerSelector';
import StyleDIYCenter from './StyleDIYCenter/index';
import { ReactSVG } from 'react-svg';
import { message } from 'antd';

import IconUnHeart from '@/public/icons/icon-unheart.svg';
import IconConfirm from '@/public/icons/icon-confirm.svg';
import { connect } from 'dva';
const App = ({
    dispatch,
    currentGood,
    currentGoodCategory,
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
    currentGoodCategoryMultiple = '',
}) => {
    // console.log('currentGoodCategoryMultiple',currentGoodCategoryMultiple)
    const handleAddFavorite = async () => {
        let goodCategory = currentGood.category.find(x => x._id === currentGoodCategory);
        let goodCategoryMultiple = currentGood.category.find(x => x._id === currentGoodCategoryMultiple);

        if (collocationPattern === 'single' || collocationPattern === 'expand') {
            let payload = {
                goodId: currentGood._id,
                goodCategory,
                styleAndColor: [],
            };
            if (currentStyle._id) {
                payload.styleAndColor.push({
                    styleId: currentStyle._id,
                    colorIds: singleSelectColorList.map(x => x._id),
                });
            }
            if (currentStyle1._id) {
                payload.styleAndColor.push({
                    styleId: currentStyle1._id,
                    colorIds: singleSelectColorList1.map(x => x._id),
                });
            }
            await dispatch({
                type: 'diy/addFavorite',
                payload,
            });
            message.info('收藏成功');
        } else if (collocationPattern === 'multiple') {
            if (selectStyleList.length === 0) {
                message.info('请选择');
                return;
            }

            const colorIds = selectColorList.map(x => x._id);
            const favorites = selectStyleList.map(x => ({
                user: currentUser._id,
                goodId: currentGood._id,
                goodCategory: goodCategoryMultiple,
                styleAndColor: [
                    {
                        styleId: x._id,
                        colorIds: [colorIds[0], colorIds[0], colorIds[0], colorIds[0], colorIds[0], colorIds[0]],
                    },
                ],
            }));
            await dispatch({
                type: 'diy/addFavorites',
                payload: favorites,
            });
        } else if (collocationPattern === 'edit') {
            let payload = {
                _id: favoriteEditObj._id,
                goodId: currentGood._id,
                goodCategory,
                styleAndColor: [],
            };
            if (favoriteEditObj._id) {
                payload.styleAndColor = favoriteEditObj.styleAndColor.map(x => ({
                    styleId: x.style._id,
                    colorIds: x.colorIds.map(x => x._id),
                }));

                await dispatch({
                    type: 'diy/updateFavorite',
                    payload,
                });
                message.info('修改成功');
            }

            // updateFavorite
        }
    };

    const handleAssigned = async () => {
        if (collocationPattern === 'assign') {
            const styles = selectStyleList.map(x => ({ style: x._id, price: x.price }));
            console.log('styles', styles);
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
                                handleAddFavorite();
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
        </div>
    );
};

export default connect(({ diy = {}, channel, user }) => ({
    collocationPattern: diy.collocationPattern,
    currentGoodCategory: diy.currentGoodCategory,
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
}))(App);
