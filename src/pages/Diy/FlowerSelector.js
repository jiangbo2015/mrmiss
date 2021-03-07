import React, { useEffect, useState } from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';
import { Tooltip } from 'antd';
import { ReactSVG } from 'react-svg';
import AllIcon from '@/public/icons/icon-all.svg';

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

const App = ({ flowerList = { docs: [] }, dispatch, currentGood = {}, selectColorList, assign }) => {
    const { docs = [] } = flowerList;
    const selectAll = docs.length === docs.filter(x => x.isSelected).length;
    const [queryKey, setQueryKey] = useState('');
    useEffect(() => {
        if (currentGood._id) {
            let payload = { goodsId: currentGood._id, limit: 10000, type: 1 };
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
    const handleShowBigPic = color => {
        dispatch({
            type: 'diy/showBigPic',
            payload: color,
        });
    };
    const handleSelectAll = () => {
        if (selectAll) {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: selectColorList.map(x => x._id), flowerColors: [] },
            });
        } else {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: selectColorList.map(x => x._id), flowerColors: docs.map(x => x._id) },
            });
        }
    };
    return (
        <div
            style={{
                padding: '28px 20px',
                width: '24.4%',
                background: '#222222',
            }}
        >
            <div style={{ marginBottom: '60px', display: 'flex' }}>
                <SearchInput
                    placeholder="SEARCH PAINT"
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
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gridRowGap: '55px',
                    height: '520px',
                    alignContent: 'start',
                    overflowY: 'scroll',
                }}
            >
                {docs.map((d, index) => (
                    <Tooltip title={d.code} key={`${d._id}-tooltip`}>
                        <ImgItem
                            key={d._id}
                            img={d.value}
                            isSelected={d.isSelected}
                            onClick={() => {
                                window.flowerTimeId = setTimeout(() => {
                                    handleSelectColor({ item: d, index });
                                }, 200);
                            }}
                            onDoubleClick={() => {
                                clearInterval(window.flowerTimeId);
                                handleShowBigPic(d);
                            }}
                        />
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default connect(({ diy = {} }) => ({
    flowerList: diy.flowerList,
    currentGood: diy.currentGood,
    assign: diy.collocationPattern === 'assign',
    selectColorList: diy.selectColorList,
}))(App);
