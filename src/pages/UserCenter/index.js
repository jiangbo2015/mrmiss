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
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane
                    tab="我的信息
                "
                    key="1"
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
        );
    }
}
