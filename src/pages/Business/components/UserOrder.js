import IconDelete from '@/public/icons/icon-delete.svg';
import IconDownload from '@/public/icons/icon-download.svg';
import { Popconfirm, DatePicker, Button, message } from 'antd';
import { connect } from 'dva';
import React, { useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';
import OrderTableComponent from './OrderTableComponent';
import UserListMinTable from './UserListMinTable';
import DCOrderEditor from './DC-OrderEditor';
import SOrderEditor from './S-OrderEditor';
import SearchInput from '@/components/SearchInput';
import { DeleteOutlined } from '@ant-design/icons';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import IconUserSign from '@/public/icons/icon-usersign.svg';
import request from '@/utils/request';
import OrderDownload from '@/components/OrderDownload';
import { useIntl } from 'umi';

const OrderTable = ({ ownOrderList = {}, dispatch, userId, currentOrder, unReaded }) => {
    const intl = useIntl();
    const [selectUserModal, setSelectUserModal] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isMerge, setIsMerge] = useState('all');
    const [timeRange, setTimeRange] = useState([]);
    const [queryKey, setQueryKey] = useState('');
    const { order = [], capsuleOrder = [], shopOrder = [] } = ownOrderList;
    const [downloadOrder, setDownloadOrder] = useState(false);
    const [showDetailOrder, setShowDetailOrder] = useState(false);
    const [showShopDetailOrder, setShowShopDetailOrder] = useState(false);

    const handleDownload = async record => {
        // console.log(record);
        if (record.orderType === 'shop') {
            const req = await request('/api/shopOrder/postDownload', {
                data: { _id: record._id },
                method: 'post',
            });
            if (req) {
                // // console.log(req)
                window.open(`${process.env.DOWNLOAD_URL}/${req.data.url}`);
            }
        } else {
            setDownloadOrder(record);
        }
    };

    const getDownloadUrlAndOpen = async data => {
        let api = '/api/order/postDownload';
        if (downloadOrder.type === 'capsule') {
            api = '/api/orderCapsule/postDownload';
        }
        const res = await request(api, {
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

    useEffect(() => {
        let payload = {
            userId,
            timeRange,
            selectedUsers,
            queryKey,
        };
        if (isMerge !== 'all') {
            payload.isMerge = isMerge;
        }
        if (unReaded) {
            payload.isReaded = 0;
        }
        dispatch({
            type: 'business/getOwnOrderList',
            payload,
        });
        // // console.log('timeRange', timeRange);
    }, [dispatch, userId, selectedUsers, timeRange, queryKey, isMerge]);

    const data = [
        ...order.map(x => ({ ...x, orderType: 'order' })),
        ...capsuleOrder.map(x => ({ ...x, orderType: 'capsule' })),
        ...shopOrder.map(x => ({ ...x, orderType: 'shop' })),
    ];

    const updateSelectedRowKeys = (selectedRowKeys, selectedRows) => {
        // // console.log('selectedRowKeys', selectedRowKeys);
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

    const handleMerge = async () => {
        // console.log('selectedRows', selectedRows);

        await dispatch({
            type: 'business/mergeOwnOrder',
            payload: {
                selectedRows,
            },
        });

        let payload = {
            userId,
            timeRange,
            selectedUsers,
            queryKey,
        };
        if (isMerge !== 'all') {
            payload.isMerge = isMerge;
        }
        dispatch({
            type: 'business/getOwnOrderList',
            payload,
        });
    };

    const handleShowOrderDetail = async record => {
        await dispatch({
            type: 'business/createCurrentOrderToGroupList',
            payload: record,
        });
        setShowDetailOrder(true);
    };

    const handleShowShopOrderDetail = async record => {
        await dispatch({
            type: 'business/createCurrentShopOrderToGroupList',
            payload: record,
        });
        setShowShopDetailOrder(true);
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
                        if (record.orderType === 'shop') {
                            handleShowShopOrderDetail(record);
                        } else {
                            handleShowOrderDetail(record);
                        }

                        // setUserInfoModal(true)
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
            key: 'sumCount',
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
                id: 'submission',
                defaultMessage: '是否合并提交',
            }),
            dataIndex: 'isMerge',
            key: 'isMerge',
            render: text =>
                text ? (
                    intl.formatMessage({
                        id: 'submitted',
                        defaultMessage: '已提交',
                    })
                ) : (
                    <Box color="#FDDB3A">
                        {' '}
                        {intl.formatMessage({
                            id: 'unsubmitted',
                            defaultMessage: '未提交',
                        })}
                    </Box>
                ),
        },
        {
            title: intl.formatMessage({
                id: 'download',
                defaultMessage: '下载',
            }),
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
            title: intl.formatMessage({
                id: 'delete',
                defaultMessage: '删除',
            }),
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
            <DCOrderEditor
                visible={showDetailOrder}
                onCancel={() => {
                    setShowDetailOrder(false);
                }}
            />
            <SOrderEditor
                visible={showShopDetailOrder}
                onCancel={() => {
                    setShowShopDetailOrder(false);
                }}
            />
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
            <Flex mb="8px" alignItems="center">
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
                {userId ? null : (
                    <Flex
                        color="#fff"
                        bg="#4A4A4A"
                        px="10px"
                        py="4px"
                        m="12px"
                        sx={{ cursor: 'pointer' }}
                        alignItems="center"
                        onClick={() => {
                            setSelectUserModal(true);
                        }}
                    >
                        {intl.formatMessage({
                            id: 'sort_by_clients',
                            defaultMessage: '按客户进行分类',
                        })}{' '}
                        <Box
                            ml="12px"
                            bg={selectedUsers.length <= 0 ? '#323232' : '#FF4814'}
                            width="14px"
                            height="14px"
                            sx={{ borderRadius: '50%' }}
                        />
                    </Flex>
                )}
                <Select
                    width="140px"
                    style={{ margin: '0 8px' }}
                    onChange={val => setIsMerge(val)}
                    value={isMerge}
                    options={[
                        {
                            label: intl.formatMessage({
                                id: 'all',
                                defaultMessage: '所有',
                            }),
                            value: 'all',
                        },
                        {
                            label: intl.formatMessage({
                                id: 'orders_submitted',
                                defaultMessage: '已合并提交',
                            }),
                            value: 1,
                        },
                        {
                            label: intl.formatMessage({
                                id: 'orders_pending',
                                defaultMessage: '未合并提交',
                            }),
                            value: 0,
                        },
                    ]}
                />
                {isMerge === 0 ? (
                    <Flex
                        color="#fff"
                        bg="#4A4A4A"
                        px="10px"
                        py="4px"
                        sx={{ cursor: 'pointer', borderRadius: '16px' }}
                        onClick={() => {
                            handleMerge();
                        }}
                    >
                        {intl.formatMessage({
                            id: 'merge_submission_orders',
                            defaultMessage: '合并提交所选订单',
                        })}
                    </Flex>
                ) : null}
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
                        // // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows:', selectedRows);
                    },
                    getCheckboxProps: record => {
                        return {
                            disabled: record.name === 'Disabled User',
                            orderNo: record.orderNo,
                        };
                    },
                }}
            />
            {!downloadOrder ? null : <OrderDownload order={downloadOrder} onGetDownloadUrlAndOpen={getDownloadUrlAndOpen} />}
        </Box>
    );
};

export default connect(({ business }) => {
    // // console.log('props', props);
    return {
        ownOrderList: business.ownOrderList,
        currentOrder: business.currentOrder,
    };
})(OrderTable);
