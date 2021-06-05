import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { message } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import OrderMark from '@/components/OrderMark/shop';

const App = ({ currentShopOrderData, dispatch, currentOrder = {}, visible, onCancel }) => {
    const handleUpdate = async data => {
        // const orderData = parseOrderData();
        dispatch({
            type: 'business/updateShopOrderData',
            payload: data,
        });
        // setShowChange(false);
    };


    const handleSave = async orderDatas => {
        // const orderData = parseOrderData();
        // currentOrder
        // console.log('orderDatas', orderDatas)
        const orderListMap = lodash.groupBy(orderDatas, 'originId')
        // // console.log('orderDatas',orderDatas)
        // console.log('orderListMap',orderListMap)
        const orderListKeys = Object.keys(orderListMap)
        // return;
        for(let i = 0; i< orderListKeys.length; i++) {
            const _id = orderListKeys[i]
            const orderData = orderListMap[_id]

            let sumCount = 0;
            let sumPrice = 0;

            for (let i = 0; i < orderData.length; i++) {
                const row = orderData[i];
                let shopcount = currentOrder.user.role === 1 ? row.shopStyleObj.caseNum :  row.shopStyleObj.numInBag
                shopcount *= row.count
                sumCount += shopcount
                sumPrice += shopcount*row.shopStyleObj.price
            }
            
            await dispatch({
                    type: 'shop/updateOrder',
                    payload: {
                        _id,
                        orderData,
                        sumCount,
                        sumPrice
                    },
                });
        }

        
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
                currentShopOrderData={currentShopOrderData}
                currentUser={currentOrder.user}
                currentOrder={currentOrder}
                onCancel={onCancel}
                onSave={handleSave}
                onUpdate={handleUpdate}
                onDelRow={handleDelRow}
                readOnly={currentOrder.isMerge}
            />
        </>
    );
};

export default connect(({ business = {}, user = {} }) => ({
    currentShopOrderData: business.currentShopOrderData,
    currentOrder:business.currentOrder
}))(App);
