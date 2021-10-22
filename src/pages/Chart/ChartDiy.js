import { connect } from 'dva';
import { useEffect, useCallback } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { OrderRank, StyleRank, UserRank, ColorRank, ImgRank } from './ChartLibary';
import Search from './Search';

const ChartDiy = ({ dispatch, diyData }) => {
    useEffect(() => {
        handleSearch();
    }, []);

    const handleSearch = useCallback(value => {
        console.log(value);
        dispatch({
            type: 'chart/getDiyData',
            payload: value,
        });
    }, []);

    return (
        <Box>
            <Search
                handleSearch={val => {
                    handleSearch(val);
                }}
            ></Search>
            <Flex>
                <Box width={1 / 2}>
                    <OrderRank data={diyData.orderRank}></OrderRank>
                </Box>
            </Flex>
            <Flex py="10px">
                <Box width={1 / 4} pl="20px">
                    <StyleRank data={diyData.styleRank}></StyleRank>
                </Box>
                <Box width={1 / 4} pl="20px">
                    <UserRank data={diyData.userRank}></UserRank>
                </Box>
                <Box width={1 / 4} pl="20px">
                    <ColorRank data={diyData.colorRank.color}></ColorRank>
                </Box>
                <Box width={1 / 4} pl="20px">
                    <ImgRank data={diyData.colorRank.img}></ImgRank>
                </Box>
            </Flex>
        </Box>
    );
};

export default connect(state => state.chart)(ChartDiy);
