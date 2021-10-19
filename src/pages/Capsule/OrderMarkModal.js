import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { Popover, Input, Badge } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import OrderMark from '@/components/OrderMark';

const App = ({ capsuleToOrderGroupList = [], dispatch, visible, onCancel, currentCapsule, loading }) => {
    useEffect(() => {
        // toDoOrder
        dispatch({
            type: 'capsule/toDoOrder',
        });

        dispatch({
            type: 'capsule/setSelectCapsuleList',
            payload: [],
        });
    }, []);
    const handleSend = async orderData => {
        // const orderData = parseOrderData();
        const res = _.groupBy(orderData, 'isSelect');
        // console.log('res', res);
        await dispatch({
            type: 'capsule/addOrder',
            payload: {
                orderData: res['false'] ? res['false'] : [],
                currentCapsule: currentCapsule._id,
            },
        });
        if (res['true']) {
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
                type: 'capsule/addOrder',
                payload: {
                    orderData: res['true'],
                    isSend: 1,
                    sumCount,
                    sumPrice,
                    capsuleId: currentCapsule._id,
                    successMsg: '发送成功',
                },
            });
        }
        onCancel();

        // setShowChange(false);
    };

    const handleSave = async orderData => {
        // const orderData = parseOrderData();
        await dispatch({
            type: 'capsule/addOrder',
            payload: {
                orderData,
                capsuleId: currentCapsule._id,
                successMsg: '保存成功',
            },
        });
        onCancel();
        // setShowChange(false);
    };

    const handleClose = async orderData => {
        // const orderData = parseOrderData();
        onCancel();
        await dispatch({
            type: 'capsule/addOrder',
            payload: {
                orderData,
                capsuleId: currentCapsule._id,
            },
        });

        // setShowChange(false);
    };
    return (
        <>
            <OrderMark
                visible={visible}
                commodityToOrderGroupList={capsuleToOrderGroupList}
                onCancel={handleClose}
                onSave={handleSave}
                onSend={handleSend}
                loading={loading}
            />
        </>
    );
};

export default connect(({ capsule = {}, user = {}, loading }) => ({
    currentUser: user.info,
    currentCapsule: capsule.currentCapsule,
    capsuleToOrderGroupList: capsule.capsuleToOrderGroupList,
    loading: loading.effects['capsule/toDoOrder'],
}))(App);
