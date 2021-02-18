import CapsItem from '@/components/Capsule/CapsItem';
import ModalSimple from '@/components/Capsule/ModalSimple';
import More from '@/components/Capsule/More';

import SidebarStyles from '@/components/Capsule/SidebarStyles';
import Switcher from '@/components/Capsule/Switcher';

import Container from '@/components/Container';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import banner from '@/public/banner.jpeg';
// import carousel1 from '@/public/carousel1.jpg';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Flex } from 'rebass/styled-components';
import Carousel from '../Home/Carousel';
import ExbImage from './ExbImage';
import OrderMarkModal from './OrderMarkModal';
import { connect } from 'dva';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Search from '@/components/SearchInput';
import SelectedIcon from '@/public/icons/icon-selected-black.svg';

import { ReactSVG } from 'react-svg';
import IconCapsuleCar from '@/public/icons/icon-capsule-car.svg';

const Capsule = ({
    capsuleList,
    dispatch,
    currentCapsule = {},
    currentAdminChannel = { capsuleStyles: [] },
    capsuleStyleList = { docs: [] },
}) => {
    // swiper 实例
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [queryKey, setQueryKey] = useState('');
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectAssignedStyleList, setSelectAssignedStyleList] = useState([]);

    const [orderVisible, setOrderVisible] = useState(false);

    useEffect(() => {
        dispatch({
            type: 'capsule/fetchCapsuleList',
        });
    }, []);
    useEffect(() => {
        handleLoadMore(1);
    }, [currentCapsule, queryKey]);

    const handleLoadMore = page => {
        if (currentCapsule._id) {
            let payload = { capsule: currentCapsule._id, page: page ? page : capsuleStyleList.page + 1 };
            if (queryKey) {
                payload.code = queryKey;
            }

            dispatch({
                type: 'capsule/fetchCapsuleStyleList',
                payload,
            });
        }
    };

    useEffect(() => {
        const { capsuleStyles = [] } = currentAdminChannel;
        setSelectAssignedStyleList(capsuleStyles);
    }, [currentAdminChannel]);

    const handleSelectCapsule = capsule => {
        // if (currentAdminChannel.codename === 'A') {
        dispatch({
            type: 'capsule/setCurrentCapsule',
            payload: capsule,
        });
        // }
    };

    const handleOpenDetail = capsule => {
        if (currentAdminChannel.codename === 'A') {
            dispatch({
                type: 'capsule/setCurrentCapsuleStyle',
                payload: capsule,
            });
            setVisible(true);
        } else {
            // 分配
            const findIndex = selectAssignedStyleList.findIndex(x => x.style === capsule._id);
            // console.log('selectAssignedStyleList', selectAssignedStyleList);
            if (findIndex < 0) {
                // console.log({ style: capsule._id, price: capsule.price });x
                console.log('selectAssignedStyleList', selectAssignedStyleList);
                setSelectAssignedStyleList([...selectAssignedStyleList, { style: capsule._id, price: capsule.price }]);
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
        console.log('selectedAll', selectedAll);
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

    return (
        <Layout pt="74px">
            <Flex
                justifyContent="center"
                height="600px"
                width="100%"
                css={{
                    background: `url(${banner}) no-repeat`,
                    backgroundSize: 'cover',
                }}
            >
                {/* <Image src={banner} width="80vw" mx="auto"></Image> */}
            </Flex>
            <Box bg="#FDE7E1" py="90px" px="40px">
                <Title
                    title="Our capsule"
                    subtitle="This season's capsule is launched by mrmiss 2021 limited capsule series-parent-child family series. I hope you can find your favorite products here.."
                />
                <ExbImage imgsInfo={currentCapsule} />
                <Carousel carousels={capsuleList.map(c => c.covermap)} />
            </Box>
            <section>
                <Box bg="#fff" py="90px" maxWidth="1400px" mx="auto">
                    <Title title={currentCapsule.namecn} subtitle={currentCapsule.description} />
                </Box>
                <Box css={{ position: 'relative' }}>
                    <SidebarStyles data={capsuleList} selectedItem={currentCapsule} onSelect={handleSelectCapsule} />
                    <Container>
                        <Flex pt="30px" pb="79px" justifyContent="space-between">
                            <Search
                                onSearch={handleOnSearch}
                                mode="white"
                                style={{ width: '200px' }}
                                placeholder="SEARCH STYLE"
                            />
                            {currentAdminChannel.codename === 'A' ? null : (
                                <Flex alignItems="center">
                                    <Box bg="#DFDFDF" p="4px" mr="30px" width="24px" height="24px" sx={{ borderRadius: '4px' }}>
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

                                    <EditOutlined
                                        size="30px"
                                        style={{ fontSize: '32px', cursor: 'pointer' }}
                                        onClick={handleAssigned}
                                    />
                                </Flex>
                            )}

                            <Switcher assigned={currentCapsule} ref={ref}></Switcher>
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
                                    style={{ backgroundColor: '#D2D2D2', position: 'absolute', right: '20px' }}
                                />
                            ) : null}
                        </Flex>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, 380px)',
                                placeItems: 'center',
                                gap: '20px',
                            }}
                        >
                            {capsuleStyleList.docs.map((item, index) => {
                                const selected = selectAssignedStyleList.find(x => x.style === item._id);
                                return (
                                    <CapsItem
                                        item={item}
                                        key={item._id}
                                        handleOpen={() => handleOpenDetail(item)}
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
                </Box>
            </section>
            {visible && <ModalSimple visible={visible} onClose={() => setVisible(false)} />}
            {orderVisible && <OrderMarkModal visible={orderVisible} onCancel={() => setOrderVisible(false)} />}
        </Layout>
    );
};
export default connect(({ capsule = {}, channel = {}, user = {} }) => ({
    capsuleList: capsule.capsuleList,
    currentCapsule: capsule.currentCapsule,
    capsuleStyleList: capsule.capsuleStyleList,
    currentAdminChannel: channel.currentAdminChannel,
}))(Capsule);
