import React,{useState} from 'react';
import { Box } from 'rebass/styled-components';
import { Tabs } from 'antd';
import UserInfo from './components/UserInfo';
import DCOrderEditor from './components/DC-OrderDetail';
import SOrderEditor from './components/S-OrderDetail';
import OrderDownload from '@/components/OrderDownload';
import DIYOrder from './components/DIYOrder';
import CapsuleOrder from './components/CapsuleOrder';
import ShopOrder from './components/ShopOrder';
import { connect } from 'dva';
import { useIntl } from 'umi';

const { TabPane } = Tabs;

const UserCenter = function(props) {
    const [downloadOrder, setDownloadOrder] = useState({})
    const [showDetailOrder, setShowDetailOrder] = useState(false)
    const [showShopDetailOrder, setShowShopDetailOrder] = useState(false)
    const intl = useIntl()

    const handleDownloadOrder = (order) => {
        props.dispatch({
            type: 'usercenter/downloadOrder',
            payload: order,
        });
    }


    const handleShowOrderDetail = async (record) => {
        await props.dispatch({
            type: 'usercenter/createCurrentOrderToGroupList',
            payload: record,
        });
        this.setState({
            ...this.state,
            showDetailOrder: true
        })
    };

    const handleShowShopOrderDetail = async (record) => {
        await props.dispatch({
            type: 'usercenter/createCurrentShopOrderToGroupList',
            payload: record,
        });
        this.setState({
            ...this.state,
            showShopDetailOrder: true
        })
    };

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
            <DCOrderEditor
                visible={showDetailOrder}
                onCancel={() => {
                    setShowDetailOrder(false)
                }}
            />
            <SOrderEditor
                visible={showShopDetailOrder}
                onCancel={() => {
                    // setShowShopDetailOrder(false)
                    setShowShopDetailOrder(false)
                }}
            />
            {downloadOrder._id ? (
                <OrderDownload
                    onClose={() => {
                        setDownloadOrder({})
                    }}
                />
            ) : null}
            <Tabs
                activeKey={`${props.activeKey}`}
                onChange={key => {
                    props.changeActiveKey(key);
                }}
                tabBarStyle={{ background: '#FDDB3A', justifyContent: 'space-around' }}
            >
                <TabPane
                    tab={intl.formatMessage({
                        id: 'my_data',
                        defaultMessage: '我的信息',
                    })}
                    key={1}
                    style={{ padding: '40px' }}
                >
                    <UserInfo />
                </TabPane>
                <TabPane tab={intl.formatMessage({
                id: 'my_diy_order',
                defaultMessage: '我的定制订单',
            })} key={2}>
                    <DIYOrder 
                        onDownloadOrder={handleDownloadOrder} 
                        onShowDetail={handleShowOrderDetail}
                    />
                </TabPane>
                <TabPane tab={intl.formatMessage({
                id: 'my_capsule_order',
                defaultMessage: '我的胶囊订单',
            })} key={3}>
                    <CapsuleOrder 
                        onDownloadOrder={handleDownloadOrder} 
                        onShowDetail={handleShowOrderDetail}
                    />
                </TabPane>
                <TabPane tab={intl.formatMessage({
                    id: 'my_shop_order',
                    defaultMessage: '我的网店订单',
                })} key={4}>
                    <ShopOrder 
                        onDownloadOrder={handleDownloadOrder}
                        onShowDetail={handleShowShopOrderDetail}
                    />
                </TabPane>
            </Tabs>
        </Box>
    );
    
}

// export default UserCenter;

export default connect(() => {})(UserCenter);
