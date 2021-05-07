import temp from '@/public/temp.jpg';
import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text } from 'rebass/styled-components';
import Dot from './Dot';
import { InputNumber } from 'antd';
import { ReactSVG } from 'react-svg';
import { filterImageUrl } from '@/utils/helper';
import SelectedIcon from '@/public/icons/icon-selected-black.svg';

// 胶囊组件
export default ({ handleOpen, item, showNum, bg='#F7F7F7', curChannelPrice, onEditPrice, isSelect, onSelect = () => {} }) => {
    const { colorWithStyleImgs = [], code, price } = item;
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        setCurrent(0);
    }, [colorWithStyleImgs]);
    return (
        <Box
            p="8px"
            width={[1, 0.32]}
            onClick={handleOpen}
            css={{
                border: '1px solid transparent',
                borderRadius: '10px',
                cursor: 'pointer',
                borderColor: isSelect ? '#4B4B4B' : 'transparent',
                '&:hover': {
                    borderColor: '#4B4B4B',
                },
            }}
        >
            <Box p="30px" bg={bg} css={{ borderRadius: '10px', position: 'relative' }}>
                <ReactSVG
                    src={SelectedIcon}
                    style={{
                        width: '16px',
                        height: '16px',
                        opacity: isSelect ? '1' : '0.3',
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                    }}
                    onClick={e => {
                        e.stopPropagation();
                        onSelect(item);
                    }}
                />
                <Flex justifyContent="center" height="200px" alignItems="center" flexDirection="column">
                    <Image width="100px" src={filterImageUrl(colorWithStyleImgs[current].imgs[0])} mx="auto" />
                </Flex>

                <Box
                    css={{ fontSize: '12px' }}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    <Text fontSize="16px">{showNum} PCS</Text>
                    <Text mt="5px">Ref.{item.code}</Text>
                    <Text mt="5px">Size.{item.size}</Text>
                    <Flex css={{ position: 'relative' }} mt="14px" justifyContent="center" alignItems="center">
                        {onEditPrice ? (
                            <InputNumber
                                formatter={value => `¥${value}`}
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                }}
                                value={curChannelPrice}
                                onChange={value => {
                                    onEditPrice({ style: item._id, price: value });
                                }}
                            />
                        ) : (
                            <Text
                                css={{
                                    position: 'absolute',
                                    left: 0,
                                }}
                                fontSize="22px"
                            >
                                ¥{curChannelPrice}
                            </Text>
                        )}

                        {/* 底部小圆点，可以传图片或者背景，具体看组件用法 */}
                        {colorWithStyleImgs.map((c = {}, i) => {
                            // const { colorObj = {} } = c;
                            // const { value } = colorObj;
                            // console.log('colorObj', value);
                            return (
                                <Dot
                                    size="20px"
                                    onClick={e => {
                                        e.stopPropagation();
                                        setCurrent(i);
                                    }}
                                    isSelect={current === i}
                                    src={c.colorObj.type ? filterImageUrl(c.colorObj.value) : ''}
                                    bg={c.colorObj.type ? false : c.colorObj.value}
                                    key={c._id}
                                />
                            );
                        })}
                        {/* {new Array(3).fill(0).map((x, i) => (
                            <Dot src={temp} key={i}></Dot>
                        ))} */}
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
};
