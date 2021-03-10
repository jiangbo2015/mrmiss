import React, { useState, useEffect } from 'react';
// import { Flex } from 'rebass/styled-components';
import { Button } from 'antd';
import Table from '@/components/Table';
// import Modal from '@/components/Modal';
import { Flex, Box } from 'rebass/styled-components';
// import IconDelete from '@/public/icons/icon-delete.svg';
import { connect } from 'dva';
import SearchInput from '@/components/SearchInput';
import { SaveOutlined } from '@ant-design/icons';

const UserListTable = ({ customerList = [], currentCustomer, dispatch, currentUser, onOk, selecteds = [] }) => {
    const [queryKey, setQueryKey] = useState('');
    const [selectRowKeys, setSelectRowKeys] = useState([]);
    const [findCustomerList, setFindCustomerList] = useState([]);
    const { lastLevel } = currentUser;
    useEffect(() => {
        if (queryKey) {
            if (onOk) {
                setFindCustomerList(customerList.filter(x => x.name.indexOf(queryKey) >= 0));
            } else {
                setFindCustomerList(customerList.filter(x => x.name.indexOf(queryKey) >= 0 && x._id !== currentCustomer._id));
            }
        } else {
            if (onOk) {
                setFindCustomerList(customerList);
            } else {
                setFindCustomerList(customerList.filter(x => x._id !== currentCustomer._id));
            }
        }
    }, [customerList, queryKey]);

    useEffect(() => {
        setSelectRowKeys(selecteds);
    }, []);

    const handleSearch = e => {
        setQueryKey(e.target.value);
    };
    const handleSave = () => {
        if (onOk) {
            onOk(selectRowKeys);
            return;
        }
        const { channels, goods, branchs, capsules, businessUserd, channelEmpowerUserd, innerDataUserd } = currentCustomer;
        dispatch({
            type: 'business/updateUsers',
            payload: {
                ids: selectRowKeys,
                channels,
                goods,
                branchs,
                capsules,
                businessUserd,
                channelEmpowerUserd,
                innerDataUserd,
            },
        });
    };
    const columns = [
        {
            title: `${lastLevel}名称`,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: `${lastLevel}税号`,
            dataIndex: 'VATNo',
            key: 'VATNo',
        },
    ];
    return (
        <Box>
            <Flex p="0 0 30px 0" alignItems="center" justifyContent="space-between">
                <SearchInput mode="white" placeholder="SEARCH" style={{ width: '200px' }} onSearch={handleSearch} />
                <Button
                    shape="circle"
                    icon={<SaveOutlined />}
                    style={{ backgroundColor: '#ffffff', borderColor: '#fff' }}
                    onClick={() => {
                        handleSave();
                    }}
                />
            </Flex>
            <Table
                columns={columns}
                dataSource={findCustomerList}
                rowKey={record => record._id}
                // selectRowKeys={selectRowKeys}
                rowSelection={{
                    type: 'checkbox',
                    onChange: selectedRowKeys => {
                        setSelectRowKeys(selectedRowKeys);
                        // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows:', selectedRows);
                    },
                    getCheckboxProps: record => {
                        console.log(record);
                        return {
                            disabled: record.name === 'Disabled User',
                            orderNo: record.orderNo,
                        };
                    },
                    selectedRowKeys: selectRowKeys,
                }}
            />
        </Box>
    );
};

export default connect(({ business = {}, user }) => {
    // console.log('props', props);
    return {
        currentCustomer: business.currentCustomer,
        customerList: business.customerList,
        currentUser: user.info,
    };
})(UserListTable);

// export default connect(({ usercenter }) => ({
//     orderList: usercenter.userOrder.diy,
// }))(OrderTable);
