import { connect } from 'dva';
import { useIntl } from 'umi';
import { useEffect, useCallback } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import { OrderRank, StyleRank, UserRank, ColorRank, ImgRank } from './ChartLibary';
import Search from './Search';

const ChartDiy = ({ dispatch, diyData }) => {
    const { formatMessage } = useIntl()
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
        <Box px='24px' py='10px'>
            <Search
                handleSearch={val => {
                    handleSearch(val);
                }}
            />
            <Flex>
                <Box width={1}>
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
