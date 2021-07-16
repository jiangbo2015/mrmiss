import React, { useEffect, useState } from 'react';
import { connect } from 'dva';

import { filterImageUrl } from '@/utils/helper';
import SearchInput from '@/components/SearchInput';
import { Tooltip, Form } from 'antd';
import { ReactSVG } from 'react-svg';
import AllIcon from '@/public/icons/icon-all.svg';
import Select from '@/components/Select';
import ReactList from 'react-list';

export const ImgItem = ({ img, isSelected, style = {}, size = '44px', ...props }) => (
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
        {/* <div
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
        /> */}
        <img
            src={filterImageUrl(img)}
            // width={size}
            // height={size}
            style={{
                // background: `url(${filterImageUrl(img)})`,
                display: 'block',
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

const App = ({ flowerList = { docs: [] }, dispatch, currentGood = {}, selectColorList, assign, currentAdminChannel }) => {
    const { docs = [] } = flowerList;
    const selectAll = docs.length === docs.filter(x => x.isSelected).length;
    const [queryKey, setQueryKey] = useState('');
    const [sort, setSort] = useState('time');
    const [form] = Form.useForm();
    const handleFetchList = async (fetchType, queryKey) => {
        if (!currentGood || !currentGood._id) {
            return;
        }
        let payload = { goodsId: currentGood._id, limit: 10000, type: 1, sort };
        if (queryKey) {
            payload.code = queryKey;
        }
        if (fetchType) {
            payload.fetchType = fetchType;
        }
        dispatch({
            type: 'diy/fetchColorList',
            payload,
        });
    };
    useEffect(() => {
        // console.log('sort', sort);
        handleFetchList('clear');
    }, [currentGood]);
    useEffect(() => {
        // console.log('sort', sort);
        handleFetchList('keep', queryKey);
    }, [sort]);
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
    }, [currentAdminChannel]);
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

    const renderItem = (index, key) => {
        const d = docs[index];
        return (
            <Tooltip
                title={
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            handleShowBigPic(d);
                        }}
                    >
                        {d.code}
                    </div>
                }
                key={`${d._id}-tooltip`}
            >
                <ImgItem
                    key={d._id}
                    img={d.value}
                    isSelected={d.isSelected}
                    onClick={() => {
                        handleSelectColor({ item: d, index });
                    }}
                    style={{
                        display: 'inline-flex',
                        width: '33.3%',
                        paddingBottom: '55px',
                    }}
                    // onDoubleClick={}
                />
            </Tooltip>
        );
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
                <Form form={form} name="control-search-paint">
                    <Form.Item name="code" style={{ marginBottom: 0 }}>
                        <SearchInput
                            style={{ width: '100%' }}
                            placeholder="SEARCH PAINT"
                            onSearch={e => {
                                setQueryKey(e.target.value);
                                handleFetchList('keep', e.target.value);
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
            {/* <div
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
                {docs.map((d, index) => (
                    <Tooltip
                        title={
                            <div
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    handleShowBigPic(d);
                                }}
                            >
                                {d.code}
                            </div>
                        }
                        key={`${d._id}-tooltip`}
                    >
                        <ImgItem
                            key={d._id}
                            img={d.value}
                            isSelected={d.isSelected}
                            onClick={() => {
                                handleSelectColor({ item: d, index });
                            }}
                            // onDoubleClick={}
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
                <ReactList itemRenderer={renderItem} length={docs.length} type="uniform" />
            </div>
        </div>
    );
};

export default connect(({ diy = {}, channel = {} }) => ({
    flowerList: diy.flowerList,
    currentGood: diy.currentGood,
    assign: diy.collocationPattern === 'assign',
    selectColorList: diy.selectColorList,
    currentAdminChannel: channel.currentAdminChannel,
}))(App);
