import { Card,Radio } from 'antd';
import { OrderRank, StyleRank, UserRank } from './ChartLibary';

// import { Point, Tooltip, Axis } from 'bizcharts';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import Search from './Search';

const ChartShop = ({ dispatch, shopData }) => {
  
    const [userType, setUserType] = useState('amount')
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = value => {
        dispatch({
            type: 'chart/getShopData',
            payload: value,
        });
    };

    return (
        <Box>
            <Search handleSearch={handleSearch}></Search>
            <Box>
                <Box width={1}>
                    <OrderRank data={shopData.orderRank}></OrderRank>
                    {/* <Card title="历史对比图" style={{ marginTop: '20px' }}>
                        <Chart height={300} autoFit data={data2}>
                            <Interval position="year*sales" />
                        </Chart>
                    </Card> */}
                </Box>
                <Flex py='10px'>
                    <Box width={0.5} pr='10px'>
                        <StyleRank data={shopData.styleRank}></StyleRank>
                    </Box>
                    <Box width={0.5} pl="10px">
                        <UserRank data={shopData.userRank} user={userType} onChange={setUserType}></UserRank>
                    </Box>
                </Flex>

            </Box>
        </Box>
    );
};

export default connect(state => state.chart)(ChartShop);
