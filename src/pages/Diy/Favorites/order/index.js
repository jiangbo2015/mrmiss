import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { message } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import OrderMark from '@/components/OrderMark';

const App = ({ favoriteToOrderGroupList, dispatch, currentGood = {}, visible, onCancel }) => {
    const handleSend = async orderData => {
        // const orderData = parseOrderData();
        const res = _.groupBy(orderData, 'isSelect');

        if (!res['true'] || res['true'].length < 1) {
            message.warn('请选择要发送的中包');
            return;
        }
        for (let i = 0; i < res['true'].length; i++) {
            for (let j = 0; j < res['true'].length; j++) {
                const row = res['true'][i];
                const item = res['true'][i].items[j];
                if (!item.total) {
                    console.log(row);
                    message.warn(`版型编号${row.styleNos}中有款式未填写数量`);
                    return;
                }
            }
        }

        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData: res['false'],
                goodsId: currentGood._id,
            },
        });

        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData: res['true'],
                goodsId: currentGood._id,
                isSend: 1,
            },
        });
        onCancel();
        // setShowChange(false);
    };

    const handleSave = async orderData => {
        // const orderData = parseOrderData();
        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData,
                goodsId: currentGood._id,
            },
        });
        onCancel();
        // setShowChange(false);
    };

    const handleDelRow = ind => {
        // const orderData = parseOrderData();
        dispatch({
            type: 'diy/delOrderRow',
            payload: ind,
        });
        // setShowChange(false);
    };

    return (
        <>
            <OrderMark
                visible={visible}
                commodityToOrderGroupList={favoriteToOrderGroupList}
                onCancel={onCancel}
                onSave={handleSave}
                onSend={handleSend}
                onDelRow={handleDelRow}
            />
        </>
    );
};

export default connect(({ diy = {}, user = {} }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    currentGood: diy.currentGood,
    currentUser: user.info,
    favoriteToOrderGroupList: diy.favoriteToOrderGroupList,
}))(App);
