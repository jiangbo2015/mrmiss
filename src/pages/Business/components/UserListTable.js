import Modal from '@/components/Modal';
// import { Flex } from 'rebass/styled-components';
// import { ReactSVG } from 'react-svg';
import Table from '@/components/Table';
import UserInfoFrom from '@/components/UserInfoFrom';

// import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import UserEmpower from './UserEmpower';
import UserOrder from './UserOrder';

const UserListTable = ({ customerList = [], currentCustomer, currentUser, dispatch, updateSelectedRowKeys, ...props }) => {
    const [empowerSingleCustomer, setEmpowerSingleCustomer] = useState(false);
    const [userOrderModal, setUserOrderModal] = useState(false);
    const [userInfoModal, setUserInfoModal] = useState(false);
    const { lastLevel } = currentUser;
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

    const handleSubmit = async data => {
        await dispatch({
            type: 'user/update',
            payload: data,
        });
    };

    const columns = [
        {
            title: `${lastLevel}名称`,
            dataIndex: 'name',
            key: 'name',
            render: (value, record) => (
                <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                        dispatch({
                            type: 'business/setCurrentCustomer',
                            payload: record,
                        });
                        setUserInfoModal(true)
                    }}
                >
                    {value}
                </a>
            ),
        },
        {
            title: `${lastLevel}税号`,
            dataIndex: 'VATNo',
            key: 'VATNo',
        },
        {
            title: `${lastLevel}权限`,
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
            title: `${lastLevel}订单`,
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (_, record) => (
                <a
                    style={{ textDecoration: 'underline' }}
                    onClick={() => {
                        setUserOrderModal(true);
                        dispatch({
                            type: 'business/setCurrentCustomer',
                            payload: record,
                        });
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
                <UserOrder userId={currentCustomer._id} />
            </Modal>

            <Modal
                title={`${currentCustomer.name}的信息`}
                visible={userInfoModal}
                footer={false}
                width="1200px"
                onCancel={() => {
                    setUserInfoModal(false);
                }}
            >
                <UserInfoFrom data={currentCustomer} onSumbit={handleSubmit} role={currentCustomer.role}/>
            </Modal>
        
            <Table
                columns={columns}
                dataSource={customerList}
                rowKey={record => record._id}
                rowSelection={{
                    type: 'checkbox',
                    onChange: (selectedRowKeys, selectedRows) => {
                        updateSelectedRowKeys(selectedRowKeys, selectedRows);
                        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows:', selectedRows);
                    },
                    getCheckboxProps: record => {
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

export default connect(({ business = {}, user }) => {
    // console.log('props', props);
    return {
        currentCustomer: business.currentCustomer,
        customerList: business.customerList,
        currentUser: user.info,
    };
})(UserListTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
