import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { Popover, Input } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import SelectedIcon from '@/public/icons/icon-selected-black.svg';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import InputNumber from '@/components/InputNumber';
import StyleItem from '@/components/StyleItem';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Info from '../components/Info';

import IconBackageInfo from '@/public/icons/backage-info.svg';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `${grid}px`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : '',

    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '100%',
    margin: '0',
    display: 'flex',
    overflowX: 'scroll',
    background: '#F8F8F8',
    border: '1px solid #161616',
});

const App = ({ favoriteToOrderGroupList, dispatch, visible, onCancel }) => {
    const [sourceData, setSourceData] = useState([]);
    const [countInfos, setCountInfos] = useState({});
    const [singleTotalInfos, setSingleTotalInfos] = useState({});
    const [parteInfos, setParteInfos] = useState({});
    useEffect(() => {
        setSourceData(favoriteToOrderGroupList);
    }, [favoriteToOrderGroupList]);
    // useEffect(() => {
    //     console.log('----sourceData----', sourceData);
    // }, [sourceData]);
    useEffect(() => {
        Object.keys(parteInfos).map(row => {
            let rowParte = parteInfos[row];
            if (!countInfos[row]) return;
            let sum = 0;
            for (var key in rowParte) {
                if (!countInfos[row][key]) return;
                let parte = rowParte[key];
                sum += lodash.sum(Object.values(countInfos[row][key])) * parte;
            }

            singleTotalInfos[row] = sum;
            setSingleTotalInfos({ ...singleTotalInfos });
        });
    }, [countInfos, parteInfos]);

    function onDragEnd(result) {
        const { source, destination } = result;
        const sInd = +source.droppableId;

        // dropped outside the list
        if (!destination) {
            const sourceClone = Array.from(sourceData[sInd].list);
            const [removed] = sourceClone.splice(source.index, 1);
            sourceData[sInd].list = sourceClone;

            const newKey = removed.styleAndColor
                .map(sc => sc.styleId)
                .join('-');
            console.log('removed', removed);
            setSourceData([
                ...sourceData,
                {
                    key: newKey,
                    list: [removed],
                    sizes: ['S', 'M', 'L'],
                },
            ]);
            return;
        }
        const dInd = +destination.droppableId;
        if (sInd === dInd) {
            console.log('sInd', sInd);
            console.log('sourceData', sourceData);
            const items = reorder(
                sourceData[sInd].list,
                source.index,
                destination.index,
            );
            const newState = [...sourceData];
            newState[sInd] = { ...sourceData[sInd], list: items };
            setSourceData(newState);
        } else if (sourceData[sInd].key === sourceData[dInd].key) {
            const result = move(
                sourceData[sInd].list,
                sourceData[dInd].list,
                source,
                destination,
            );
            const newState = [...sourceData];
            newState[sInd].list = result[sInd];
            newState[dInd].list = result[dInd];

            setSourceData(newState.filter(group => group.list.length));
        }
    }

    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            width={'100%'}
            style={{ padding: 0 }}
            bodyStyle={{ padding: 0, paddingTop: '24px' }}
            footer={null}
            title="订单制作器"
        >
            <DragDropContext onDragEnd={onDragEnd}>
                {sourceData.map((el, ind) => {
                    let currentRowCountInfo = countInfos[ind]
                        ? countInfos[ind]
                        : {};
                    let currentRowParteInfo = parteInfos[ind]
                        ? parteInfos[ind]
                        : {};
                    // console.log('currentCountInfo', currentCountInfo);
                    return (
                        <Flex alignItems="center" m="0px 24px">
                            <ReactSVG
                                src={SelectedIcon}
                                style={{ width: '20px', height: '20px' }}
                            />
                            <Box
                                m="10px"
                                width="100%"
                                sx={{ position: 'relative' }}
                            >
                                <Popover
                                    content={
                                        <Box>
                                            <Input />
                                        </Box>
                                    }
                                >
                                    <ReactSVG
                                        src={IconBackageInfo}
                                        style={{
                                            width: '18px',
                                            height: '18px',
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                        }}
                                    />
                                </Popover>

                                <Droppable
                                    key={ind}
                                    droppableId={`${ind}`}
                                    direction="horizontal"
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(
                                                snapshot.isDraggingOver,
                                            )}
                                            {...provided.droppableProps}
                                        >
                                            {el.list.map((favorite, index) => {
                                                const favoriteKey = `${favorite._id}-${ind}`;
                                                let currentCountInfo = currentRowCountInfo[
                                                    favoriteKey
                                                ]
                                                    ? currentRowCountInfo[
                                                          favoriteKey
                                                      ]
                                                    : {};
                                                let currentParteInfo = currentRowParteInfo[
                                                    favoriteKey
                                                ]
                                                    ? currentRowParteInfo[
                                                          favoriteKey
                                                      ]
                                                    : 0;

                                                return (
                                                    <Draggable
                                                        key={favorite._id}
                                                        draggableId={
                                                            favorite._id
                                                        }
                                                        index={index}
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot,
                                                        ) => (
                                                            <div
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided
                                                                        .draggableProps
                                                                        .style,
                                                                )}
                                                            >
                                                                <Flex justifyContent="space-around">
                                                                    <Flex
                                                                        flex="1"
                                                                        flexDirection="column"
                                                                        alignItems="center"
                                                                        justifyContent="space-around"
                                                                    >
                                                                        {favorite.styleAndColor.map(
                                                                            d => (
                                                                                <StyleItem
                                                                                    styleId={`${favorite._id}-${d._id}-item`}
                                                                                    colors={
                                                                                        d.colorIds
                                                                                    }
                                                                                    key={`${
                                                                                        favorite._id
                                                                                    }-${
                                                                                        d._id
                                                                                    }-${Math.random() *
                                                                                        1000000}`}
                                                                                    {...d.style}
                                                                                    style={{
                                                                                        cursor:
                                                                                            'pointer',
                                                                                    }}
                                                                                />
                                                                            ),
                                                                        )}
                                                                    </Flex>
                                                                    <Box pl="8px">
                                                                        {favorite.styleAndColor.map(
                                                                            sc => (
                                                                                <Box p="8px 0">
                                                                                    <Info
                                                                                        label="编号"
                                                                                        value={
                                                                                            sc
                                                                                                .style
                                                                                                .styleNo
                                                                                        }
                                                                                    />
                                                                                    <Info
                                                                                        label="颜色"
                                                                                        value={lodash
                                                                                            .union(
                                                                                                sc.colorIds.map(
                                                                                                    c =>
                                                                                                        c.code,
                                                                                                ),
                                                                                            )
                                                                                            .join(
                                                                                                ',',
                                                                                            )}
                                                                                    />
                                                                                </Box>
                                                                            ),
                                                                        )}
                                                                        <Flex mb="30px">
                                                                            {el.sizes.map(
                                                                                s => {
                                                                                    const sizeKey = `${ind}-${favorite._id}-${s}`;

                                                                                    return (
                                                                                        <Flex
                                                                                            flexDirection="column"
                                                                                            alignItems="center"
                                                                                            key={
                                                                                                sizeKey
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                s
                                                                                            }
                                                                                            <InputNumber
                                                                                                value={
                                                                                                    currentCountInfo[
                                                                                                        sizeKey
                                                                                                    ]
                                                                                                        ? currentCountInfo[
                                                                                                              sizeKey
                                                                                                          ]
                                                                                                        : 0
                                                                                                }
                                                                                                onChange={val => {
                                                                                                    currentCountInfo[
                                                                                                        sizeKey
                                                                                                    ] = val;
                                                                                                    currentRowCountInfo[
                                                                                                        favoriteKey
                                                                                                    ] = {
                                                                                                        ...currentCountInfo,
                                                                                                    };

                                                                                                    countInfos[
                                                                                                        ind
                                                                                                    ] = currentRowCountInfo;
                                                                                                    setCountInfos(
                                                                                                        {
                                                                                                            ...countInfos,
                                                                                                        },
                                                                                                    );
                                                                                                }}
                                                                                            />
                                                                                        </Flex>
                                                                                    );
                                                                                },
                                                                            )}
                                                                        </Flex>
                                                                        <Info
                                                                            label="单价"
                                                                            value={lodash.sum(
                                                                                favorite.styleAndColor.map(
                                                                                    sc =>
                                                                                        sc
                                                                                            .style
                                                                                            .price,
                                                                                ),
                                                                            )}
                                                                        />
                                                                        <Flex
                                                                            justifyContent="space-between"
                                                                            alignItems="center"
                                                                            pr="6px"
                                                                            minWidth="240px"
                                                                        >
                                                                            <Info
                                                                                label="每份数量"
                                                                                value={lodash.sum(
                                                                                    Object.values(
                                                                                        currentCountInfo,
                                                                                    ),
                                                                                )}
                                                                            />
                                                                            <Box>
                                                                                <InputNumber
                                                                                    value={
                                                                                        currentParteInfo
                                                                                            ? currentParteInfo
                                                                                            : 0
                                                                                    }
                                                                                    onChange={val => {
                                                                                        if (
                                                                                            !parteInfos[
                                                                                                ind
                                                                                            ]
                                                                                        ) {
                                                                                            parteInfos[
                                                                                                ind
                                                                                            ] = {};
                                                                                        }
                                                                                        parteInfos[
                                                                                            ind
                                                                                        ][
                                                                                            favoriteKey
                                                                                        ] = val;
                                                                                        setParteInfos(
                                                                                            {
                                                                                                ...parteInfos,
                                                                                            },
                                                                                        );
                                                                                    }}
                                                                                />

                                                                                份
                                                                            </Box>
                                                                            总数：
                                                                            {lodash.sum(
                                                                                Object.values(
                                                                                    currentCountInfo,
                                                                                ),
                                                                            ) *
                                                                                currentParteInfo}
                                                                        </Flex>
                                                                    </Box>
                                                                </Flex>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                                <Flex
                                    height="36px"
                                    bg="#000000"
                                    p="0 22px"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Select
                                        width="120px"
                                        mode="white"
                                        defaultValue={1}
                                        options={[
                                            { label: '单色单码', value: 1 },
                                            { label: '混色混码', value: 2 },
                                            { label: '单色混码混箱', value: 3 },
                                            { label: '单色混码单箱', value: 4 },
                                        ]}
                                    />
                                    <Flex color="#ffffff">
                                        总数量：
                                        {singleTotalInfos[ind]
                                            ? singleTotalInfos[ind]
                                            : 0}
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                    );
                })}
            </DragDropContext>
            <Flex mt="60px" height="56px" bg="#C0B3B6" justifyContent="center">
                <Box>保存</Box>
                <Box>发送</Box>
            </Flex>
        </Modal>
    );
};

export default connect(({ diy }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    favoriteToOrderGroupList: diy.favoriteToOrderGroupList,
}))(App);
