import React from 'react';
import { Flex, Box } from 'rebass/styled-components';
import { Tabs, Button } from 'antd';
import UserInfo from './components/UserInfo';
import Layout from '@/components/Layout';
import UserListTable from './components/UserListTable';

export default class Business extends React.Component {
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <Layout>
                <Box height="116px" width={[1]} bg="#FDDB3B" mt="74px" />
                <Flex
                    alignItems="center"
                    justifyContent="center"
                    height="84px"
                    bg="#41444B"
                >
                    <Button type="primary">新增客户</Button>
                    <Button>通道权限管理</Button>
                    <Button>客户订单管理</Button>
                </Flex>
                <Box p="20px">
                    <UserListTable />
                </Box>
            </Layout>
        );
    }
}
