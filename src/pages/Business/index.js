import Layout from '@/components/Layout';
import Modal from '@/components/Modal';
import SearchInput from '@/components/SearchInput';
import UserInfoFrom from '@/components/UserInfoFrom';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import { connect } from 'dva';
import React from 'react';
import { Box, Flex } from 'rebass/styled-components';
import UserListTable from './components/UserListTable';
import UserOrder from './components/UserOrder';

class Business extends React.Component {
    state = {
        channelEmpowerModal: false,
        userOrderModal: false,
        userAddModal: false,
        selectedRowKeys: [],
    };
    callback(key) {
        console.log(key);
    }

    updateSelectedRowKeys = selectedRowKeys => {
        this.setState({
            selectedRowKeys,
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

    handleDelete = () => {
        console.log(this.state);
        const { dispatch } = this.props;
        const { selectedRowKeys } = this.state;
        if (selectedRowKeys.length < 1) {
            return;
        }
        dispatch({
            type: 'business/delMyCustomer',
            payload: {
                ids: selectedRowKeys,
            },
        });
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
        return (
            <Layout>
                <Modal
                    title="新增客户"
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
                    <UserInfoFrom onSumbit={this.handleSubmit} isAdd />
                </Modal>
                {/* <Modal
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
                    <ChannelEmpower />
                </Modal> */}
                <Modal
                    title="客户订单管理"
                    visible={this.state.userOrderModal}
                    footer={false}
                    width="1200px"
                    onCancel={() => {
                        this.setState({
                            ...this.state,
                            userOrderModal: false,
                        });
                    }}
                >
                    <UserOrder />
                </Modal>
                <Box height="116px" width={[1]} bg="#FDDB3B" mt="74px" />

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
                        新增客户
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
                            });
                        }}
                    >
                        客户订单管理
                    </Button>
                </Flex>
                <Box p="20px">
                    <Flex p="30px 0" alignItems="center">
                        <Popconfirm title="确认删除吗？" onConfirm={this.handleDelete}>
                            <Button
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
                    <UserListTable
                        updateSelectedRowKeys={this.updateSelectedRowKeys}
                        selectedRowKeys={this.state.selectedRowKeys}
                    />
                </Box>
            </Layout>
        );
    }
}

export default connect()(Business);
