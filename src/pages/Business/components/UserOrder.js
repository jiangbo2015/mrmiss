import IconDelete from '@/public/icons/icon-delete.svg';
import IconDownload from '@/public/icons/icon-download.svg';
import { Popconfirm, DatePicker, Button } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';
import OrderTableComponent from './OrderTableComponent';
import UserListMinTable from './UserListMinTable';
import SearchInput from '@/components/SearchInput';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import IconUserSign from '@/public/icons/icon-usersign.svg';

const OrderTable = ({ ownOrderList = {}, dispatch, userId }) => {
    const [selectUserModal, setSelectUserModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [timeRange, setTimeRange] = useState([]);
    const [queryKey, setQueryKey] = useState('');
    const { order = [], capsuleOrder = [], shopOrder = [] } = ownOrderList;

    useEffect(() => {
        dispatch({
            type: 'business/getOwnOrderList',
            payload: {
                userId,
                timeRange,
                selectedUsers,
                queryKey,
            },
        });
        console.log('timeRange', timeRange);
    }, [dispatch, userId, selectedUsers, timeRange, queryKey]);

    const data = [
        ...order.map(x => ({ ...x, orderType: 'order' })),
        ...capsuleOrder.map(x => ({ ...x, orderType: 'capsule' })),
        ...shopOrder.map(x => ({ ...x, orderType: 'shop' })),
    ];

    const updateSelectedRowKeys = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys', selectedRowKeys);
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
    };
    const handleDelete = record => () => {
        dispatch({
            type: 'business/delOwnOrder',
            payload: {
                orderType: record.orderType,
                _id: record._id,
            },
        });
    };

    const handleDeleteSelected = () => {
        if (selectedRowKeys.length < 1) {
            return;
        }
        dispatch({
            type: 'business/delOwnOrder',
            payload: {
                ids: selectedRowKeys,
            },
        });
    };

    const handleSearch = e => {
        setQueryKey(e.target.value);
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
            render: (text, record) =>
                record.orderType === 'shop' ? record.sumCount : text?.reduce((left, right) => left + right.rowTotal, 0),
        },
        {
            title: '总金额',
            dataIndex: 'orderData',
            key: 'totalPrice',
            render: (text, record) =>
                record.orderType === 'shop' ? record.sumPrice : text?.reduce((left, right) => left + right.rowTotalPrice, 0),
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
                <Popconfirm title="确认要删除吗" onConfirm={handleDelete(record)}>
                    <Flex p="20px" alignItems="center" justifyContent="center">
                        <ReactSVG src={IconDelete} style={{ width: '18px' }} />
                    </Flex>
                </Popconfirm>
            ),
        },
    ];
    return (
        <Box>
            <Modal
                className="mm-yellow-modal"
                footer={false}
                visible={selectUserModal}
                title={
                    <Flex bg="#FDDB3A" width={1} justifyContent="center">
                        <ReactSVG src={IconUserSign} style={{ width: '24px', paddingRight: '4px' }} />
                    </Flex>
                }
                bodyStyle={{
                    backgroundColor: '#F0F0F0',
                }}
                onCancel={() => {
                    setSelectUserModal(false);
                }}
                width="600px"
            >
                <UserListMinTable
                    selecteds={selectedUsers}
                    onOk={keys => {
                        setSelectedUsers(keys);
                        setSelectUserModal(false);
                    }}
                />
            </Modal>
            <Flex mb="8px">
                <Box>
                    <DatePicker.RangePicker
                        style={{ color: '#fff' }}
                        onChange={values => {
                            if (!values) {
                                setTimeRange([]);
                            } else {
                                setTimeRange([values[0].format('YYYY-MM-DD'), values[1].format('YYYY-MM-DD')]);
                            }
                        }}
                    ></DatePicker.RangePicker>
                </Box>
                <Flex mx="12px" color="#fff" bg="#4A4A4A" px="10px" py="4px" sx={{ cursor: 'pointer' }}>
                    合并下载所选订单
                </Flex>
                {userId ? null : (
                    <Flex
                        color="#fff"
                        bg="#4A4A4A"
                        px="10px"
                        py="4px"
                        sx={{ cursor: 'pointer' }}
                        alignItems="center"
                        onClick={() => {
                            setSelectUserModal(true);
                        }}
                    >
                        按客户进行分类{' '}
                        <Box
                            ml="12px"
                            bg={selectedUsers.length <= 0 ? '#323232' : '#FF4814'}
                            width="14px"
                            height="14px"
                            sx={{ borderRadius: '50%' }}
                        />
                    </Flex>
                )}
            </Flex>
            <Flex bg="#41444B" p="14px">
                <Flex alignItems="center">
                    <Popconfirm title="确认删除吗？" onConfirm={handleDeleteSelected}>
                        <Button
                            disabled={selectedRowKeys.length < 1}
                            shape="circle"
                            size="large"
                            icon={<DeleteOutlined />}
                            style={{ backgroundColor: '#D2D2D2' }}
                        />
                    </Popconfirm>
                    <SearchInput
                        mode="white"
                        placeholder="SEARCH"
                        style={{ width: '200px', marginLeft: '30px' }}
                        onSearch={handleSearch}
                    />
                </Flex>
            </Flex>
            <OrderTableComponent
                columns={columns}
                dataSource={data}
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
        </Box>
    );
};

export default connect(state => {
    // console.log('props', props);
    return {
        ownOrderList: state.business.ownOrderList,
    };
})(OrderTable);
