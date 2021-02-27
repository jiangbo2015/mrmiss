import React, { useEffect } from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { ReactSVG } from 'react-svg';
import OrderTableComponent from './OrderTableComponent';
import IconDownload from '@/public/icons/icon-download.svg';
import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';

import lodash from 'lodash';
const OrderTable = ({ orderList = [], dispatch, onDownloadOrder }) => {
    useEffect(() => {
        dispatch({
            type: 'usercenter/fetchMyDiyOrder',
        });
    }, []);
    const handleDel = _id => {
        dispatch({
            type: 'usercenter/delMyDiyOrder',
            payload: { _id },
        });
    };
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '总数量',
            dataIndex: 'totalCount',
            key: 'totalCount',
            render: (_, record) => <Box>{lodash.sumBy(record.orderData, 'rowTotal')}</Box>,
        },
        {
            title: '总金额',
            dataIndex: 'totalPrice',
            render: (_, record) => <Box>{lodash.sumBy(record.orderData, 'rowTotalPrice')}</Box>,
        },
        {
            title: '下载',
            dataIndex: 'download',
            key: 'download',
            render: (_, record) => (
                <Flex p="20px" alignItems="center" justifyContent="center">
                    <ReactSVG
                        src={IconDownload}
                        style={{ width: '24px' }}
                        onClick={() => {
                            onDownloadOrder(record);
                        }}
                    />
                </Flex>
            ),
        },
        {
            title: '删除',
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => (
                <Flex p="20px" alignItems="center" justifyContent="center">
                    <ReactSVG
                        src={IconDelete}
                        style={{ width: '18px' }}
                        onClick={() => {
                            handleDel(record._id);
                        }}
                    />
                </Flex>
            ),
        },
    ];
    return <OrderTableComponent columns={columns} dataSource={orderList} />;
};

export default connect(({ usercenter }) => {
    // console.log('props', props);
    return {
        orderList: usercenter.myDiyOrder,
    };
})(OrderTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
