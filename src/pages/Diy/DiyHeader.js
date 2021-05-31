import React, { useEffect, useRef,useState } from 'react';

import { Flex, Box, Image } from 'rebass/styled-components';
import { ReactSVG } from 'react-svg';
import CirCleArrow from '@/public/icons/circle_arrow.svg';
import IconPng from '@/public/icon.png';
// import styles from './index.less';
import { InputGray } from '@/components/Input';

import Switcher from '@/components/Capsule/SwitcherDIY';

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
    const [curABC, setCurABC] = useState('A');
    const [remarkVal, setRemarkVal] = useState('');
    
    const inputRef = useRef();
    useEffect(() => {
        dispatch({
            type: 'diy/fetchGoodsList',
        });
    }, []);

    useEffect(() => {
        console.log('codename', codename)
        const { codename, styles = [], flowerColors = [], plainColors = [] } = currentAdminChannel;
        if (curABC !== 'A') {
            setRemarkVal(currentAdminChannel.remark)
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
                payload: 'multiple',
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
    }, [currentAdminChannel,curABC]);

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

    const handleUpdateRemarks = val => {
        dispatch({
            type: 'channel/update',
            payload: { remark: val, codename: curABC, assignedId: currentGood._id },
        });
    };

    return (
        <Flex
            justifyContent="space-between"
            alignItems='center'
            px="2.1%"
            sx={{
                marginTop: '74px',
                background: '#323232',
                // display: 'flex',
                width: '100%',
                height: '58px',
                position: 'relative'
            }}
        >
            <Flex alignItems="center">

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


                <Flex alignItems="center">
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
            <Box style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            // color: headerBgColor !== '#fff' ? '#fff' :'#000',
                            transform: 'translate(-50%, -50%)',
                        }}>
                <Switcher ref={ref} assigned={currentGood} setCurABC={setCurABC} curABC={curABC}/>
            </Box>
            <Box>
                {curABC !== 'A' ? (
                    <Flex >
                        <Flex bg="#BBBBBB" width="76px" fontSize="10px" p="6px 14px">
                            通道备注
                        </Flex>
                        <InputGray
                            style={{ width: '200px', color: '#767676' }}
                            placeholder="10字以内"
                            // defaultVaule={}
                            ref={inputRef}
                            value={remarkVal}
                            onChange={(e) => {
                                setRemarkVal(e.target.value)
                            }}
                            onBlur={e => {
                                if (handleUpdateRemarks) {
                                    handleUpdateRemarks(remarkVal);
                                }
                            }}
                            maxLength={10}
                        />
                    </Flex>
                ) : null}
            </Box>
        </Flex>
    );
};

export default connect(({ diy = {}, channel = {} }) => ({
    goodsList: diy.goodsList,
    currentGood: diy.currentGood,
    currentAdminChannel: channel.currentAdminChannel,
}))(DiyHeader);
