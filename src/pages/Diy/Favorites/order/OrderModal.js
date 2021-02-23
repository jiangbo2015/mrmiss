import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';

import { Popover, Input, Badge } from 'antd';
import { ReactSVG } from 'react-svg';
import { Flex, Box } from 'rebass/styled-components';

import SelectedIcon from '@/components/OrderMark/node_modules/@/public/icons/icon-selected-black.svg';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import InputNumber from '@/components/InputNumber';
import { InputBottomWhiteBorder } from '@/components/Input';

import StyleItem from '@/components/StyleItem';
import Modal from '@/components/Modal';
import Select from '@/components/Select';
import Info from '../components/Info';

import IconBackageInfo from '@/components/OrderMark/node_modules/@/public/icons/backage-info.svg';
import IconSave from '@/components/OrderMark/node_modules/@/public/icons/icon-save.svg';
import IconSend from '@/components/OrderMark/node_modules/@/public/icons/icon-send.svg';

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination, currentUser, currentGood) => {
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

const App = ({ favoriteToOrderGroupList, dispatch, visible, onCancel, currentGood = {}, currentUser }) => {
    const [showChange, setShowChange] = useState(false);
    // const [selectRow, setSelectRow] = useState([]);
    const [sourceData, setSourceData] = useState([]);
    const [countInfos, setCountInfos] = useState({}); // 所有尺码 数量信息
    const [singleTotalInfos, setSingleTotalInfos] = useState({}); //每行总数
    const [rowPickTypes, setRowPickTypes] = useState({}); //每行总数
    const [rowRemarks, setRowRemarks] = useState({}); //每行总数
    const [singleTotalPriceInfos, setSingleTotalPriceInfos] = useState({}); //每行总金额
    const [parteInfos, setParteInfos] = useState({}); // 所有 分数 信息
    useEffect(() => {
        let initCountInfos = {};
        let initParteInfos = {};
        let initRowPickTypes = {};
        let initRowRemarks = {};
        favoriteToOrderGroupList.map((g, ri) => {
            initCountInfos[ri] = {};
            initParteInfos[ri] = {};
            initRowRemarks[ri] = g.rowRemarks ? g.rowRemarks : '';
            initRowPickTypes[ri] = g.pickType ? g.pickType : { val: 0, pieceCount: 0 };
            g.list.map(favorite => {
                const favoriteKey = `${favorite._id}-${ri}`;
                initCountInfos[ri][favoriteKey] = {};
                if (favorite.sizeInfoObject) {
                    Object.keys(favorite.sizeInfoObject).map(s => {
                        const sizeKey = `${ri}-${favorite._id}-${s}`;
                        initCountInfos[ri][favoriteKey][sizeKey] = favorite.sizeInfoObject[s];
                    });
                }

                if (favorite.parte) {
                    initParteInfos[ri][favoriteKey] = favorite.parte;
                }
            });
        });
        console.log('favoriteToOrderGroupList', favoriteToOrderGroupList);
        setSourceData(favoriteToOrderGroupList);
        setCountInfos(initCountInfos);
        setParteInfos(initParteInfos);
        setRowPickTypes(initRowPickTypes);
        setRowRemarks(initRowRemarks);
    }, [favoriteToOrderGroupList]);
    // useEffect(() => {
    //     console.log('----sourceData----', sourceData);
    // }, [sourceData]);
    useEffect(() => {
        Object.keys(countInfos).map(row => {
            let rowParte = parteInfos[row];
            if (!countInfos[row]) return;
            let rowUnitPrice = 0;
            rowUnitPrice += lodash.sum(sourceData[row].list[0].styleAndColor.map(sc => sc.style.price));

            let sum = 0;
            // console.log('rowPickTypes[row].val ', rowPickTypes[row].val);
            if (rowPickTypes[row].val == 1) {
                if (rowPickTypes[row].pieceCount) {
                    sum = lodash.sum(Object.values(countInfos[row]).map(ci => lodash.sum(Object.values(ci))));
                    sum = sum * rowPickTypes[row].pieceCount;
                }
            } else {
                for (var key in rowParte) {
                    if (!countInfos[row][key]) return;
                    let parte = rowParte[key];
                    sum += lodash.sum(Object.values(countInfos[row][key])) * parte;
                }
            }

            singleTotalInfos[row] = sum;
            singleTotalPriceInfos[row] = sum * rowUnitPrice;
        });
        setSingleTotalInfos({ ...singleTotalInfos });
        setSingleTotalPriceInfos({ ...singleTotalPriceInfos });
    }, [countInfos, parteInfos, rowPickTypes]);

    const onDragEnd = result => {
        const { source, destination } = result;
        const sInd = +source.droppableId;

        // dropped outside the list
        if (!destination) {
            const sourceClone = Array.from(sourceData[sInd].list);
            const [removed] = sourceClone.splice(source.index, 1);
            sourceData[sInd].list = sourceClone;

            const newKey = removed.styleAndColor.map(sc => sc.styleId).join('-');
            rowPickTypes[Object.keys(rowPickTypes).length] = {
                val: 0,
                pieceCount: 0,
            };
            // console.log('removed', removed);
            setSourceData([
                ...sourceData,
                {
                    key: newKey,
                    list: [removed],
                    sizes: removed.styleAndColor[0].style.size?.split('/'),
                },
            ]);

            setRowPickTypes({ ...rowPickTypes });
            return;
        }
        const dInd = +destination.droppableId;
        if (sInd === dInd) {
            // console.log('sInd', sInd);
            // console.log('sourceData', sourceData);
            const items = reorder(sourceData[sInd].list, source.index, destination.index);
            const newState = [...sourceData];
            newState[sInd] = { ...sourceData[sInd], list: items };
            setSourceData(newState);
        } else if (sourceData[sInd].key === sourceData[dInd].key) {
            const result = move(sourceData[sInd].list, sourceData[dInd].list, source, destination);
            const newState = [...sourceData];
            newState[sInd].list = result[sInd];
            newState[dInd].list = result[dInd];

            setSourceData(newState.filter(group => group.list.length));
        }
    };

    const parseOrderData = () => {
        const orderData = sourceData.map((row, ri) => {
            const { list, sizes, key } = row;
            let currentRowCountInfo = countInfos[ri] ? countInfos[ri] : {};
            let currentRowParteInfo = parteInfos[ri] ? parteInfos[ri] : {};
            const items = list.map(favorite => {
                const favoriteKey = `${favorite._id}-${ri}`;
                let currentCountInfo = currentRowCountInfo[favoriteKey] ? currentRowCountInfo[favoriteKey] : {};

                let currentParteInfo = currentRowParteInfo[favoriteKey] ? currentRowParteInfo[favoriteKey] : 0;

                let sizeInfoObject = {};
                let total = 0;
                Object.keys(currentCountInfo).map(k => {
                    sizeInfoObject[k.split('-')[2]] = currentCountInfo[k];
                    total += currentCountInfo[k];
                });
                total *= currentParteInfo;
                let unitPrice = lodash.sum(favorite.styleAndColor.map(sc => sc.style.price));
                return {
                    favoriteId: favorite._id,
                    sizeInfoObject,
                    parte: currentParteInfo,
                    total,
                    totalPrice: unitPrice * total,
                };
            });
            return {
                pickType: rowPickTypes[ri],
                rowTotal: singleTotalInfos[ri],
                rowTotalPrice: singleTotalPriceInfos[ri],
                rowRemarks: rowRemarks[ri],
                items,
                isSelect: !!row.isSelect,
            };
        });
        return orderData;
    };

    const handleSend = async () => {
        const orderData = parseOrderData();
        const res = _.groupBy(orderData, 'isSelect');

        // console.log('res', res);
        // return;
        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData: res['false'],
                goodsId: currentGood._id,
            },
        });

        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData: res['true'],
                goodsId: currentGood._id,
                isSend: 1,
            },
        });
        setShowChange(false);
    };

    const handleSave = async () => {
        const orderData = parseOrderData();
        await dispatch({
            type: 'diy/addOrder',
            payload: {
                orderData,
                goodsId: currentGood._id,
            },
        });
        setShowChange(false);
    };
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
                    let currentRowCountInfo = countInfos[ind] ? countInfos[ind] : {};
                    let currentRowParteInfo = parteInfos[ind] ? parteInfos[ind] : {};
                    // console.log('currentCountInfo', currentCountInfo);
                    return (
                        <Flex alignItems="center" m="0px 24px">
                            <ReactSVG
                                src={SelectedIcon}
                                style={{ width: '20px', height: '20px', opacity: el.isSelect ? '1' : '0.3' }}
                                onClick={() => {
                                    sourceData[ind].isSelect = !sourceData[ind].isSelect;
                                    setSourceData([...sourceData]);
                                }}
                            />
                            <Box m="10px" width="100%" sx={{ position: 'relative' }}>
                                <Popover
                                    content={
                                        <Box width="160px">
                                            <Input.TextArea
                                                rows={3}
                                                value={rowRemarks[ind]}
                                                onChange={e => {
                                                    rowRemarks[ind] = e.target.value;
                                                    setRowRemarks({
                                                        ...rowRemarks,
                                                    });
                                                    setShowChange(true);
                                                }}
                                            />
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

                                <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            {...provided.droppableProps}
                                        >
                                            {el.list.map((favorite, index) => {
                                                const favoriteKey = `${favorite._id}-${ind}`;
                                                let currentCountInfo = currentRowCountInfo[favoriteKey]
                                                    ? currentRowCountInfo[favoriteKey]
                                                    : {};
                                                let currentParteInfo = currentRowParteInfo[favoriteKey]
                                                    ? currentRowParteInfo[favoriteKey]
                                                    : 0;

                                                return (
                                                    <Draggable key={favorite._id} draggableId={favorite._id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={getItemStyle(
                                                                    snapshot.isDragging,
                                                                    provided.draggableProps.style,
                                                                )}
                                                            >
                                                                <Flex justifyContent="space-around">
                                                                    <Flex
                                                                        flex="1"
                                                                        flexDirection="column"
                                                                        alignItems="center"
                                                                        justifyContent="space-around"
                                                                    >
                                                                        {favorite.styleAndColor.map(d => (
                                                                            <StyleItem
                                                                                styleId={`${favorite._id}-${d._id}-item`}
                                                                                colors={d.colorIds}
                                                                                key={`${favorite._id}-${d._id}-${Math.random() *
                                                                                    1000000}`}
                                                                                {...d.style}
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                }}
                                                                            />
                                                                        ))}
                                                                    </Flex>
                                                                    <Box pl="8px">
                                                                        {favorite.styleAndColor.map(sc => (
                                                                            <Box p="8px 0">
                                                                                <Info label="编号" value={sc.style.styleNo} />
                                                                                <Info
                                                                                    label="颜色"
                                                                                    value={lodash
                                                                                        .union(sc.colorIds.map(c => c.code))
                                                                                        .join(',')}
                                                                                />
                                                                            </Box>
                                                                        ))}
                                                                        <Flex mb="30px">
                                                                            {console.log('el.sizes', el.sizes)}
                                                                            {el.sizes?.map(s => {
                                                                                const sizeKey = `${ind}-${favorite._id}-${s}`;
                                                                                return (
                                                                                    <Flex
                                                                                        flexDirection="column"
                                                                                        alignItems="center"
                                                                                        key={sizeKey}
                                                                                    >
                                                                                        {s}
                                                                                        <InputNumber
                                                                                            value={
                                                                                                currentCountInfo[sizeKey]
                                                                                                    ? currentCountInfo[sizeKey]
                                                                                                    : 0
                                                                                            }
                                                                                            onChange={val => {
                                                                                                currentCountInfo[sizeKey] = val;
                                                                                                currentRowCountInfo[
                                                                                                    favoriteKey
                                                                                                ] = {
                                                                                                    ...currentCountInfo,
                                                                                                };

                                                                                                countInfos[
                                                                                                    ind
                                                                                                ] = currentRowCountInfo;
                                                                                                setCountInfos({
                                                                                                    ...countInfos,
                                                                                                });
                                                                                                setShowChange(true);
                                                                                            }}
                                                                                        />
                                                                                    </Flex>
                                                                                );
                                                                            })}
                                                                        </Flex>
                                                                        <Info
                                                                            label="单价"
                                                                            value={lodash.sum(
                                                                                favorite.styleAndColor.map(sc => sc.style.price),
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
                                                                                    Object.values(currentCountInfo),
                                                                                )}
                                                                            />
                                                                            {rowPickTypes[ind] &&
                                                                            rowPickTypes[ind].val === 1 ? null : (
                                                                                <Box>
                                                                                    <InputNumber
                                                                                        value={
                                                                                            currentParteInfo
                                                                                                ? currentParteInfo
                                                                                                : 0
                                                                                        }
                                                                                        onChange={val => {
                                                                                            if (!parteInfos[ind]) {
                                                                                                parteInfos[ind] = {};
                                                                                            }
                                                                                            parteInfos[ind][favoriteKey] = val;
                                                                                            setParteInfos({
                                                                                                ...parteInfos,
                                                                                            });
                                                                                            setShowChange(true);
                                                                                        }}
                                                                                    />
                                                                                    份
                                                                                </Box>
                                                                            )}

                                                                            {rowPickTypes[ind] &&
                                                                            rowPickTypes[ind].val === 1 ? null : (
                                                                                <>
                                                                                    总数：
                                                                                    {lodash.sum(Object.values(currentCountInfo)) *
                                                                                        currentParteInfo}
                                                                                </>
                                                                            )}
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
                                <Flex height="36px" bg="#000000" p="0 22px" alignItems="center" justifyContent="space-between">
                                    <Flex alignItems="center">
                                        <Select
                                            width="120px"
                                            mode="white"
                                            value={
                                                typeof rowPickTypes[ind] != 'undefined' && rowPickTypes[ind]
                                                    ? rowPickTypes[ind].val
                                                    : 0
                                            }
                                            options={[
                                                { label: '单色单码', value: 0 },
                                                { label: '混色混码', value: 1 },
                                                { label: '单色混码混箱', value: 2 },
                                                { label: '单色混码单箱', value: 3 },
                                            ]}
                                            onSelect={val => {
                                                console.log(val);
                                                rowPickTypes[ind] = { ...rowPickTypes[ind], val };
                                                setRowPickTypes({
                                                    ...rowPickTypes,
                                                });
                                                setShowChange(true);
                                            }}
                                        />
                                        {rowPickTypes[ind] && rowPickTypes[ind].val === 1 ? (
                                            <Flex color="#ffffff" fontSize="12px" alignItems="center">
                                                <Flex alignItems="center" p="0 10px">
                                                    每份
                                                    <InputBottomWhiteBorder
                                                        value={lodash.sum(
                                                            Object.values(currentRowCountInfo).map(ci =>
                                                                lodash.sum(Object.values(ci)),
                                                            ),
                                                        )}
                                                    />
                                                    件
                                                </Flex>
                                                <Flex
                                                    alignItems="center"
                                                    sx={{
                                                        '.ant-input-number-handler-wrap': {
                                                            display: 'none !important',
                                                        },
                                                    }}
                                                >
                                                    共
                                                    <InputNumber
                                                        value={rowPickTypes[ind].pieceCount}
                                                        type="number"
                                                        onChange={val => {
                                                            rowPickTypes[ind] = { ...rowPickTypes[ind], pieceCount: val };
                                                            setRowPickTypes({
                                                                ...rowPickTypes,
                                                            });
                                                            setShowChange(true);
                                                        }}
                                                    />
                                                    件
                                                </Flex>
                                            </Flex>
                                        ) : null}
                                    </Flex>

                                    <Flex color="#ffffff">
                                        <Box>
                                            总金额:
                                            {singleTotalPriceInfos[ind] ? singleTotalPriceInfos[ind] : 0}
                                        </Box>
                                        <Box p="0 16px">
                                            总数量:
                                            {singleTotalInfos[ind] ? singleTotalInfos[ind] : 0}
                                        </Box>
                                        <Box>大约?箱</Box>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                    );
                })}
            </DragDropContext>
            <Flex mt="60px" height="56px" bg="#C0B3B6" justifyContent="center" alignItems="center">
                <Badge dot={showChange}>
                    <ReactSVG
                        src={IconSave}
                        style={{
                            width: '20px',
                            height: '20px',
                        }}
                        onClick={() => {
                            handleSave();
                        }}
                    />
                </Badge>
                <ReactSVG
                    src={IconSend}
                    style={{
                        width: '18px',
                        height: '18px',
                        marginLeft: '40px',
                        marginBottom: '4px',
                    }}
                    onClick={() => {
                        handleSend();
                    }}
                />
            </Flex>
        </Modal>
    );
};

export default connect(({ diy = {}, user = {} }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    currentGood: diy.currentGood,
    currentUser: user.info,
    favoriteToOrderGroupList: diy.favoriteToOrderGroupList,
}))(App);
