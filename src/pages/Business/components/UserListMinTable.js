import React, { useState } from 'react';
// import { Flex } from 'rebass/styled-components';
import { Button } from 'antd';
import Table from '@/components/Table';
// import Modal from '@/components/Modal';
import { Flex, Box } from 'rebass/styled-components';
// import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';
import SearchInput from '@/components/SearchInput';
import { SaveOutlined } from '@ant-design/icons';

const UserListTable = ({ customerList = [], ...props }) => {
    const [empowerSingleCustomer, setEmpowerSingleCustomer] = useState(false);
    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '客户税号',
            dataIndex: 'date',
            key: 'date',
        },
    ];
    return (
        <Box>
            <Flex p="0 0 30px 0" alignItems="center" justifyContent="space-between">
                <SearchInput mode="white" placeholder="SEARCH" style={{ width: '200px' }} />
                <Button
                    shape="circle"
                    icon={<SaveOutlined />}
                    style={{ backgroundColor: '#ffffff', borderColor: '#fff' }}
                    onClick={() => {
                        // setCopiedUserModal(true);
                    }}
                />
            </Flex>
            <Table
                columns={columns}
                dataSource={customerList}
                rowKey={record => record._id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows:', selectedRows);
                    },
                    getCheckboxProps: record => {
                        console.log(record);
                        return {
                            disabled: record.name === 'Disabled User',
                            orderNo: record.orderNo,
                        };
                    },
                }}
            />
        </Box>
    );
};

export default connect(({ business = {} }) => {
    // console.log('props', props);
    return {
        customerList: business.customerList,
    };
})(UserListTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
