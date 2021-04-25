import React, { useEffect, useState } from 'react';
import { connect } from 'dva';

import { ReactSVG } from 'react-svg';
import AllIcon from '@/public/icons/icon-all.svg';
import { Tooltip } from 'antd';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
export const ColotItem = ({ color, isSelected, size = '44px', ...props }) => (
    <div
        {...props}
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
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

const App = ({ colorList = { docs: [] }, selectColorList, dispatch, currentGood = {}, assign }) => {
    let { docs = [] } = colorList;
    const selectAll = docs.length === docs.filter(x => x.isSelected).length;
    const [queryKey, setQueryKey] = useState('');
    const [sort, setSort] = useState('time');
    useEffect(() => {
        console.log('sort', sort);
        if (currentGood._id) {
            let payload = { goodsId: currentGood._id, limit: 10000, type: 0, sort };
            if (queryKey) {
                payload.code = queryKey;
            }
            dispatch({
                type: 'diy/fetchColorList',
                payload,
            });
        }
    }, [currentGood, queryKey, sort]);
    const handleSelectColor = color => {
        dispatch({
            type: 'diy/toogleSelectColor',
            payload: color,
        });
    };

    const handleSelectAll = () => {
        if (selectAll) {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: [], flowerColors: selectColorList.map(x => x._id) },
            });
        } else {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: docs.map(x => x._id), flowerColors: selectColorList.map(x => x._id) },
            });
        }
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
                    <SearchInput
                        placeholder="SEARCH COLOR"
                        onSearch={e => {
                            setQueryKey(e.target.value);
                        }}
                    />
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
                            setSort(val);
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
                <div
                    style={{
                        padding: '0 21px',
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gridRowGap: '55px',
                        height: '520px',
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
                </div>
            </div>
        </>
    );
};

export default connect(({ diy = {} }) => ({
    colorList: diy.colorList,
    selectColorList: diy.selectColorList,
    currentGood: diy.currentGood,
    assign: diy.collocationPattern === 'assign',
}))(App);
