import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { Popover, Input, Badge } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import OrderMark from '@/components/OrderMark';

const App = ({ capsuleToOrderGroupList = [], dispatch, visible, onCancel, currentCapsule }) => {
    useEffect(() => {
        // toDoOrder
        dispatch({
            type: 'capsule/toDoOrder',
        });
    }, []);
    const handleSend = async orderData => {
        // const orderData = parseOrderData();
        const res = _.groupBy(orderData, 'isSelect');
        console.log('res', res);
        await dispatch({
            type: 'capsule/addOrder',
            payload: {
                orderData: res['false'] ? res['false'] : [],
                currentCapsule: currentCapsule._id,
            },
        });
        if (res['true']) {
            await dispatch({
                type: 'capsule/addOrder',
                payload: {
                    orderData: res['true'],
                    isSend: 1,
                    capsuleId: currentCapsule._id,
                },
            });
        }

        // setShowChange(false);
    };

    const handleSave = async orderData => {
        // const orderData = parseOrderData();
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
                onCancel={onCancel}
                onSave={handleSave}
                onSend={handleSend}
            />
        </>
    );
};

export default connect(({ capsule = {}, user = {} }) => ({
    currentUser: user.info,
    currentCapsule: capsule.currentCapsule,
    capsuleToOrderGroupList: capsule.capsuleToOrderGroupList,
}))(App);
