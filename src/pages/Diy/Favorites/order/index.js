import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { Popover, Input, Badge } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import OrderMark from '@/components/OrderMark';

const App = ({ favoriteToOrderGroupList, dispatch, currentGood = {}, visible, onCancel }) => {
    const handleSend = async orderData => {
        // const orderData = parseOrderData();
        const res = _.groupBy(orderData, 'isSelect');

        // console.log('res', res);
        // return;
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
