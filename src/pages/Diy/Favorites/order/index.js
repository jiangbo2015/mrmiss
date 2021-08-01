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
        let sumCount = 0;
        let sumPrice = 0;
        for (let i = 0; i < res['true'].length; i++) {
            const row = res['true'][i];
            for (let j = 0; j < row.items.length; j++) {
                const item = row.items[j];
                // console.log(item)
                if (!item.total) {
                    // console.log(row);
                    message.warn(`版型编号${row.styleNos}中有款式未填写数量`);
                    return;
                }
                item.type = 1
                
            }
            sumCount += row.rowTotal
            sumPrice += row.rowTotalPrice
        }

        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData: res['false'],
                goodsId: currentGood._id,
                successMsg: ''
            },
        });

        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData: res['true'],
                goodsId: currentGood._id,
                isSend: 1,
                sumCount,
                sumPrice,
                successMsg: '订单发送成功，您可以在我的定制订单中查看'
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
                successMsg: '保存成功'
            },
        });
        onCancel();
        // setShowChange(false);
    };

    const handleClose = async orderData => {
        // const orderData = parseOrderData();
        onCancel();
        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData,
                goodsId: currentGood._id,
                successMsg: ''
            },
        });
      
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

    // // console.log('favoriteToOrderGroupList', favoriteToOrderGroupList)
    return (      
        <OrderMark
            visible={visible}
            commodityToOrderGroupList={favoriteToOrderGroupList}
            onCancel={handleClose}
            onSave={handleSave}
            onSend={handleSend}
            onDelRow={handleDelRow}
        />
    );
};

export default connect(({ diy = {}, user = {} }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    currentGood: diy.currentGood,
    currentUser: user.info,
    favoriteToOrderGroupList: diy.favoriteToOrderGroupList,
}))(App);
