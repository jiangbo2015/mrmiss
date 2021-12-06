import IconDelete from '@/public/icons/icon-delete.svg';
import IconDownload from '@/public/icons/icon-download.svg';
import request from '@/utils/request';
import { Popconfirm } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';
import OrderTableComponent from './OrderTableComponent';
import { useIntl } from 'umi';

const OrderTable = ({ orderList = [], dispatch, onShowDetail }) => {
    const intl = useIntl()
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

    const handleDownload = async id => {
        const req = await request('/api/shopOrder/postDownload', {
            data: { _id: id },
            method: 'post',
        });
        if (req) {
            // // console.log(req)
            window.open(`${process.env.DOWNLOAD_URL}/${req.data.url}`);
        }
    };

    const columns = [
        {
            title: intl.formatMessage({
                id: 'orders_number',
                defaultMessage: '订单编号',
            }),
            dataIndex: 'orderNo',
            key: 'orderNo',
            render: (value, record) => (
                <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                        onShowDetail(record);
                        // setUserInfoModal(true) record
                    }}
                >
                    {value}
                </a>
            ),
        },
        {
            title: intl.formatMessage({
                id: 'date',
                defaultMessage: '日期',
            }),
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: intl.formatMessage({
                id: 'total_quantity',
                defaultMessage: '总数量',
            }),
            dataIndex: 'sumCount',
            key: 'sumPrice',
        },
        {
            title: intl.formatMessage({
                id: 'total_amount',
                defaultMessage: '总金额',
            }),
            dataIndex: 'sumPrice',
            key: 'sumPrice',
        },
        {
            title: intl.formatMessage({
                id: 'download',
                defaultMessage: '下载',
            }),
            dataIndex: '_id',
            key: '_id',
            render: id => (
                <Flex p="20px" alignItems="center" justifyContent="center">
                    <ReactSVG
                        src={IconDownload}
                        style={{ width: '24px' }}
                        onClick={() => {
                            handleDownload(id);
                        }}
                    />
                </Flex>
            ),
        },
        // {
        //     title: '删除',
        //     dataIndex: 'delete',
        //     key: 'delete',
        //     render: (_, record) => (
        //         <Popconfirm title="确认要删除吗？" onConfirm={() => handleDel(record._id)}>
        //             <Flex p="20px" alignItems="center" justifyContent="center">
        //                 <ReactSVG src={IconDelete} style={{ width: '18px' }} />
        //             </Flex>
        //         </Popconfirm>
        //     ),
        // },
    ];
    return <OrderTableComponent columns={columns} dataSource={orderList} />;
};

export default connect(({ usercenter, user }) => {
    return {
        orderList: usercenter.userOrder.shop,
        currentUser: user.info,
    };
})(OrderTable);
