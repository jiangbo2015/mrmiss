import React from 'react';
import { Box } from 'rebass/styled-components';
import { Tabs } from 'antd';
import UserInfoFrom from '@/components/UserInfoFrom';

const { TabPane } = Tabs;

export default class Business extends React.Component {
    callback(key) {
        console.log(key);
    }
    render() {
        return (
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane
                    tab="我的信息
                "
                    key="1"
                >
                    <UserInfoFrom />
                </TabPane>
                <TabPane tab="我的定制订单" key="2">
                    Content of Tab Pane 2
                </TabPane>
                <TabPane tab="我的胶囊订单" key="3">
                    Content of Tab Pane 3
                </TabPane>
                <TabPane tab="我的网店订单" key="4">
                    Content of Tab Pane 4
                </TabPane>
            </Tabs>
        );
    }
}
