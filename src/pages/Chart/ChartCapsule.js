import { connect } from 'dva';
import { useEffect } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { OrderRank, StyleRank, UserRank } from './ChartShop';
import Search from './Search';

const ChartCom = ({ dispatch, capsuleData }) => {
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = value => {
        // console.log(value);
        dispatch({
            type: 'chart/getCapsuleData',
            payload: value,
        });
    };

    return (
        <Box>
            <Search handleSearch={handleSearch}></Search>

            <Flex>
                <Box width={1 / 2}>
                    <OrderRank data={capsuleData.orderRank}></OrderRank>
                </Box>

                <Box width={1 / 4} pl="20px">
                    <StyleRank data={capsuleData.styleRank}></StyleRank>
                </Box>
                <Box width={1 / 4} pl="20px">
                    <UserRank data={capsuleData.userRank}></UserRank>
                </Box>
            </Flex>
        </Box>
    );
};

export default connect(state => state.chart)(ChartCom);
