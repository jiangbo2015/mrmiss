import React, { useEffect } from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
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

const App = ({ colorList = { docs: [] }, dispatch, currentGood = {} }) => {
    let { docs } = colorList;
    useEffect(() => {
        dispatch({
            type: 'diy/fetchColorList',
            payload: { goodsId: currentGood._id, limit: 10000, type: 0 },
        });
    }, [currentGood]);
    const handleSelectColor = color => {
        dispatch({
            type: 'diy/toogleSelectColor',
            payload: color,
        });
    };
    return (
        <div
            style={{
                padding: '28px 20px',
                width: '328px',
                background: '#222222',
            }}
        >
            <div style={{ marginBottom: '60px' }}>
                <SearchInput placeholder="SEARCH COLOR" />
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
                    <ColotItem
                        key={d._id}
                        isSelected={d.isSelected}
                        color={d.value}
                        onClick={() => {
                            handleSelectColor({ item: d, index });
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default connect(({ diy }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    selectColorList: diy.selectColorList,
    currentGood: diy.currentGood,
}))(App);
