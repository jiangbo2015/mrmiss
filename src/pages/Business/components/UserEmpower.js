import React, { useState } from 'react';
import { Button } from 'antd';
import { ReactSVG } from 'react-svg';
import {
    LockOutlined,
    UnlockOutlined,
    SaveOutlined,
    CopyOutlined,
} from '@ant-design/icons';
import { Flex, Box } from 'rebass/styled-components';
import { connect } from 'dva';

import Table from '@/components/Table';
import Switch from '@/components/Switch';
import Modal from '@/components/Modal';
import Select2 from '@/components/Select/Select2';
import IconEmpower from '@/public/icons/icon-empower.svg';
import IconUserSign from '@/public/icons/icon-usersign.svg';

import UserListMinTable from './UserListMinTable';
// <LockOutlined />  <UnlockOutlined />
const UserListTable = ({
    currentCustomerEmpowerInfo = [],
    currentCustomer,
    ...props
}) => {
    const [copiedUserModal, setCopiedUserModal] = useState(false);
    const [selectCopiedUser, setSelectCopiedUser] = useState([]);
    const columns = [
        {
            title: '产品类别',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: '所在通道',
            dataIndex: 'channel',
            key: 'channel',
            width: 200,
        },
        {
            title: '授权',
            dataIndex: 'empowered',
            key: 'empowered',
            width: 200,
            render: val => {
                return val === undefined ? null : <Switch checked={val} />;
            },
        },
        {
            title: '通道备注',
            dataIndex: 'channelInfo',
            key: 'channelInfo',
        },
    ];
    const expandedRowRender = rowData => {
        const expandedColumns = [
            {
                title: '产品类别',
                dataIndex: 'name',
                key: 'name',
                width: 200,
            },
            {
                title: '所在通道',
                dataIndex: 'channel',
                key: 'channel',
                width: 200,
                render: val => (
                    <Select2
                        options={[
                            { label: 'A', value: 'A' },
                            { label: 'B', value: 'B' },
                        ]}
                        value={val}
                    />
                ),
            },
            {
                title: '授权',
                dataIndex: 'empowered',
                key: 'empowered',
                width: 200,
                render: val => <Switch checked={val} />,
            },
            {
                title: '通道备注',
                dataIndex: 'channelInfo',
                key: 'channelInfo',
            },
        ];
        // if (!rowData.goodsInfo) return null;
        return (
            <Table
                showHeader={false}
                columns={expandedColumns}
                dataSource={rowData.goodsInfo}
                rowKey={record => record._id}
            />
        );
    };
    return (
        <Box>
            <Modal
                className="mm-yellow-modal"
                footer={false}
                visible={copiedUserModal}
                title={
                    <Flex bg="#FDDB3A" width={1} justifyContent="center">
                        <ReactSVG
                            src={IconUserSign}
                            style={{ width: '24px', paddingRight: '4px' }}
                        />
                    </Flex>
                }
                bodyStyle={{
                    backgroundColor: '#F0F0F0',
                }}
                onCancel={() => {
                    setCopiedUserModal(false);
                }}
                width="600px"
            >
                <UserListMinTable />
            </Modal>
            <Flex p="16px" justifyContent="center" alignItems="center">
                <ReactSVG
                    style={{ width: '40px', height: '40px' }}
                    src={IconEmpower}
                />
                <Box p="0 20px">客户名称：{currentCustomer.name}</Box>
                <Box>客户税号：{currentCustomer.pick}</Box>
            </Flex>
            <Flex p="16px">
                <Button
                    shape="circle"
                    size="large"
                    icon={<LockOutlined />}
                    style={{ backgroundColor: '#D2D2D2' }}
                />
                <Button
                    shape="circle"
                    size="large"
                    icon={<SaveOutlined />}
                    style={{
                        backgroundColor: '#D2D2D2',
                        margin: '0 50px 0 20px',
                    }}
                />
                <Button
                    shape="circle"
                    size="large"
                    icon={<CopyOutlined />}
                    style={{ backgroundColor: '#D2D2D2' }}
                    onClick={() => {
                        setCopiedUserModal(true);
                    }}
                />
            </Flex>

            <Table
                columns={columns}
                dataSource={currentCustomerEmpowerInfo}
                rowKey={record => record.key}
                rowClassName="parent-row"
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['diy', 'capsule', 'shop'],
                    rowExpandable: record => record.goodsInfo,
                }}
            />
        </Box>
    );
};

export default connect(({ business }) => {
    // console.log('props', props);
    return {
        currentCustomer: business.currentCustomer,
        currentCustomerEmpowerInfo: business.currentCustomerEmpowerInfo,
    };
})(UserListTable);
