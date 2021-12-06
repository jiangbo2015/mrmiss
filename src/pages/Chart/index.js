// import UserInfo from './components/UserInfo';
import Layout from '@/components/Layout';
import { Tabs } from 'antd';
import { useIntl } from 'umi';
import React from 'react';
import { Box } from 'rebass/styled-components';
import ChartCapsule from './ChartCapsule';
import ChartDiy from './ChartDiy';
import ChartShop from './ChartShop';
// import CapsuleOrder from './components/CapsuleOrder';
// import ShopOrder from './components/ShopOrder';

const { TabPane } = Tabs;

const Business = function() {
    const { formatMessage } = useIntl()
    return (
        <Layout>
            <Box
                mt="78px"
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
                    // onChange={this.callback}
                    tabBarStyle={{ background: '#FDDB3A', justifyContent: 'space-around' }}
                >
                    <TabPane tab={formatMessage({
                            id: 'e_shop_sales_report',
                            defaultMessage:  '网店销售数据',
                        })} key="1">
                        <ChartShop />
                    </TabPane>
                    <TabPane tab={formatMessage({
                            id: 'capsule_sales_report',
                            defaultMessage:  "胶囊销售数据",
                        })} key="2">
                        <ChartCapsule />
                    </TabPane>
                    <TabPane tab={formatMessage({
                            id: 'diy_sales_report',
                            defaultMessage:  "定制销售数据",
                        })} key="3">
                        <ChartDiy />
                    </TabPane>
                </Tabs>
            </Box>
        </Layout>
    );

}

export default Business