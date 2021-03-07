import React, { useEffect, useRef } from 'react';

import { Flex, Box, Image } from 'rebass/styled-components';
import { ReactSVG } from 'react-svg';
import CirCleArrow from '@/public/icons/circle_arrow.svg';
import IconPng from '@/public/icon.png';
// import styles from './index.less';

import Switcher from '@/components/Capsule/Switcher';

import { connect } from 'dva';

const ClassifyItem = ({ children, isSelected, ...props }) => (
    <div
        {...props}
        style={{
            padding: '0 11px',
            cursor: 'pointer',
            color: isSelected ? '#ffffff' : '#7B7B7B',
            // fontSize: isSelected ? '16px' : '12px',
            fontSize: '12px',
        }}
    >
        {children}
    </div>
);

const DiyHeader = ({ dispatch, goodsList = [], currentGood = {}, currentAdminChannel }) => {
    const ref = useRef(null);
    useEffect(() => {
        dispatch({
            type: 'diy/fetchGoodsList',
        });
    }, []);

    useEffect(() => {
        const { codename, styles = [], flowerColors = [], plainColors = [] } = currentAdminChannel;
        if (codename !== 'A') {
            console.log(currentAdminChannel);
            dispatch({
                type: 'diy/setCollocationPattern',
                payload: 'assign',
            });
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload: styles,
            });
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors, flowerColors },
            });
        } else {
            dispatch({
                type: 'diy/setCollocationPattern',
                payload: 'single',
            });
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: [], flowerColors: [] },
            });
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload: [],
            });
        }
    }, [currentAdminChannel]);

    useEffect(() => {
        if (goodsList.length > 0) {
            handleSelectGood(goodsList[0]);
        }
    }, [goodsList]);

    const handleSelectGood = good => {
        console.log('setCurrentGood');
        dispatch({
            type: 'diy/setCurrentGood',
            payload: good,
        });
    };

    const handleChangeStep = step => {
        const index = goodsList.findIndex(x => x._id === currentGood._id);
        if (index < 0) return;
        const objIndex = (index + step + goodsList.length) % goodsList.length;
        dispatch({
            type: 'diy/setCurrentGood',
            payload: goodsList[objIndex],
        });
    };

    // console.log(swiperRef);
    return (
        <Flex
            justifyContent="space-between"
            px="2.1%"
            sx={{
                marginTop: '74px',
                background: '#323232',
                // display: 'flex',
                width: '100%',
                height: '140px',
            }}
        >
            <Flex alignItems="center" width="256px">
                <Image width="240px" src={IconPng} />
            </Flex>
            <Flex pt="20px" flexDirection="column" alignItems="center">
                <Flex width="50px" justifyContent="space-between">
                    <ReactSVG
                        src={CirCleArrow}
                        style={{
                            width: '18px',
                            height: '18px',
                        }}
                        onClick={() => {
                            handleChangeStep(-1);
                        }}
                    />
                    <ReactSVG
                        src={CirCleArrow}
                        style={{
                            width: '18px',
                            height: '18px',
                            transform: 'rotateZ(180deg)',
                        }}
                        onClick={() => {
                            handleChangeStep(1);
                        }}
                    />
                </Flex>
                <Flex alignItems="center" pt="8px">
                    {goodsList.map(g => (
                        <ClassifyItem
                            isSelected={g._id === currentGood._id}
                            onClick={() => {
                                handleSelectGood(g);
                            }}
                        >
                            {g.name}
                        </ClassifyItem>
                    ))}
                </Flex>
            </Flex>
            <Box pt="44px">
                <Switcher ref={ref} assigned={currentGood} />
            </Box>
        </Flex>
    );
};

export default connect(({ diy = {}, channel = {} }) => ({
    goodsList: diy.goodsList,
    currentGood: diy.currentGood,
    currentAdminChannel: channel.currentAdminChannel,
}))(DiyHeader);
