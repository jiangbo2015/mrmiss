import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { message } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import OrderMark from '@/components/OrderMark';

const App = ({ editOrderGroupList, dispatch, currentOrder = {}, visible, onCancel }) => {

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
                for (let j = 0; j < row.items.length; j++) {
                    const item = row.items[j];
                    // console.log(item)
                    if (!item.total) {
                        // console.log(row);
                        message.warn(`版型编号${row.styleNos}中有款式未填写数量`);
                        return;
                    }
                    
                }
                sumCount += row.rowTotal
                sumPrice += row.rowTotalPrice
            }
            
            if(currentOrder.orderType === 'order'){
                await dispatch({
                    type: 'diy/updateOrder',
                    payload: {
                        _id,
                        orderData,
                        sumCount,
                        sumPrice
                    },
                });
            }
    
            if(currentOrder.orderType === 'capsule'){
                await dispatch({
                    type: 'capsule/updateOrder',
                    payload: {
                        _id,
                        orderData,
                        sumCount,
                        sumPrice
                    },
                });
            }
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
                commodityToOrderGroupList={editOrderGroupList}
                onCancel={onCancel}
                onSave={handleSave}
                onDelRow={handleDelRow}
            />
        </>
    );
};

export default connect(({ business = {}, user = {} }) => ({
    currentUser: user.info,
    editOrderGroupList: business.editOrderGroupList,
    currentOrder: business.currentOrder
}))(App);
