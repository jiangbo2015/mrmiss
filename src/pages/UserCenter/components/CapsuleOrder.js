import IconDelete from '@/public/icons/icon-delete.svg';
import IconDownload from '@/public/icons/icon-download.svg';
import { Popconfirm, message } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex } from 'rebass/styled-components';
import OrderTableComponent from './OrderTableComponent';
import request from '@/utils/request';
import OrderDownload from '@/components/OrderDownload';

const OrderTable = ({ orderList = [], dispatch, onShowDetail }) => {
    const [downloadOrder, setDownloadOrder] = useState(false);
    useEffect(() => {
        dispatch({
            type: 'usercenter/getUserCapsuleOrder',
            payload: {
                isSend: 1,
            },
        });
    }, []);

    const handleDel = _id => {
        dispatch({
            type: 'usercenter/delCapsuleOrder',
            payload: {
                _id,
            },
        });
    };

    const handleDownload = async record => {
        setDownloadOrder(record);
    };

    const getDownloadUrlAndOpen = async data => {
        const res = await request('/api/capsuleOrder/postDownload', {
            data,
            method: 'post',
        });
        if (res && res.data) {
            window.open(`${process.env.DOWNLOAD_URL}/${res.data.url}`);
            setDownloadOrder(false);
        } else {
            message.error('服务器错误，请稍后再试');
        }
    };

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            render: (value, record) => (
                <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                        onShowDetail({ ...record, orderType: 'capsule' });
                        // setUserInfoModal(true) record
                    }}
                >
                    {value}
                </a>
            ),
        },
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '总数量',
            dataIndex: 'sumCount',
            key: 'sumPrice',
        },
        {
            title: '总金额',
            dataIndex: 'sumPrice',
            key: 'sumPrice',
        },
        {
            title: '下载',
            dataIndex: '_id',
            key: '_id',
            render: (id, record) => (
                <Flex p="20px" alignItems="center" justifyContent="center">
                    <ReactSVG
                        src={IconDownload}
                        style={{ width: '24px' }}
                        onClick={() => {
                            handleDownload(record);
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
    return (
        <>
            <OrderTableComponent columns={columns} dataSource={orderList} />
            {!downloadOrder ? null : (
                <OrderDownload
                    order={downloadOrder}
                    onGetDownloadUrlAndOpen={getDownloadUrlAndOpen}
                    onClose={() => {
                        setDownloadOrder(false);
                    }}
                />
            )}
        </>
    );
};

export default connect(({ usercenter }) => {
    return {
        orderList: usercenter.userOrder.capsule,
    };
})(OrderTable);
