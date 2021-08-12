import CapsItem from '@/components/Capsule/CapsItem';
import ModalSimple from '@/components/Capsule/ModalSimple';
import ModalComplex from '@/components/Capsule/ModalCapsuleComplex';

import More from '@/components/Capsule/More';

import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';

import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import lodash from 'lodash';
// import carousel1 from '@/public/carousel1.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex, Image } from 'rebass/styled-components';
// import Carousel from '../Home/Carousel';
// import ExbImage from './ExbImage';
import OrderMarkModal from './OrderMarkModal';
import { connect } from 'dva';
import { Button } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import Search from '@/components/SearchInput';
import SelectedIcon from '@/public/icons/icon-selected-black.svg';

import { ReactSVG } from 'react-svg';
import IconCapsuleCar from '@/public/icons/icon-capsule-car.svg';

const Capsule = ({
    capsuleList,
    dispatch,
    selectCapsuleList,
    currentCapsule = {},
    currentCapsuleStyle = {},
    currentSelectedBar = {},
    currentAdminChannel = { capsuleStyles: [] },
    capsuleStyleList = { docs: [] },
    capsuleStyleTopAndBottomList = {},
}) => {
    // swiper 实例
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [queryKey, setQueryKey] = useState('');
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedList, setSelectedList] = useState([]);

    const [selectAssignedStyleList, setSelectAssignedStyleList] = useState([]);
    const [haveTopAndBottom, setHaveTopAndBottom] = useState(false);
    const [isTopOrBottom, setIsTopOrBottom] = useState(false);
    const [visibleComplex, setVisibleComplex] = useState(false);

    const [orderVisible, setOrderVisible] = useState(false);

    const { capsuleStyles = [] } = currentAdminChannel;

    useEffect(() => {
        dispatch({
            type: 'capsule/fetchCapsuleList',
        });
    }, []);

    useEffect(() => {
        handleLoadMore(1);
    }, [queryKey, currentSelectedBar]);

    useEffect(() => {
        if (haveTopAndBottom) {
            console.log('haveTopAndBottom');
            dispatch({
                type: 'capsule/fetchCapsuleStyleTopAndList',
                payload: haveTopAndBottom,
            });
        }
    }, [haveTopAndBottom]);

    useEffect(() => {
        if (currentCapsuleStyle._id && currentCapsuleStyle.goodCategory) {
            // // console.log('currentCapsuleStyle', currentCapsuleStyle);
            let payload = { capsule: currentCapsule._id, goodCategray: currentCapsuleStyle.goodCategory.name, limit: 4 };
            dispatch({
                type: 'capsule/fetchCapsuleStyleAboutList',
                payload,
            });
        }
    }, [currentCapsuleStyle]);

    const handleLoadMore = page => {
        if (currentCapsule._id) {
            let payload = { capsule: currentCapsule._id, page: page ? page : capsuleStyleList.page + 1 };
            if (queryKey) {
                payload.code = queryKey;
            }
            if (currentCapsule._id !== currentSelectedBar._id) {
                payload.goodCategray = currentSelectedBar.namecn;
            }
            dispatch({
                type: 'capsule/fetchCapsuleStyleList',
                payload,
            });
        }
    };

    useEffect(() => {
        setSelectAssignedStyleList([...capsuleStyles]);
    }, [currentAdminChannel]);

    const handleSelectCapsule = (capsule, select) => {
        dispatch({
            type: 'capsule/setCurrentCapsule',
            payload: capsule,
        });
        dispatch({
            type: 'capsule/setCurrentSelectedBar',
            payload: select,
        });
    };

    useEffect(() => {
        if (currentAdminChannel.codename === 'A' && currentCapsule.children) {
            let haveTop = false;
            let haveBottom = false;
            currentCapsule.children.map(x => {
                if ((x.nameen && x.nameen.toUpperCase()) === 'TOP' || x.namecn === '单衣') {
                    haveTop = x;
                } else if ((x.nameen && x.nameen.toUpperCase()) === 'BOTTOM' || x.namecn === '单裤') {
                    haveBottom = x;
                }
            });

            if (haveTop && haveBottom) {
                setHaveTopAndBottom({ top: haveTop, bottom: haveBottom });
            } else {
                setHaveTopAndBottom(false);
            }
        }
    }, [currentCapsule, currentAdminChannel]);

    const handleOpenDetail = capsule => {
        if (currentAdminChannel.codename === 'A') {
            if (haveTopAndBottom && capsule.goodCategory) {
                let index = 0;
                if (capsule.goodCategory.name === haveTopAndBottom.top.namecn) {
                    // console.log('capsuleStyleTopAndBottomList', capsuleStyleTopAndBottomList)

                    index = capsuleStyleTopAndBottomList.top.findIndex(x => x._id === capsule._id);
                    // console.log('--top--',index);// currentCapsuleTopStyleIndex
                    dispatch({
                        type: 'capsule/setCurrentCapsuleTopStyleIndex',
                        payload: index > 0 ? index : 0,
                    });
                    dispatch({
                        type: 'capsule/setCurrentCapsuleBottomStyleIndex',
                        payload: lodash.random(capsuleStyleTopAndBottomList.bottom.length - 1),
                    });
                    setVisibleComplex(true);
                    return;
                } else if (capsule.goodCategory.name === haveTopAndBottom.bottom.namecn) {
                    index = capsuleStyleTopAndBottomList.bottom.findIndex(x => x._id === capsule._id);
                    dispatch({
                        type: 'capsule/setCurrentCapsuleBottomStyleIndex',
                        payload: index > 0 ? index : 0,
                    });
                    dispatch({
                        type: 'capsule/setCurrentCapsuleTopStyleIndex',
                        payload: lodash.random(capsuleStyleTopAndBottomList.top.length - 1),
                    });
                    // console.log('--bottom--',index);
                    setVisibleComplex(true);
                    return;
                }
            }

            dispatch({
                type: 'capsule/setCurrentCapsuleStyle',
                payload: capsule,
            });
            setVisible(true);
        } else {
            // 分配
            const findIndex = selectAssignedStyleList.findIndex(x => x.style === capsule._id);
            // // console.log('selectAssignedStyleList', selectAssignedStyleList);
            if (findIndex < 0) {
                // // console.log({ style: capsule._id, price: capsule.price });x
                // console.log('selectAssignedStyleList', selectAssignedStyleList);

                const findAssignIndex = capsuleStyles.findIndex(x => x.style === capsule._id);
                console.log('capsuleStyles[findAssignIndex]', findAssignIndex);
                console.log(currentAdminChannel);
                console.log(currentAdminChannel.capsuleStyles);
                setSelectAssignedStyleList([
                    ...selectAssignedStyleList,
                    { style: capsule._id, price: findAssignIndex < 0 ? capsule.price : capsuleStyles[findAssignIndex].price },
                ]);
            } else {
                selectAssignedStyleList.splice(findIndex, 1);
                setSelectAssignedStyleList([...selectAssignedStyleList]);
            }
        }
    };

    const handleAssigned = async () => {
        await dispatch({
            type: 'channel/update',
            payload: {
                codename: currentAdminChannel.codename,
                assignedId: currentAdminChannel.assignedId,
                capsuleStyles: selectAssignedStyleList,
            },
        });
    };

    const handleEditPrice = ({ price, style }) => {
        const findIndex = selectAssignedStyleList.findIndex(x => x.style === style);
        if (findIndex >= 0) {
            selectAssignedStyleList[findIndex].price = price;
            setSelectAssignedStyleList([...selectAssignedStyleList]);
        }
    };

    const handleSelectAll = () => {
        // // console.log('selectedAll', selectedAll);
        if (!selectedAll) {
            setSelectedAll(true);
            setSelectAssignedStyleList(
                selectAssignedStyleList.concat(
                    capsuleStyleList.docs
                        .filter(x => selectAssignedStyleList.findIndex(s => s.style === x._id) < 0)
                        .map(c => ({ style: c._id, price: c.price })),
                ),
            );
        } else {
            setSelectedAll(false);
            setSelectAssignedStyleList([]);
        }
    };

    const handleOnSearch = e => {
        setQueryKey(e.target.value);
    };

    const handleSelect = capsule => {
        // // console.log(capsule);
        const findIndex = selectedList.findIndex(x => x._id === capsule._id);
        if (findIndex < 0) {
            dispatch({
                type: 'capsule/setSelectCapsuleList',
                payload: [...selectCapsuleList, capsule],
            });
            // setSelectCapsuleList
            // setSelectedList([...selectedList, { style: capsule._id, price: capsule.price }]);
        } else {
            selectCapsuleList.splice(findIndex, 1);
            setSelectedList([...selectCapsuleList]);
        }
    };

    return (
        <Layout pt="74px" bg="#F7F7F7">
            <section>
                <Box bg="#F7F7F7" py="90px" maxWidth="1480px" mx="auto">
                    <Title title={currentCapsule.namecn} subtitle={currentCapsule.description} />
                </Box>

                <Flex css={{ position: 'relative' }} justifyContent="space-between" maxWidth="1480px" mx="auto">
                    <SidebarStyles data={capsuleList} selectedItem={currentSelectedBar} onSelect={handleSelectCapsule} />
                    <Container>
                        <Flex pt="30px" pb="20px" px="8px" justifyContent="space-between" sx={{ position: 'relative' }}>
                            <Search
                                onSearch={handleOnSearch}
                                mode="white"
                                style={{ width: '200px' }}
                                placeholder="SEARCH STYLE"
                            />
                            {/* {currentAdminChannel.codename === 'A' ? null : } */}

                            <Switcher assigned={currentCapsule} ref={ref} noRelative>
                                <Box
                                    bg="#DFDFDF"
                                    p="4px"
                                    mt="20px"
                                    width="24px"
                                    height="24px"
                                    sx={{
                                        borderRadius: '4px',
                                        visibility: currentAdminChannel.codename === 'A' ? 'hidden' : 'visible',
                                    }}
                                >
                                    <ReactSVG
                                        src={SelectedIcon}
                                        style={{
                                            width: '16px',
                                            height: '16px',
                                            opacity: selectedAll ? '1' : '0.3',
                                        }}
                                        onClick={handleSelectAll}
                                    />
                                </Box>
                            </Switcher>
                            <Flex width="200px" justifyContent="flex-end" alignItems="flex-start">
                                {currentAdminChannel.codename === 'A' ? ( //通道A才能下单
                                    <Button
                                        onClick={() => {
                                            setOrderVisible(true);
                                        }}
                                        shape="circle"
                                        size="large"
                                        icon={
                                            <ReactSVG
                                                style={{ width: '20px', height: '20px', margin: 'auto' }}
                                                src={IconCapsuleCar}
                                            />
                                        }
                                        style={{ backgroundColor: '#D2D2D2' }}
                                    />
                                ) : (
                                    <Flex alignItems="center">
                                        <SaveOutlined
                                            size="24px"
                                            style={{ fontSize: '24px', cursor: 'pointer', margin: '4px 0' }}
                                            onClick={handleAssigned}
                                        />
                                    </Flex>
                                )}
                            </Flex>
                        </Flex>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, 32.2%)',
                                placeItems: 'center',
                                gap: '20px',
                            }}
                        >
                            {capsuleStyleList.docs.map((item, index) => {
                                const selected =
                                    currentAdminChannel.codename === 'A'
                                        ? selectCapsuleList.find(x => x._id === item._id)
                                        : selectAssignedStyleList.find(x => x.style === item._id);
                                return (
                                    <CapsItem
                                        item={item}
                                        key={item._id}
                                        onSelect={handleSelect}
                                        handleOpen={() => handleOpenDetail(item, index)}
                                        curChannelPrice={selected ? selected.price : item.price}
                                        isSelect={!!selected}
                                        onEditPrice={currentAdminChannel.codename === 'A' || !selected ? null : handleEditPrice}
                                    />
                                );
                            })}
                        </Box>
                        <More
                            onLoadMore={() => {
                                handleLoadMore();
                            }}
                            hasMore={capsuleStyleList.page < capsuleStyleList.pages}
                        />
                    </Container>
                </Flex>
            </section>
            {visible && <ModalSimple visible={visible} onClose={() => setVisible(false)} isTopOrBottom={isTopOrBottom} />}
            {visibleComplex && <ModalComplex visible={visibleComplex} onClose={() => setVisibleComplex(false)} />}
            {orderVisible && <OrderMarkModal visible={orderVisible} onCancel={() => setOrderVisible(false)} />}
        </Layout>
    );
};
export default connect(({ capsule = {}, channel = {}, user = {} }) => ({
    capsuleList: capsule.capsuleList,
    currentCapsule: capsule.currentCapsule,
    currentCapsuleStyle: capsule.currentCapsuleStyle,
    capsuleStyleList: capsule.capsuleStyleList,
    currentSelectedBar: capsule.currentSelectedBar,
    currentAdminChannel: channel.currentAdminChannel,
    capsuleStyleTopAndBottomList: capsule.capsuleStyleTopAndBottomList,
    selectCapsuleList: capsule.selectCapsuleList,
}))(Capsule);
