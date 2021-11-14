import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import SearchInput from '@/components/SearchInput';
import UserInfoFrom from '@/components/UserInfoFrom';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Badge } from 'antd';
import { connect } from 'dva';
import { useIntl } from 'umi';
import React, { useCallback, useState } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import UserListTable from './components/UserListTable';
import UserOrder from './components/UserOrder';
import UserEmpower from './components/UserEmpower';
//
function Business(props) {
    const intl = useIntl();
    const [channelEmpowerModal, setChannelEmpowerModal] = useState(false);
    const [userOrderModal, setUserOrderModal] = useState(false);
    const [userAddModal, setUserAddModal] = useState(false);
    const [unReaded, setUnReaded] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const updateSelectedRowKeys = useCallback((selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        setSelectedRows(selectedRows);
    }, []);

    const handleSubmit = useCallback(async payload => {
        const { dispatch } = props;
        const res = await dispatch({
            type: 'business/addUser',
            payload,
        });
        if (res) {
            userAddModal(false);
        }
    }, []);

    const handleDelete = useCallback(async () => {
        // // console.log(state);
        const { dispatch } = props;
        if (selectedRowKeys.length < 1) {
            return;
        }
        await dispatch({
            type: 'business/delMyCustomer',
            payload: {
                ids: selectedRowKeys,
            },
        });
        setSelectedRowKeys(selectedRowKeys);
    }, []);

    const handleSearch = useCallback(e => {
        const { dispatch } = props;
        dispatch({
            type: 'business/getMyCustomer',
            payload: {
                search: e.target.value,
            },
        });
    }, []);

    const { currentUser = {}, unReadedNum } = props;
    // const { unReaded } = state;
    const { lastLevel, role } = currentUser;
    return (
        <Layout>
            <Modal
                title={intl.formatMessage({
                    id: role === 1 ? 'add_new_agent' : 'add_new_customer',
                    defaultMessage: `新增${lastLevel}`,
                })}
                visible={userAddModal}
                footer={false}
                width="1200px"
                onCancel={() => {
                    setUserAddModal(false);
                }}
            >
                <UserInfoFrom onSumbit={handleSubmit} isAdd role={role} />
            </Modal>
            <Modal
                visible={channelEmpowerModal}
                footer={false}
                width="1200px"
                onCancel={useCallback(() => {
                    setChannelEmpowerModal(false);
                }, [])}
            >
                <UserEmpower batch selectedRows={selectedRows} />
            </Modal>
            <Modal
                title={intl.formatMessage({
                    id: 'order_management',
                    defaultMessage: `${lastLevel}订单管理${unReaded ? '(未查看)' : ''}`,
                })}
                visible={userOrderModal}
                footer={false}
                width="1200px"
                destroyOnClose
                onCancel={useCallback(() => {
                    setUserOrderModal(false);
                }, [])}
            >
                <UserOrder unReaded={unReaded} />
            </Modal>
            <Box height="116px" width={[1]} bg="#FDDB3B" mt="74px" />

            {currentUser.role > 3 ? null : (
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    height="84px"
                    bg="#41444B"
                    sx={{
                        color: '#6F6F6F',
                        button: {
                            width: '220px',
                            ':hover': {
                                bg: '#FDDB3B',
                                color: '#000',
                            },
                        },
                    }}
                >
                    <Button
                        type="primary"
                        shape="round"
                        onClick={useCallback(() => {
                            setUserAddModal(true);
                        }, [])}
                        style={{ margin: '0 50px' }}
                    >
                        {intl.formatMessage({
                            id: role === 1 ? 'add_new_agent' : 'add_new_customer',
                            defaultMessage: `新增${lastLevel}`,
                        })}
                    </Button>
                    {/* <Button
                        type="primary"
                        shape="round"
                        style={{ margin: '0 50px' }}
                        onClick={() => {
                            setState({
                                ...state,
                                channelEmpowerModal: true,
                            });
                        }}
                    >
                        通道权限管理
                    </Button> */}
                    <Button
                        type="primary"
                        shape="round"
                        onClick={() => {
                            setUnReaded(false);
                            setUserOrderModal(true);
                        }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {intl.formatMessage({
                            id: 'order_management',
                            defaultMessage: `${lastLevel}订单管理`,
                        })}

                        {unReadedNum ? (
                            <Badge
                                style={{ marginLeft: '8px' }}
                                count={unReadedNum}
                                onClick={e => {
                                    e.stopPropagation();
                                    setUserOrderModal(true);
                                    setUnReaded(true);
                                }}
                            />
                        ) : null}
                    </Button>
                </Flex>
            )}
            <Box p="20px">
                <Flex justifyContent="space-between" p="30px 0">
                    <Flex alignItems="center">
                        <Popconfirm title="确认删除吗？" onConfirm={handleDelete}>
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
                    <Button
                        disabled={selectedRowKeys.length < 1}
                        type="primary"
                        onClick={() => {
                            dispatch({
                                type: 'business/setCurrentCustomer',
                                payload: {
                                    channels: [],
                                    goods: [],
                                    capsules: [],
                                    branchs: [],
                                    businessUserd: false,
                                    channelEmpowerUserd: false,
                                    innerDataUserd: false,
                                },
                            });
                            setChannelEmpowerModal(true);
                        }}
                    >
                        {intl.formatMessage({
                            id: 'bulk_authorize',
                            defaultMessage: '批量授权',
                        })}
                    </Button>
                </Flex>

                <UserListTable updateSelectedRowKeys={updateSelectedRowKeys} selectedRowKeys={selectedRowKeys} />
            </Box>
        </Layout>
    );
}

export default connect(({ user, business }) => ({ currentUser: user.info, unReadedNum: business.unReadedNum }))(Business);
