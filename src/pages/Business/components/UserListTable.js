import React from 'react';
import { Flex } from 'rebass/styled-components';
import { ReactSVG } from 'react-svg';
import Table from '@/components/Table';
import IconDownload from '@/public/icons/icon-download.svg';
import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';

const UserListTable = ({ orderList = [], ...props }) => {
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
        },
        {
            title: '总金额',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
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
            render: () => (
                <Flex p="20px" alignItems="center" justifyContent="center">
                    <ReactSVG src={IconDelete} style={{ width: '18px' }} />
                </Flex>
            ),
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={orderList}
            rowKey={record => record._id}
            rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(
                        `selectedRowKeys: ${selectedRowKeys}`,
                        'selectedRows: ',
                        selectedRows,
                    );
                },
                getCheckboxProps: record => {
                    console.log(record);
                    return {
                        disabled: record.name === 'Disabled User',
                        // Column configuration not to be checked
                        orderNo: record.orderNo,
                    };
                },
            }}
        />
    );
};

export default connect(({ usercenter }) => {
    // console.log('props', props);
    return {
        orderList: usercenter.userOrder.diy,
    };
})(UserListTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
