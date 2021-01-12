import React from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';
const waitTime = time => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};
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

const App = ({ styleList = { docs: [] }, dispatch }) => {
    const { docs } = styleList;
    const handleFetchMore = async () => {
        console.log('fetchStyleList');
        await waitTime(1000);
        console.log('go go');
        dispatch({
            type: 'diy/fetchStyleList',
        });
    };
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
            <InfiniteScroll
                dataLength={docs.length}
                next={handleFetchMore}
                hasMore={true}
                height={600}
                // inverse={true}
                style={{
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, 160px)',
                    justifyItems: 'center',
                    alignItems: 'center',
                    gridGap: '20px 10px',
                    justifyContent: 'center',

                    alignContent: 'start',
                    overflowY: 'scroll',
                    gridTemplateRows: 'repeat(3, 1fr)',
                }}
                loader={<h4 style={{ color: '#fff' }}>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center', color: '#fff' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {docs.map((d, index) => (
                    <StyleItem
                        key={`${d._id}-${index}-${Math.random() * 1000000}`}
                        {...d}
                    />
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default connect(({ diy }) => ({ styleList: diy.styleList }))(App);
