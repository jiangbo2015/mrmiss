import React from 'react';
import { Box } from 'rebass/styled-components';
import { Tabs } from 'antd';
import UserInfo from './components/UserInfo';
import OrderDownload from '@/components/OrderDownload';
import DIYOrder from './components/DIYOrder';
import CapsuleOrder from './components/CapsuleOrder';
import ShopOrder from './components/ShopOrder';

const { TabPane } = Tabs;

export default class Business extends React.Component {
    state = {
        downloadOrder: {},
    };
    callback() {}
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        console.log('getDerivedStateFromError', error);
        return { hasError: true };
    }

    handleDownloadOrder(order) {
        this.setState({
            downloadOrder: order,
        });
    }
    render() {
        console.log(this.props);
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
                {this.state.downloadOrder._id ? (
                    <OrderDownload
                        onClose={() => {
                            this.setState({
                                downloadOrder: {},
                            });
                        }}
                    />
                ) : null}
                <Tabs
                    activeKey={`${this.props.activeKey}`}
                    onChange={key => {
                        this.props.changeActiveKey(key);
                    }}
                    tabBarStyle={{ background: '#FDDB3A', justifyContent: 'space-around' }}
                >
                    <TabPane
                        tab="我的信息
                "
                        key={1}
                        style={{ padding: '40px' }}
                    >
                        <UserInfo />
                    </TabPane>
                    <TabPane tab="我的定制订单" key={2}>
                        <DIYOrder onDownloadOrder={this.handleDownloadOrder.bind(this)} />
                    </TabPane>
                    <TabPane tab="我的胶囊订单" key={3}>
                        <CapsuleOrder onDownloadOrder={this.handleDownloadOrder.bind(this)} />
                    </TabPane>
                    <TabPane tab="我的网店订单" key={4}>
                        <ShopOrder onDownloadOrder={this.handleDownloadOrder.bind(this)} />
                    </TabPane>
                </Tabs>
            </Box>
        );
    }
}
