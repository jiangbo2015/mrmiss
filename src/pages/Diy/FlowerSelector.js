import React, { useEffect } from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';

const ImgItem = ({ img, isSelected, ...props }) => (
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
                background: `url(${filterImageUrl(img)})`,
                width: '44px',
                height: '44px',
                borderRadius: '50% 50%',
                backgroundSize: '100% 100%',
                boxSizing: 'content-box',
                backgroundClip: 'content-box',
                padding: '5px',
                border: isSelected ? '1px solid #fff' : '1px solid rgba(0,0,0,0)',
            }}
        />
    </div>
);

const App = ({ flowerList = { docs: [] }, dispatch, currentGood = {} }) => {
    const { docs } = flowerList;
    useEffect(() => {
        dispatch({
            type: 'diy/fetchColorList',
            payload: { goodsId: currentGood._id, limit: 10000, type: 1 },
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
                <SearchInput placeholder="SEARCH PAINT" />
            </div>
            <div
                style={{
                    padding: '0 21px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridRowGap: '55px',
                    height: '520px',
                    alignContent: 'start',
                    overflowY: 'scroll',
                }}
            >
                {docs.map((d, index) => (
                    <ImgItem
                        key={d._id}
                        img={d.value}
                        isSelected={d.isSelected}
                        onClick={() => {
                            handleSelectColor({ item: d, index });
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default connect(({ diy = {} }) => ({ flowerList: diy.flowerList, currentGood: diy.currentGood }))(App);
