import React from 'react';
import ColorSelector from './ColorSelector';
import FlowerSelector from './FlowerSelector';
import StyleDIYCenter from './StyleDIYCenter/index';
import { ReactSVG } from 'react-svg';
import { message } from 'antd';

import IconUnHeart from '@/public/icons/icon-unheart.svg';
import IconConfirm from '@/public/icons/icon-confirm.svg';
import { connect } from 'dva';
const App = ({ dispatch, currentGood, currentStyle, selectStyleList, selectColorList, collocationPattern }) => {
    const handleAddFavorite = async () => {
        if (collocationPattern === 'single') {
            await dispatch({
                type: 'diy/addFavorite',
                payload: {
                    goodId: currentGood._id,
                    styleAndColor: [
                        {
                            styleId: currentStyle._id,
                            colorIds: selectColorList.map(x => x._id),
                        },
                    ],
                },
            });
            message.info('收藏成功');
        }
    };

    const handleAssigned = async () => {
        if (collocationPattern === 'assign') {
            await dispatch({
                type: 'channel/update',
                payload: {
                    assignedId: currentGood._id,
                    codename: currentAdminChannel.codename,
                    styles: selectStyleList.map(x => {}),
                },
            });
            message.info('收藏成功');
        }
    };
    return (
        <div style={{ padding: '0 35px', width: '100%', background: '#323232' }}>
            <div
                style={{
                    width: 'cacl(100% - 70px)',
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
                    height: '60px',
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
                    ) : (
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default connect(({ diy = {}, channel }) => ({
    collocationPattern: diy.collocationPattern,
    currentGood: diy.currentGood,
    currentStyle: diy.currentStyle,
    selectColorList: diy.selectColorList,
    selectStyleList: diy.selectStyleList,
    currentAdminChannel: channel.currentAdminChannel,
}))(App);
