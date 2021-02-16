import IconDelete from '@/public/icons/icon-delete.svg';
import IconDownload from '@/public/icons/icon-download.svg';
import { Popconfirm } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';
import OrderTableComponent from './OrderTableComponent';

const OrderTable = ({ orderList = [], dispatch }) => {
    useEffect(() => {
        dispatch({
            type: 'usercenter/getUserShopOrder',
        });
    }, []);

    const handleDel = _id => {
        dispatch({
            type: 'usercenter/delShopOrder',
            payload: {
                _id,
            },
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
            dataIndex: 'orderData',
            key: 'totalCount',
            render: (text, record) => text?.reduce((left, right) => left + right.rowTotal, 0),
        },
        {
            title: '总金额',
            dataIndex: 'orderData',
            key: 'totalPrice',
            render: (text, record) => text?.reduce((left, right) => left + right.rowTotalPrice, 0),
        },
        {
            title: '下载',
            dataIndex: 'download',
            key: 'download',
            render: () => (
                <Flex p="20px" alignItems="center" justifyContent="center">
                    <ReactSVG src={IconDownload} style={{ width: '24px' }} />
                </Flex>
            ),
        },
        {
            title: '删除',
            dataIndex: 'delete',
            key: 'delete',
            render: (_, record) => (
                <Popconfirm title="确认要删除吗？" onConfirm={() => handleDel(record._id)}>
                    <Flex p="20px" alignItems="center" justifyContent="center">
                        <ReactSVG src={IconDelete} style={{ width: '18px' }} />
                    </Flex>
                </Popconfirm>
            ),
        },
    ];
    return <OrderTableComponent columns={columns} dataSource={orderList} />;
};

export default connect(({ usercenter }) => {
    return {
        orderList: usercenter.userOrder.shop,
    };
})(OrderTable);
