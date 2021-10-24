import { connect } from 'dva';
import { useEffect, useCallback } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { OrderRank, StyleRank, UserRank, CapsuleRank } from './ChartLibary';
import Search from './Search';

const ChartCom = ({ dispatch, capsuleData }) => {
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = useCallback(value => {
        // console.log(value);
        dispatch({
            type: 'chart/getCapsuleData',
            payload: value,
        });
    }, []);

    return (
        <Box px='24px' py='10px'>
            <Search handleSearch={handleSearch}></Search>

            <Flex>
                <Box width={1}>
                    <OrderRank data={capsuleData.orderRank}></OrderRank>
                    
                </Box>
            </Flex>
            <Flex pt='20px'>
            <Box width={1 / 3} pr="10px">
                    <StyleRank data={capsuleData.styleRank}></StyleRank>
                </Box>
                <Box width={1 / 3} pr="10px">
                    <UserRank data={capsuleData.userRank}></UserRank>
                </Box>
                <Box width={1 / 3} >
                        <CapsuleRank data={capsuleData.capsuleRank}></CapsuleRank>
                    </Box>
            </Flex>

        </Box>
    );
};

export default connect(state => state.chart)(ChartCom);
