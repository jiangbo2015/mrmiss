import React, { useEffect, useState } from 'react';
import { connect } from 'dva';

import { ReactSVG } from 'react-svg';
import AllIcon from '@/public/icons/icon-all.svg';
import { Tooltip } from 'antd';
import SearchInput from '@/components/SearchInput';
const ColotItem = ({ color, isSelected, ...props }) => (
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
                width: '44px',
                height: '44px',
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
    useEffect(() => {
        if (currentGood._id) {
            let payload = { goodsId: currentGood._id, limit: 10000, type: 0 };
            if (queryKey) {
                payload.code = queryKey;
            }
            dispatch({
                type: 'diy/fetchColorList',
                payload,
            });
        }
    }, [currentGood, queryKey]);
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
        <div
            style={{
                padding: '28px 20px',
                width: '328px',
                background: '#222222',
            }}
        >
            <div style={{ marginBottom: '60px', display: 'flex' }}>
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
            </div>
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
    );
};

export default connect(({ diy = {} }) => ({
    colorList: diy.colorList,
    selectColorList: diy.selectColorList,
    currentGood: diy.currentGood,
    assign: diy.collocationPattern === 'assign',
}))(App);
