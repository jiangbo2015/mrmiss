import Modal from '@/components/Modal';
// import { Flex } from 'rebass/styled-components';
// import { ReactSVG } from 'react-svg';
import Table from '@/components/Table';
// import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import UserEmpower from './UserEmpower';
import UserOrder from './UserOrder';

const UserListTable = ({ customerList = [], currentCustomer, dispatch, updateSelectedRowKeys, ...props }) => {
    const [empowerSingleCustomer, setEmpowerSingleCustomer] = useState(false);
    const [userOrderModal, setUserOrderModal] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'business/getMyCustomer',
        });
    }, []);

    const handleAssign = item => {
        console.log('setEmpowerSingleCustomer(true)', item);
        dispatch({
            type: 'business/setCurrentCustomer',
            payload: item,
        });
        setEmpowerSingleCustomer(true);
    };

    const columns = [
        {
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '客户税号',
            dataIndex: 'VATNo',
            key: 'VATNo',
        },
        {
            title: '客户权限',
            dataIndex: 'totalCount',
            key: 'totalCount',
            render: (value, record) => (
                <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                        handleAssign(record);
                    }}
                >
                    授权
                </a>
            ),
        },
        {
            title: '客户订单',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: () => (
                <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                        setUserOrderModal(true);
                    }}
                >
                    查看
                </a>
            ),
        },
    ];
    return (
        <>
            <Modal
                footer={false}
                visible={empowerSingleCustomer}
                onCancel={() => {
                    setEmpowerSingleCustomer(false);
                }}
                width="1200px"
            >
                <UserEmpower />
            </Modal>
            <Modal
                title={`${currentCustomer.name}的订单`}
                visible={userOrderModal}
                footer={false}
                width="1200px"
                onCancel={() => {
                    setUserOrderModal(false);
                }}
            >
                <UserOrder />
            </Modal>
            <Table
                columns={columns}
                dataSource={customerList}
                rowKey={record => record._id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        updateSelectedRowKeys(selectedRowKeys);
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
        </>
    );
};

export default connect(({ business = {} }) => {
    // console.log('props', props);
    return {
        currentCustomer: business.currentCustomer,
        customerList: business.customerList,
    };
})(UserListTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
