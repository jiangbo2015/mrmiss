import React from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';
const ColotItem = ({ color }) => (
    <div
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
                width: '50px',
                height: '50px',
                borderRadius: '50% 50%',
            }}
        />
    </div>
);

const ImgItem = ({ img }) => (
    <div
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
                width: '50px',
                height: '50px',
                borderRadius: '50% 50%',
            }}
        />
    </div>
);

const App = ({ flowerList = { docs: [] } }) => {
    const { docs } = flowerList;
    return (
        <div
            style={{
                padding: '28px 20px',
                width: '328px',
                background: '#222222',
            }}
        >
            <div style={{ marginBottom: '60px' }}>
                <SearchInput />
            </div>
            <div
                style={{
                    padding: '0 21px',
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridRowGap: '55px',
                    height: '600px',
                    alignContent: 'start',
                    overflowY: 'scroll',
                }}
            >
                {docs.map(d => (
                    <ImgItem img={d.value} />
                ))}
            </div>
        </div>
    );
};

export default connect(({ diy }) => ({ flowerList: diy.flowerList }))(App);
