import React, { useEffect, useState } from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { ReactSVG } from 'react-svg';
import OrderTableComponent from './OrderTableComponent';
import IconDownload from '@/public/icons/icon-download.svg';
import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';
import { message } from 'antd';
import lodash from 'lodash';
import request from '@/utils/request';
import OrderDownload from '@/components/OrderDownload';

const OrderTable = ({ orderList = [], dispatch,onShowDetail }) => {
    const [downloadOrder, setDownloadOrder] = useState(false);
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
    const handleDownload = async record => {
        setDownloadOrder(record);
    };

    const getDownloadUrlAndOpen = async data => {
        const res = await request('/api/order/postDownload', {
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
                        onShowDetail({...record,orderType:'order'})
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
            dataIndex: 'download',
            key: 'download',
            render: (_, record) => (
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
    return (
        <>
            <OrderTableComponent columns={columns} dataSource={orderList} />
            {!downloadOrder ? null : <OrderDownload order={downloadOrder} onGetDownloadUrlAndOpen={getDownloadUrlAndOpen} />}
        </>
    );
};

export default connect(({ usercenter }) => {
    // // console.log('props', props);
    return {
        orderList: usercenter.myDiyOrder,
    };
})(OrderTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
