import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import InputNumber from '@/components/InputNumber';
import StyleItem from '@/components/StyleItem';
import Modal from '@/components/Modal';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`,
        data: '',
    }));

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
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle,
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '100%',
    margin: '10px',
    display: 'flex',
    overflowX: 'scroll',
});

const App = ({ favoriteToOrderGroupList, dispatch, visible, onCancel }) => {
    const [sourceData, setSourceData] = useState([]);
    useEffect(() => {
        setSourceData(favoriteToOrderGroupList);
    }, [favoriteToOrderGroupList]);
    function onDragEnd(result) {
        const { source, destination } = result;
        const sInd = +source.droppableId;

        // dropped outside the list
        if (!destination) {
            const sourceClone = Array.from(sourceData[sInd].list);
            const [removed] = sourceClone.splice(source.index, 1);
            sourceData[sInd] = { ...sourceData[sInd], list: sourceClone };

            const newKey = removed.styleAndColor
                .map(sc => sc.styleId)
                .join('-');
            console.log('removed', newKey);
            setSourceData([
                ...sourceData,
                {
                    key: newKey,
                    list: [removed],
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
            footer={null}
            title="订单制作器"
        >
            <DragDropContext onDragEnd={onDragEnd}>
                {sourceData.map((el, ind) => (
                    <Droppable
                        key={ind}
                        droppableId={`${ind}`}
                        direction="horizontal"
                    >
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                            >
                                {el.list.map((favorite, index) => (
                                    <Draggable
                                        key={favorite._id}
                                        draggableId={favorite._id}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps
                                                        .style,
                                                )}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-around',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            flex: 1,
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column',
                                                            alignItems:
                                                                'center',
                                                            justifyContent:
                                                                'space-around',
                                                        }}
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
                                                    </div>
                                                    {el.sizes.map(s => (
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'column',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                        >
                                                            <span>s</span>
                                                            <InputNumber></InputNumber>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </Modal>
    );
};

export default connect(({ diy }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    favoriteToOrderGroupList: diy.favoriteToOrderGroupList,
}))(App);
