import React, { useEffect, useState } from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';
import { Tooltip } from 'antd';
import { ReactSVG } from 'react-svg';
import AllIcon from '@/public/icons/icon-all.svg';
import Select from '@/components/Select';

export const ImgItem = ({ img, isSelected, size = '44px', ...props }) => (
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
                width: size,
                height: size,
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
    const [sort, setSort] = useState('time');
    useEffect(() => {
        if (currentGood._id) {
            let payload = { goodsId: currentGood._id, limit: 10000, type: 1, sort };
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
                padding: '24px 20px',
                width: '24.4%',
                background: '#222222',
                position: 'relative',
            }}
        >
            <div style={{ marginBottom: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                            .filter(x => x.type === 1)
                            .map((d, index) => (
                                <ImgItem
                                    size="17px"
                                    key={`bar-${d._id}`}
                                    // isSelected={d.isSelected}
                                    img={d.value}
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
