import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import _, { filter } from 'lodash';

import { ReactSVG } from 'react-svg';
import AllIcon from '@/public/icons/icon-all.svg';
import { Tooltip, Form } from 'antd';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import ReactList from 'react-list';

export const ColotItem = ({ color, isSelected, size = '44px', style, ...props }) => (
    <div
        {...props}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            ...style,
        }}
    >
        <div
            style={{
                background: color,
                width: size,
                height: size,
                borderRadius: '50% 50%',
                boxSizing: 'content-box',
                backgroundClip: 'content-box',
                padding: '5px',
                border: isSelected ? '1px solid #fff' : '1px solid rgba(0,0,0,0)',
            }}
        />
    </div>
);

const App = ({
    colorList = { docs: [] },
    fetching,
    selectColorList,
    dispatch,
    currentGood = {},
    currentFlower = {},
    assign,
    currentAdminChannel,
}) => {
    let { docs = [] } = colorList;
    const [queryKey, setQueryKey] = useState('');
    const [sort, setSort] = useState('time');
    const [form] = Form.useForm();
    const filterData = colorList.docs.filter(x => x.code.includes(queryKey));

    const selectAll = filterData.length === filterData.filter(x => x.isSelected).length;

    const handleFetchList = async fetchType => {
        if (!currentGood || !currentGood._id) {
            return;
        }
        let payload = { goodsId: currentGood._id, limit: 10000, type: 0 };

        if (fetchType) {
            payload.fetchType = fetchType;
        }
        dispatch({
            type: 'diy/fetchPlainList',
            payload,
        });
    };

    const handSort = (sortArg, currentFlower) => {
        // console.log('handSort', sortArg);
        if (sortArg === 'time') {
            dispatch({
                type: 'diy/setColorList',
                payload: {
                    ...colorList,
                    docs: _.reverse(
                        _.sortBy(docs, function(o) {
                            if(currentFlower && Array.isArray(currentFlower.relatedColors) && currentFlower.relatedColors.includes(o._id)){
                                return '9999999999'
                            }
                            if (o.createdAt) {
                                return o.createdAt;
                            } else {
                                return '2020';
                            }
                        }),
                    ),
                },
            });
        } else {
            dispatch({
                type: 'diy/setColorList',
                payload: {
                    ...colorList,
                    docs: _.sortBy(docs, function(o) {
                        if(currentFlower && Array.isArray(currentFlower.relatedColors) && currentFlower.relatedColors.includes(o._id)){
                            return -99
                        }
                        return -o.colorSystem;
                    }),
                },
            });
        }
    };
    useEffect(() => {
        // console.log('sort', sort);
        // if (currentGood && currentGood._id) {
        handleFetchList('clear');
        // }
    }, [currentGood]);

    useEffect(() => {
        if(currentFlower && Array.isArray(currentFlower.relatedColors)) {
            handSort(sort,currentFlower)
        }
        
    }, [currentFlower])

    useEffect(() => {
        const { plainColors, flowerColors } = currentAdminChannel;

        if (queryKey) {
            setQueryKey('');
            form.resetFields();
            handleFetchList('clear');
        } else {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors, flowerColors },
            });
        }
    }, [currentAdminChannel._id]);
    const handleSelectColor = color => {
        dispatch({
            type: 'diy/toogleSelectColor',
            payload: color,
        });
    };

    const handleSelectAll = () => {
        // _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
        if (selectAll) {
            const resetData = _.difference(
                selectColorList.filter(x => x.type == 0).map(x => x._id),
                filterData.map(x => x._id),
            );
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: {
                    plainColors: resetData,
                    flowerColors: selectColorList.filter(x => x.type == 1).map(x => x._id),
                },
            });
        } else {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: {
                    plainColors: _.uniq([
                        ...filterData.map(x => x._id),
                        ...selectColorList.filter(x => x.type == 0).map(x => x._id),
                    ]),
                    flowerColors: selectColorList.filter(x => x.type == 1).map(x => x._id),
                },
            });
        }
    };

    const renderItem = (index, key) => {
        const d = filterData[index];
        return (
            <Tooltip title={d.code} key={`${d._id}-tooltip`}>
                <ColotItem
                    // className="square-item"
                    key={d._id}
                    isSelected={d.isSelected}
                    color={d.value}
                    onClick={() => {
                        handleSelectColor({ item: d, index });
                    }}
                    style={{
                        display: 'inline-flex',
                        width: '33.3%',
                        paddingBottom: '55px',
                    }}
                />
            </Tooltip>
        );
    };

    return (
        <>
            <div
                style={{
                    padding: '24px 20px',
                    width: '24.4%',
                    background: '#222222',
                    position: 'relative',
                }}
            >
                <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Form form={form} name="control-hooks">
                        <Form.Item name="code" style={{ marginBottom: 0 }}>
                            <SearchInput
                                style={{ width: '100%' }}
                                placeholder="SEARCH COLOR"
                                onSearch={e => {
                                    setQueryKey(e.target.value);
                                    // handleFetchList('keep', e.target.value);
                                }}
                            />
                        </Form.Item>
                    </Form>
                    <ReactSVG
                        src={AllIcon}
                        style={{
                            width: '20px',
                            height: '20px',
                            padding: '4px',
                            marginLeft: '12px',
                            marginBottom: '8px',
                            opacity: assign ? (selectAll ? 1 : 0.3) : 0,
                            pointerEvents: assign ? 'painted' : 'none',
                        }}
                        onClick={() => {
                            handleSelectAll();
                        }}
                    />
                    <Select
                        onSelect={val => {
                            if (val != sort) {
                                setSort(val);
                                handSort(val);
                            }
                        }}
                        value={sort}
                        options={[
                            { label: 'Time', value: 'time' },
                            { label: 'Color', value: 'color' },
                        ]}
                    />
                </div>
                {assign && selectColorList.length > 0 ? (
                    <div
                        style={{
                            width: 'calc(100% - 40px)',
                            overflowX: 'scroll',
                            background: '#2E2E2E',
                            borderRadius: '6px',
                            boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.18)',
                            margin: '0 10px',
                            position: 'absolute',
                            left: 0,
                            top: '65px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                height: '45px',
                                alignItems: 'center',
                                padding: '0 10px',
                            }}
                        >
                            {selectColorList
                                .filter(x => x.type === 0)
                                .map((d, index) => (
                                    <ColotItem
                                        size="17px"
                                        key={`bar-${d._id}`}
                                        // isSelected={d.isSelected}
                                        color={d.value}
                                        onClick={() => {
                                            handleSelectColor({ item: d, index });
                                        }}
                                    />
                                ))}
                        </div>
                    </div>
                ) : null}
                {/* <div
                    style={{
                        padding: '0 21px',
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gridRowGap: '55px',
                        height: '600px',
                        alignContent: 'start',
                        overflowY: 'scroll',
                    }}
                >
                    {colorList.docs.map((d, index) => (
                        <Tooltip title={d.code} key={`${d._id}-tooltip`}>
                            <ColotItem
                                key={d._id}
                                isSelected={d.isSelected}
                                color={d.value}
                                onClick={() => {
                                    handleSelectColor({ item: d, index });
                                }}
                            />
                        </Tooltip>
                    ))} 
                    
                </div> */}
                <div
                    style={{
                        padding: '0 21px',
                        width: '100%',
                        overflowY: 'scroll',
                        height: '600px',
                    }}
                >
                    <ReactList itemRenderer={renderItem} length={filterData.length} type="uniform" />
                </div>
            </div>
        </>
    );
};

export default connect(({ diy = {}, channel = {}, loading }) => ({
    colorList: diy.colorList,
    selectColorList: diy.selectColorList,
    currentGood: diy.currentGood,
    currentFlower: diy.currentFlower,
    assign: diy.collocationPattern === 'assign',
    currentAdminChannel: channel.currentAdminChannel,
    fetching: loading.effects['diy/fetchPlainList'],
}))(App);
