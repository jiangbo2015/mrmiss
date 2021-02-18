import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import { ReactSVG } from 'react-svg';
import { LockOutlined, UnlockOutlined, SaveOutlined, CopyOutlined } from '@ant-design/icons';
import { Flex, Box } from 'rebass/styled-components';
import { connect } from 'dva';

import Table from '@/components/Table';
import Switch from '@/components/Switch';
import Modal from '@/components/Modal';
import Select2 from '@/components/Select/Select2';
// import ABC from '@/components/Capsule/ABC';
import IconEmpower from '@/public/icons/icon-empower.svg';
import IconUserSign from '@/public/icons/icon-usersign.svg';

import UserListMinTable from './UserListMinTable';

const keyRows = {
    diy: 0,
    capsule: 1,
    shop: 2,
    channelEmpowerUserd: 3,
    innerDataUserd: 4,
    businessUserd: 5,
};

const UserListTable = ({
    dispatch,
    selectedRows = [],
    currentCustomer,
    branchList,
    myAdminChannelList,
    goodsList,
    capsuleList,
    batch,
    currentUser,
}) => {
    const [copiedUserModal, setCopiedUserModal] = useState(false);
    const [clocked, setClocked] = useState(true);
    const [tableData, setTableData] = useState([]);
    const { lastLevel } = currentUser;
    useEffect(() => {
        dispatch({
            type: 'channel/fetchMyAdminChannelList',
        });
        dispatch({
            type: 'shop/fetchBranchList',
        });
        dispatch({
            type: 'diy/fetchGoodsList',
        });
        dispatch({
            type: 'capsule/fetchCapsuleList',
        });
    }, []);
    useEffect(() => {
        let baseData = [
            {
                name: 'DIY 搭配',
                key: 'diy',
            },
            {
                key: 'capsule',
                name: '胶囊产品系列',
            },
            {
                key: 'shop',
                name: '现货购买',
            },
            {
                key: 'channelEmpowerUserd',
                name: '通道分配器的使用授权',
                empowered: currentCustomer.channelEmpowerUserd,
            },
            {
                key: 'innerDataUserd',
                name: '内部数据分析的使用权限',
                empowered: currentCustomer.innerDataUserd,
            },
            { key: 'businessUserd', name: '业务管理的使用权限', empowered: currentCustomer.businessUserd },
        ];
        baseData[0].goodsInfo = goodsList.map((g, i) => {
            let findChannel = currentCustomer.channels.find(x => x.assignedId === g._id);
            let findGood = currentCustomer.goods.find(x => x === g._id);
            return {
                _id: g._id,
                row: i,
                name: g.name,
                aliasName: g.aliasName,
                channel: findChannel ? findChannel.codename : '',
                channelInfo: getChannelInfo(findChannel ? findChannel : {}),
                empowered: findGood ? true : false,
            };
        });
        baseData[1].goodsInfo = capsuleList.map((g, i) => {
            const findChannel = currentCustomer.channels.find(x => x.assignedId === g._id);
            const findCapsule = currentCustomer.capsules.find(x => x === g._id);
            return {
                _id: g._id,
                row: i,
                name: g.namecn,
                aliasName: g.aliasName,
                channel: findChannel ? findChannel.codename : '',
                channelInfo: getChannelInfo(findChannel ? findChannel : {}),
                empowered: findCapsule ? true : false,
            };
        });
        baseData[2].goodsInfo = branchList.map((g, i) => {
            const findChannel = currentCustomer.channels.find(x => x.assignedId === g._id);
            const findBranch = currentCustomer.branchs.find(x => x === g._id);
            return {
                _id: g._id,
                row: i,
                name: g.namecn,
                aliasName: g.aliasName,
                channel: findChannel ? findChannel.codename : '',
                channelInfo: getChannelInfo(findChannel ? findChannel : {}),
                empowered: findBranch ? true : false,
            };
        });
        setTableData(baseData);
    }, [currentCustomer, branchList, myAdminChannelList, goodsList, capsuleList]);

    const handleChangeUserEmpower = key => {
        tableData[keyRows[key]].empowered = !tableData[keyRows[key]].empowered;
        setTableData([...tableData]);
    };

    const handleChangeUserChannel = (key, row, val) => {
        // console.log(row);
        tableData[keyRows[key]].goodsInfo[row].channel = val;
        tableData[keyRows[key]].goodsInfo[row].channelInfo = getChannelInfo({
            codename: val,
            assignedId: tableData[keyRows[key]].goodsInfo[row]._id,
        });
        setTableData([...tableData]);
    };

    const handleChangeUserGoodsEmpower = (key, row, val) => {
        // console.log(row);
        tableData[keyRows[key]].goodsInfo[row].empowered = val;
        setTableData([...tableData]);
    };

    const getChannelInfo = ({ codename, assignedId }) => {
        const finded = myAdminChannelList.find(x => x.codename === codename && x.assignedId === assignedId);
        return finded ? finded.remark : '';
    };

    const getAssignedData = () => {
        let infos = { channels: [] };
        tableData.map((t, i) => {
            if (t.goodsInfo) {
                t.goodsInfo.map(g => {
                    if (g.channel) {
                        infos.channels.push({
                            codename: g.channel,
                            assignedId: g._id,
                        });
                    }
                });
            }
            switch (t.key) {
                case 'diy':
                    {
                        infos.goods = t.goodsInfo.filter(g => g.empowered).map(g => g._id);
                    }
                    break;
                case 'capsule':
                    {
                        infos.capsules = t.goodsInfo.filter(g => g.empowered).map(g => g._id);
                    }
                    break;
                case 'shop':
                    {
                        infos.branchs = t.goodsInfo.filter(g => g.empowered).map(g => g._id);
                    }
                    break;
                default: {
                    infos[t.key] = t.empowered;
                }
            }
        });
        return infos;
    };

    const handleSave = async () => {
        // console.log(row);
        const infos = getAssignedData();
        if (batch) {
            await dispatch({
                type: 'business/updateUsers',
                payload: {
                    ids: selectedRows.map(x => x._id),
                    ...infos,
                },
            });
        } else {
            await dispatch({
                type: 'user/update',
                payload: {
                    _id: currentCustomer._id,
                    ...infos,
                },
            });
        }

        message.info('保存成功');
    };

    const columns = [
        {
            title: '产品类别',
            dataIndex: 'name',
            key: 'name',
            width: 200,
        },
        {
            title: '所在通道',
            dataIndex: 'channel',
            key: 'channel',
            width: 200,
        },
        {
            title: '授权',
            dataIndex: 'empowered',
            key: 'empowered',
            width: 200,
            render: (val, record) => {
                return val === undefined ? null : (
                    <Switch
                        disabled={clocked}
                        checked={val}
                        onClick={() => {
                            handleChangeUserEmpower(record.key);
                        }}
                    />
                );
            },
        },
        {
            title: '通道备注',
            dataIndex: 'channelInfo',
            key: 'channelInfo',
        },
    ];

    const expandedRowRender = (rowData, row) => {
        const expandedColumns = [
            {
                title: '产品类别',
                dataIndex: 'name',
                key: 'name',
                width: 200,
            },
            {
                title: '所在通道',
                dataIndex: 'channel',
                key: 'channel',
                width: 200,
                render: (val, record) => (
                    <Select2
                        disabled={clocked}
                        options={[
                            { label: 'A', value: 'A' },
                            { label: 'B', value: 'B' },
                            { label: 'C', value: 'C' },
                            { label: 'D', value: 'D' },
                            { label: 'E', value: 'E' },
                            { label: 'F', value: 'F' },
                            { label: 'G', value: 'G' },
                            { label: 'H', value: 'H' },
                            { label: 'I', value: 'I' },
                            { label: 'J', value: 'J' },
                        ]}
                        value={val}
                        onChange={value => {
                            handleChangeUserChannel(rowData.key, record.row, value);
                        }}
                    />
                ),
            },
            {
                title: '授权',
                dataIndex: 'empowered',
                key: 'empowered',
                width: 200,
                render: (val, record) => {
                    return val === undefined ? null : (
                        <Switch
                            disabled={clocked}
                            checked={val}
                            onClick={() => {
                                handleChangeUserGoodsEmpower(rowData.key, record.row, !val);
                            }}
                        />
                    );
                },
            },
            {
                title: '通道备注',
                dataIndex: 'channelInfo',
                key: 'channelInfo',
            },
        ];
        // if (!rowData.goodsInfo) return null;
        return (
            <Table showHeader={false} columns={expandedColumns} dataSource={rowData.goodsInfo} rowKey={record => record._id} />
        );
    };

    return (
        <Box>
            <Modal
                className="mm-yellow-modal"
                footer={false}
                visible={copiedUserModal}
                title={
                    <Flex bg="#FDDB3A" width={1} justifyContent="center">
                        <ReactSVG src={IconUserSign} style={{ width: '24px', paddingRight: '4px' }} />
                    </Flex>
                }
                bodyStyle={{
                    backgroundColor: '#F0F0F0',
                }}
                onCancel={() => {
                    setCopiedUserModal(false);
                }}
                width="600px"
            >
                <UserListMinTable />
            </Modal>
            <Flex p="16px" justifyContent="center" alignItems="center" flexDirection={batch ? 'column' : 'row'}>
                <ReactSVG style={{ width: '40px', height: '40px' }} src={IconEmpower} />

                <Box p="0 20px">
                    {lastLevel}名称：
                    {batch ? selectedRows.map(x => x.name).join('、') : currentCustomer.name}
                </Box>
                {batch ? null : (
                    <Box>
                        {lastLevel}税号：{currentCustomer.VATNo}
                    </Box>
                )}
            </Flex>
            <Flex p="16px">
                <Button
                    shape="circle"
                    size="large"
                    icon={clocked ? <LockOutlined /> : <UnlockOutlined />}
                    style={{ backgroundColor: '#D2D2D2' }}
                    onClick={() => {
                        setClocked(!clocked);
                    }}
                />
                <Button
                    shape="circle"
                    size="large"
                    disabled={clocked}
                    icon={<SaveOutlined />}
                    style={{
                        backgroundColor: '#D2D2D2',
                        margin: '0 50px 0 20px',
                    }}
                    onClick={handleSave}
                />
                {batch ? null : (
                    <Button
                        shape="circle"
                        size="large"
                        disabled={clocked}
                        icon={<CopyOutlined />}
                        style={{ backgroundColor: '#D2D2D2' }}
                        onClick={() => {
                            setCopiedUserModal(true);
                        }}
                    />
                )}
            </Flex>

            <Table
                columns={columns}
                dataSource={tableData}
                rowKey={record => record.key}
                rowClassName="parent-row"
                expandable={{
                    expandedRowRender,
                    defaultExpandedRowKeys: ['diy', 'capsule', 'shop'],
                    rowExpandable: record => record.goodsInfo,
                }}
            />
        </Box>
    );
};

export default connect(({ business = {}, shop, capsule, diy, channel, user }) => {
    // console.log('props', props);
    return {
        currentCustomer: business.currentCustomer,
        currentCustomerEmpowerInfo: business.currentCustomerEmpowerInfo,
        branchList: shop.branchList,
        capsuleList: capsule.capsuleList,
        goodsList: diy.goodsList,
        myAdminChannelList: channel.myAdminChannelList,
        currentUser: user.info,
    };
})(UserListTable);
