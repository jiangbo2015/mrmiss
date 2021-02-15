import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { Tabs, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import UserInfo from './components/UserInfo';
import Modal from '@/components/Modal';
import Layout from '@/components/Layout';
import SearchInput from '@/components/SearchInput';
import UserListTable from './components/UserListTable';
import UserInfoFrom from '@/components/UserInfoFrom';
import UserOrder from './components/UserOrder';
import ChannelEmpower from './components/ChannelEmpower';

export default class Business extends React.Component {
    state = {
        channelEmpowerModal: false,
        userOrderModal: false,
        userAddModal: false,
    };
    callback(key) {
        console.log(key);
    }
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
                    <UserInfoFrom />
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
                        <Button shape="circle" size="large" icon={<DeleteOutlined />} style={{ backgroundColor: '#D2D2D2' }} />
                        <SearchInput mode="white" placeholder="SEARCH" style={{ width: '200px', marginLeft: '30px' }} />
                    </Flex>
                    <UserListTable />
                </Box>
            </Layout>
        );
    }
}
