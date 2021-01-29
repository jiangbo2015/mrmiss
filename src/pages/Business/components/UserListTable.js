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
            title: '客户名称',
            dataIndex: 'orderNo',
            key: 'orderNo',
        },
        {
            title: '客户税号',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '客户权限',
            dataIndex: 'totalCount',
            key: 'totalCount',
        },
        {
            title: '客户订单',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
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
