import React from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';
import StyleItem from '@/components/StyleItem';
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

const App = ({ styleList = { docs: [] } }) => {
    const { docs } = styleList;
    return (
        <div
            style={{
                padding: '28px 20px',
                background: '#222222',
                flex: 1,
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
                    gridRowGap: '55px',
                    height: '600px',
                    alignContent: 'start',
                    overflowY: 'scroll',
                    gridTemplateRows: 'repeat(3, 1fr)',
                }}
            >
                {docs.map(d => (
                    <StyleItem {...d} />
                ))}
            </div>
        </div>
    );
};

export default connect(({ diy }) => ({ styleList: diy.styleList }))(App);
