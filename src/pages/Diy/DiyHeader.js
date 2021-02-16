import React, { useEffect, useRef } from 'react';

import { Flex, Box } from 'rebass/styled-components';
import { ReactSVG } from 'react-svg';
import CirCleArrow from '@/public/icons/circle_arrow.svg';
import styles from './index.less';

import Switcher from '@/components/Capsule/Switcher';

import { connect } from 'dva';

const ClassifyItem = ({ children, isSelected, ...props }) => (
    <div
        {...props}
        style={{
            padding: '0 11px',
            cursor: 'pointer',
            color: isSelected ? '#ffffff' : '#7B7B7B',
            fontSize: isSelected ? '16px' : '12px',
        }}
    >
        {children}
    </div>
);

const DiyHeader = ({ dispatch, goodsList = [], currentGood = {} }) => {
    const ref = useRef(null);
    useEffect(() => {
        dispatch({
            type: 'diy/fetchGoodsList',
        });
    }, []);

    useEffect(() => {
        if (goodsList.length > 0) {
            handleSelectGood(goodsList[Math.floor(goodsList.length / 2)]);
        }
    }, [goodsList]);

    const handleSelectGood = good => {
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
            sx={{
                marginTop: '74px',
                background: '#323232',
                // display: 'flex',
                width: '100%',
                height: '140px',
            }}
            px="35px"
        >
            <Box />
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

export default connect(({ diy = {} }) => ({ goodsList: diy.goodsList, currentGood: diy.currentGood }))(DiyHeader);
