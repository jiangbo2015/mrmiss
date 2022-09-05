import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import { Form, Spin } from 'antd';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import { useIntl } from 'umi';
// import InfiniteScroll from 'react-infinite-scroll-component';
import MultipleModeStyles from './MultipleModeStyles';

import MultipleStyleSelector from './MultipleStyleSelector';
import SingleStyleSelector from './SingleStyleSelector';
import { ColotItem } from '../ColorSelector';
import { ImgItem } from '../FlowerSelector';

// react-list
import SelectedIcon from '@/public/icons/icon-selected.svg';
import SingleIcon from '@/public/icons/icon-single.svg';
import AllIcon from '@/public/icons/icon-all.svg';

import ExpandIcon from '@/public/icons/icon-expand.svg';
import MultipleIcon from '@/public/icons/icon-multiple.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

const waitTime = time => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};
window.timeOrder = false;
const App = ({
    styleList = { docs: [] },

    flowerList,
    colorList,

    selectStyleList,
    dispatch,

    currentStyle = {},
    currentStyle1 = {},

    currentStyleRegion,
    currentStyleRegion1,

    singleSelectColorList = [],
    singleSelectColorList1 = [],
    currentGood = { category: [] },
    currentGoodCategoryMultiple = '',
    fetchingStyles,
    currentAdminChannel,
    assign,
    collocationBg,
    // curChannslPrice,

    collocationPattern,
}) => {
    const [queryKey, setQueryKey] = useState('');
    const [form] = Form.useForm();
    const { locale } = useIntl();
    const currentGoodCategory = currentGoodCategoryMultiple;
    // console.log('assign', assign);

    // const [selectAssignedStyleList, setSelectAssignedStyleList] = useState([]);
    const [currentGoodCategoryIsTop, setCurrentGoodCategoryIsTop] = useState(false);
    let docs = [];
    let selectedNum = 0;
    if (styleList[currentGoodCategoryMultiple]) {
        console.log('queryKey', queryKey);
        docs = styleList[currentGoodCategoryMultiple].filter(x => x.styleNo.includes(queryKey));
        selectedNum = docs.filter(x => x.isSelected).length;
        // console.log('docs', docs);
    }
    let docs1 = [];
    let categoryObj = currentGood.category.find(x => x._id === currentGoodCategory);

    if (collocationPattern === 'single') {
        if (styleList[currentGoodCategory]) {
            console.log('选择的放在前面');
            //选择的放在前面
            docs = selectStyleList.length > 0 ? [...docs.filter(x => x.isSelected), ...docs.filter(x => !x.isSelected)] : docs;

            // // console.log('docs', docs);
        }
        if (categoryObj && categoryObj.name.indexOf('分体') >= 0) {
            // 分体
            let categoryName = categoryObj.name.replace('分体', '');
            // categoryName.replce('分体', '')
            let categoryNameTop = `${categoryName}单衣`;
            let categoryNameBottom = `${categoryName}单裤`;
            const top = currentGood.category.find(x => x.name === categoryNameTop);
            if (top) {
                //选择的放在前面
                docs =
                    selectStyleList.length > 0
                        ? [...styleList[top._id].filter(x => x.isSelected), ...styleList[top._id].filter(x => !x.isSelected)]
                        : styleList[top._id];
                docs = docs.filter(x => x.styleNo.includes(queryKey));
            }
            const bottom = currentGood.category.find(x => x.name === categoryNameBottom);
            if (bottom) {
                docs1 =
                    selectStyleList.length > 0
                        ? [
                              ...styleList[bottom._id].filter(x => x.isSelected),
                              ...styleList[bottom._id].filter(x => !x.isSelected),
                          ]
                        : styleList[bottom._id];
                docs1 = docs1.filter(x => x.styleNo.includes(queryKey));
            }
        }
    }

    const handleFetchMore = async (fetchType, styleNo) => {
        if (currentGood._id) {
            const payload = {
                _id: currentGood._id,
                fetchType,
            };
            if (fetchType) {
                payload.fetchType = fetchType;
            }
            if (styleNo) {
                payload.styleNo = styleNo;
            }
            dispatch({
                type: 'diy/fetchStyleList',
                payload,
            });
        }
    };

    const handleToggleTime = async () => {
        window.timeOrder = !window.timeOrder;
        console.log('window.timeOrder', window.timeOrder);

        styleList[currentGoodCategoryMultiple] = styleList[currentGoodCategoryMultiple].sort((a, b) => {
            return window.timeOrder
                ? new Date(b.createdAt ? b.createdAt : b.createTime).getTime() -
                      new Date(a.createdAt ? a.createdAt : a.createTime).getTime()
                : new Date(a.createdAt ? a.createdAt : a.createTime).getTime() -
                      new Date(b.createdAt ? b.createdAt : b.createTime).getTime();
        });
        dispatch({
            type: 'diy/setStyleList',
            payload: {
                ...styleList,
            },
        });
    };
    const handleChangeCollocationPattern = pattern => {
        dispatch({
            type: 'diy/setCollocationPattern',
            payload: pattern,
        });
        if (pattern === 'single') {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: {
                    plainColors: [...singleSelectColorList.map(x => x._id), ...singleSelectColorList1.map(x => x._id)],
                    flowerColors: [...singleSelectColorList.map(x => x._id), ...singleSelectColorList1.map(x => x._id)],
                },
            });
        } else {
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: [], flowerColors: [] },
            });
        }

        if (pattern === 'multiple' && categoryObj.name.includes('分体')) {
            const currentList = currentGood.category.filter(x => x.name.indexOf('分体') < 0);
            if (currentList.length > 0) {
                handleSetCurrentGoodCategory(currentList[0]._id);
            }
        }
    };
    const handleStyle = style => {
        dispatch({
            type: 'diy/toogleSelectStyle',
            payload: style,
        });
    };

    const handleSelectStyle = style => {
        if (style._id === currentStyle._id) {
            return;
        }
        dispatch({
            type: 'diy/setCurrentStyle',
            payload: style,
        });
        dispatch({
            type: 'diy/setSingleSelectColorList',
            payload: [],
        });
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: {
                plainColors: [...singleSelectColorList1.map(x => x._id)],
                flowerColors: [...singleSelectColorList1.map(x => x._id)],
            },
        });
        dispatch({
            type: 'diy/setCurrentStyleRegion',
            payload: 0,
        });
    };

    const handleSelectStyle1 = style => {
        if (style._id === currentStyle1._id) {
            return;
        }
        dispatch({
            type: 'diy/setCurrentStyle1',
            payload: style,
        });
        dispatch({
            type: 'diy/setSingleSelectColorList1',
            payload: [],
        });
        dispatch({
            type: 'diy/batchSetSelectColorList',
            payload: {
                plainColors: [...singleSelectColorList.map(x => x._id)],
                flowerColors: [...singleSelectColorList.map(x => x._id)],
            },
        });
        dispatch({
            type: 'diy/setCurrentStyleRegion1',
            payload: 0,
        });
    };

    const handleSetCurrentStyleRegion = val => {
        // // console.log('handleSetCurrentStyleRegion', val);
        dispatch({
            type: 'diy/setCurrentStyleRegion',
            payload: val + 1,
        });
    };

    const handleSetCurrentStyleRegion1 = val => {
        // // console.log('handleSetCurrentStyleRegion', val);
        dispatch({
            type: 'diy/setCurrentStyleRegion1',
            payload: val + 1,
        });
    };

    const handleSelectAll = () => {
        if (docs.length > selectedNum) {
            const payload = [
                ...selectStyleList,
                ...docs.filter(x => selectStyleList.findIndex(s => s.style === x._id) < 0).map(s => ({ style: s._id })),
            ];
            console.log('payload', payload);
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload,
            });
        } else {
            const payload = selectStyleList.filter(x => docs.findIndex(s => s._id === x.style) < 0);
            console.log('payload', payload);
            dispatch({
                type: 'diy/batchSetSelectStyleList',
                payload: payload,
            });
        }
    };
    useEffect(() => {
        if (Array.isArray(currentGood.category) && currentGood.category.length > 0) {
            handleSetCurrentGoodCategory(currentGood.category[0]._id);
            handleFetchMore('clear');
            form.resetFields();
            setQueryKey('');
        } else {
            handleSetCurrentGoodCategory('');
        }
    }, [currentGood]);

    useEffect(() => {
        if (collocationPattern !== 'single') {
            return;
        }
        if (docs && docs.length > 0) {
            dispatch({
                type: 'diy/setCurrentStyle',
                payload: docs[0],
            });
        } else {
            {
                dispatch({
                    type: 'diy/setCurrentStyle',
                    payload: {},
                });
            }
        }

        if (docs1 && docs1.length > 0) {
            dispatch({
                type: 'diy/setCurrentStyle1',
                payload: docs1[0],
            });
        } else {
            dispatch({
                type: 'diy/setCurrentStyle1',
                payload: {},
            });
        }
    }, [styleList, currentGoodCategoryMultiple, collocationPattern]);
    useEffect(() => {
        const finded = currentGood.category.find(x => x._id === currentGoodCategoryMultiple);
        // [].includes()
        setCurrentGoodCategoryIsTop(finded ? finded.name.includes('单衣') : false);
    }, [currentGood, currentGoodCategoryMultiple]);

    // useEffect(() => {
    //     // if (styleQueryKey) {
    //     handleFetchMore('clear');
    //     form.resetFields();
    //     setQueryKey('');
    // }, [currentGood]);

    useEffect(() => {
        if (currentGoodCategoryMultiple && queryKey) {
            // handleFetchMore('clear');
            form.resetFields();
            setQueryKey('');
        }
    }, [currentAdminChannel._id, currentGoodCategoryMultiple]);

    const handleSetCurrentGoodCategory = category => {
        if (!category) return;
        console.log('handleSetCurrentGoodCategory', category);
        dispatch({
            type: 'diy/setCurrentGoodCategoryMultiple',
            payload: category,
        });
        if (collocationPattern === 'single') {
            dispatch({
                type: 'diy/setSingleSelectColorList',
                payload: [],
            });
            dispatch({
                type: 'diy/setSingleSelectColorList1',
                payload: [],
            });
            dispatch({
                type: 'diy/batchSetSelectColorList',
                payload: { plainColors: [], flowerColors: [] },
            });
        }
    };

    // console.log('selectStyleList.length < docs.length ', selectStyleList, docs.length);
    return (
        <div
            id="multiple-mode"
            style={
                collocationPattern === 'single'
                    ? {
                          padding: '28px 0px',
                          background: '#222222',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          height: '100%',
                          justifyContent: 'space-between',
                          position: 'relative',
                      }
                    : {
                          padding: '28px 0px',
                          background: '#222222',
                          position: 'relative',
                      }
            }
        >
            <div
                style={{
                    marginBottom: collocationPattern === 'single' ? 0 : '60px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    width: '100%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '-10px',
                    }}
                >
                    <Select
                        value={currentGoodCategoryMultiple}
                        style={{ marginRight: '10px' }}
                        width="158px"
                        options={currentGood.category
                            .filter(x => (collocationPattern !== 'single' ? x.name.indexOf('分体') < 0 : true))
                            .map(c => ({ label: locale === 'en-US' ? c.enname : c.name, value: c._id }))}
                        onSelect={val => handleSetCurrentGoodCategory(val)}
                    />
                    {collocationPattern === 'single' ? null : (
                        <ReactSVG
                            src={AllIcon}
                            style={{
                                width: '20px',
                                height: '20px',
                                padding: '4px',
                                marginLeft: '14px',
                                marginBottom: '6px',
                                opacity: selectedNum < docs.length ? 0.3 : 1,
                            }}
                            onClick={() => {
                                handleSelectAll();
                            }}
                        />
                    )}
                </div>

                <Form form={form} name="control-hooks">
                    <Form.Item
                        name="code"
                        style={{
                            marginBottom: 0,
                            width: '180px',
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    >
                        <SearchInput
                            style={{
                                width: '180px',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                            placeholder="SEARCH STYLE"
                            onSearch={e => {
                                setQueryKey(e.target.value);
                                // handleFetchMore('keep', e.target.value);
                            }}
                        />
                    </Form.Item>
                </Form>
                {collocationPattern === 'single' ? (
                    <div style={{ display: 'flex',alignItems: 'center', }}>
                        <ReactSVG
                            src={ExpandIcon}
                            className="mode-icon"
                            onClick={() => {
                                handleChangeCollocationPattern('expand');
                            }}
                        />
                        <ReactSVG
                            src={SwitchBgIcon}
                            className="mode-icon"
                            style={{ margin: '0 12px' }}
                            onClick={() => {
                                // handleChangeCollocationBg(!collocationBg);
                                dispatch({
                                    type: 'diy/setCollocationBg',
                                    payload: !collocationBg,
                                });
                            }}
                        />
                        <ReactSVG
                            src={MultipleIcon}
                            className="mode-icon"
                            onClick={() => {
                                handleChangeCollocationPattern('multiple');
                            }}
                        />
                        <Select onClick={handleToggleTime} value="Time" disabled options={[{ label: 'Time', value: 'time' }]} style={{ marginLeft: '10px' }}/>
                    </div>
                ) : (
                    <div style={{ display: 'flex',alignItems: 'center', }}>
                        <ReactSVG
                            src={SingleIcon}
                            className="mode-icon"
                            style={{
                                opacity: assign ? 0 : 1,
                                pointerEvents: assign ? 'none' : 'painted',
                            }}
                            onClick={() => {
                                handleChangeCollocationPattern('single');
                            }}
                        />
                        <Select onClick={handleToggleTime} value="Time" disabled options={[{ label: 'Time', value: 'time' }]} style={{ marginLeft: '10px' }}/>
                    </div>
                )}

            </div>
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Spin size="large" spinning={fetchingStyles} />
            </div>

            {collocationPattern === 'single' ? (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div
                            style={{
                                display: 'flex',
                                height: '45px',
                                alignItems: 'center',
                                padding: '0 10px',
                                // opacity: selectColorList.filter(x => x?.type === 0).length > 0 ? 1 : 0,
                            }}
                        >
                            {colorList.docs
                                .filter(x => x.isSelected)
                                .map((d, index) => (
                                    <ColotItem
                                        size="12px"
                                        key={`bar-${d._id}`}
                                        // isSelected={d.isSelected}
                                        color={d.value}
                                    />
                                ))}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                height: '45px',
                                alignItems: 'center',
                                padding: '0 10px',
                                // opacity: selectColorList.filter(x => x?.type !== 0).length > 0 ? 1 : 0,
                            }}
                        >
                            {flowerList.docs
                                .filter(x => x.isSelected)
                                .map((d, index) => (
                                    <ImgItem
                                        size="12px"
                                        key={`bar-${d._id}-${index}`}
                                        // isSelected={d.isSelected}
                                        img={d.value}
                                    />
                                ))}
                        </div>
                    </div>

                    {categoryObj && categoryObj.name.indexOf('分体') >= 0 ? (
                        <MultipleStyleSelector
                            currentStyle={currentStyle}
                            selectColorList={singleSelectColorList}
                            currentStyleRegion={currentStyleRegion}
                            docs={docs}
                            handleSelectStyle={handleSelectStyle}
                            handleSetCurrentStyleRegion={handleSetCurrentStyleRegion}
                            currentStyle2={currentStyle1}
                            selectColorList2={singleSelectColorList1}
                            currentStyleRegion2={currentStyleRegion1}
                            docs2={docs1}
                            handleSelectStyle2={handleSelectStyle1}
                            handleSetCurrentStyleRegion2={handleSetCurrentStyleRegion1}
                            collocationBg={collocationBg}
                        />
                    ) : (
                        <SingleStyleSelector
                            currentStyle={currentStyle}
                            selectColorList={singleSelectColorList}
                            currentStyleRegion={currentStyleRegion}
                            docs={docs}
                            handleSelectStyle={handleSelectStyle}
                            handleSetCurrentStyleRegion={handleSetCurrentStyleRegion}
                            collocationBg={collocationBg}
                        />
                    )}
                </>
            ) : (
                <MultipleModeStyles
                    handleStyle={handleStyle}
                    assign={assign}
                    currentGoodCategoryIsTop={currentGoodCategoryIsTop}
                    docs={docs}
                />
            )}
        </div>
    );
};

export default connect(({ diy = {}, channel = {}, loading }) => ({
    fetchingStyles: loading.effects['diy/fetchStyleList'],
    styleList: diy.styleList,

    flowerList: diy.flowerList,
    colorList: diy.colorList,

    selectColorList: diy.selectColorList,
    selectStyleList: diy.selectStyleList,
    currentGood: diy.currentGood,
    currentGoodCategoryMultiple: diy.currentGoodCategoryMultiple,
    styleQueryKey: diy.styleQueryKey,
    styleQueryChangeKey: diy.styleQueryChangeKey,
    currentAdminChannel: channel.currentAdminChannel,
    singleSelectColorList: diy.singleSelectColorList,
    singleSelectColorList1: diy.singleSelectColorList1,

    currentStyle: diy.currentStyle,
    currentStyle1: diy.currentStyle1,
    currentStyleRegion: diy.currentStyleRegion,
    currentStyleRegion1: diy.currentStyleRegion1,
    collocationBg: diy.collocationBg,
    collocationPattern: diy.collocationPattern,
}))(App);
