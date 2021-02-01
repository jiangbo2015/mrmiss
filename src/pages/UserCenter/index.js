import React from 'react';
import { Box } from 'rebass/styled-components';
import { Tabs } from 'antd';
import UserInfo from './components/UserInfo';
import DIYOrder from './components/DIYOrder';
import CapsuleOrder from './components/CapsuleOrder';
import ShopOrder from './components/ShopOrder';

const { TabPane } = Tabs;

export default class Business extends React.Component {
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <Box
                width={1}
                sx={{
                    '.ant-tabs-nav-list': {
                        width: '100%',
                    },
                    '.ant-tabs-tab': {
                        width: '50%',
                        textAlign: 'center',
                        margin: 0,
                        justifyContent: 'center',
                    },

                    '.ant-tabs-content-holder': {
                        padding: '0 12px',
                    },
                }}
            >
                <Tabs
                    defaultActiveKey="1"
                    onChange={this.callback}
                    tabBarStyle={{ background: '#FDDB3A', justifyContent: 'space-around' }}
                >
                    <TabPane
                        tab="我的信息
                "
                        key="1"
                        style={{ padding: '40px' }}
                    >
                        <UserInfo />
                    </TabPane>
                    <TabPane tab="我的定制订单" key="2">
                        <DIYOrder />
                    </TabPane>
                    <TabPane tab="我的胶囊订单" key="3">
                        <CapsuleOrder />
                    </TabPane>
                    <TabPane tab="我的网店订单" key="4">
                        <ShopOrder />
                    </TabPane>
                </Tabs>
            </Box>
        );
    }
}
