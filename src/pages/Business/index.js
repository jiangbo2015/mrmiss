import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import SearchInput from '@/components/SearchInput';
import UserInfoFrom from '@/components/UserInfoFrom';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Badge } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import UserListTable from './components/UserListTable';
import UserOrder from './components/UserOrder';
import UserEmpower from './components/UserEmpower';

class Business extends React.Component {
    state = {
        channelEmpowerModal: false,
        userOrderModal: false,
        userAddModal: false,
        selectedRowKeys: [],
        selectedRows: [],
    };
    callback(key) {
        // console.log(key);
    }

    updateSelectedRowKeys = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRowKeys,
            selectedRows,
        });
    };

    handleSubmit = async payload => {
        const { dispatch } = this.props;
        const res = await dispatch({
            type: 'business/addUser',
            payload,
        });
        if (res) {
            this.setState({
                userAddModal: false,
            });
        }
    };

    handleDelete = async () => {
        // // console.log(this.state);
        const { dispatch } = this.props;
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length < 1) {
            return;
        }
        await dispatch({
            type: 'business/delMyCustomer',
            payload: {
                ids: selectedRowKeys,
            },
        });
        this.setState({ ...this.state, selectedRowKeys: [] });
    };

    handleSearch = e => {
        const { dispatch } = this.props;
        dispatch({
            type: 'business/getMyCustomer',
            payload: {
                search: e.target.value,
            },
        });
    };

    render() {
        const { currentUser = {}, unReadedNum } = this.props;
        const { unReaded } = this.state;

        const { lastLevel, role } = currentUser;
        return (
            <Layout>
                <Modal
                    title={`新增${lastLevel}`}
                    visible={this.state.userAddModal}
                    footer={false}
                    width="1200px"
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            userAddModal: false,
                        });
                    }}
                >
                    <UserInfoFrom onSumbit={this.handleSubmit} isAdd role={role} />
                </Modal>
                <Modal
                    visible={this.state.channelEmpowerModal}
                    footer={false}
                    width="1200px"
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            channelEmpowerModal: false,
                        });
                    }}
                >
                    <UserEmpower batch selectedRows={this.state.selectedRows} />
                </Modal>
                <Modal
                    title={`${lastLevel}订单管理${unReaded ? '(未查看)' : ''}`}
                    visible={this.state.userOrderModal}
                    footer={false}
                    width="1200px"
                    destroyOnClose
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            userOrderModal: false,
                        });
                    }}
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
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    userAddModal: true,
                                });
                            }}
                            style={{ margin: '0 50px' }}
                        >
                            {`新增${lastLevel}`}
                        </Button>
                        {/* <Button
                        type="primary"
                        shape="round"
                        style={{ margin: '0 50px' }}
                        onClick={() => {
                            this.setState({
                                ...this.state,
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
                                this.setState({
                                    ...this.state,
                                    userOrderModal: true,
                                    unReaded: false,
                                });
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {`${lastLevel}订单管理`}
                            {unReadedNum ? (
                                <Badge
                                    style={{ marginLeft: '8px' }}
                                    count={unReadedNum}
                                    onClick={e => {
                                        e.stopPropagation();
                                        this.setState({
                                            ...this.state,
                                            userOrderModal: true,
                                            unReaded: true,
                                        });
                                    }}
                                />
                            ) : null}
                        </Button>
                    </Flex>
                )}
                <Box p="20px">
                    <Flex justifyContent="space-between" p="30px 0">
                        <Flex alignItems="center">
                            <Popconfirm title="确认删除吗？" onConfirm={this.handleDelete}>
                                <Button
                                    disabled={this.state.selectedRowKeys.length < 1}
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
                                onSearch={this.handleSearch}
                            />
                        </Flex>
                        <Button
                            disabled={this.state.selectedRowKeys.length < 1}
                            type="primary"
                            onClick={() => {
                                this.props.dispatch({
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
                                this.setState({
                                    ...this.state,
                                    channelEmpowerModal: true,
                                });
                            }}
                        >
                            批量授权
                        </Button>
                    </Flex>

                    <UserListTable
                        updateSelectedRowKeys={this.updateSelectedRowKeys}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </Box>
            </Layout>
        );
    }
}

export default connect(({ user, business }) => ({ currentUser: user.info, unReadedNum: business.unReadedNum }))(Business);
