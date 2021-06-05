import CirCleArrow from '@/public/icons/circle_arrow.svg';
import CirCleArrowFill from '@/public/icons/circle_arrow_fill.svg';
import React, { forwardRef, useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import { ReactSVG } from 'react-svg';
import { Box, Flex, Text } from 'rebass/styled-components';
import { InputGray } from '@/components/Input';
import { connect } from 'dva';
import ABC from './ABC';
import styles from './switcher.less';

export const Arrow = ({ right, fill, ...props }) => (
    <Box
        css={{
            display: 'inline-block',
        }}
        {...props}
    >
        <ReactSVG
            src={fill ? CirCleArrowFill : CirCleArrow}
            className={styles.nextIcon}
            style={
                right && {
                    transform: 'rotateZ(180deg)',
                }
            }
        />
    </Box>
);

const SwitcherComponent = ({
    onChange = () => {},
    dispatch,
    myAdminChannelList = [],
    currentAdminChannel = {},
    assigned = {},
    currentUser,
    refInstance,
}) => {
    const ref = refInstance;
    const [curABC, setCurABC] = useState('A');
    const settings = {
        slidesPerView: 3,
        spaceBetween: 10,
        activeSlideKey: 0,
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            slideChange: () => {
                // // console.log('ABC[(ref.current.swiper.realIndex + 1) % 10]', ABC[(ref.current.swiper.realIndex + 1) % 10]);
                setCurABC(ABC[(ref.current.swiper.realIndex + 1) % 10]);
            },
        },
    };
    const [editChannelMark, setEditChannelMark] = useState(false);
    useEffect(() => {
        if (assigned && assigned._id) {
            let codename = curABC;
            const temp = myAdminChannelList.find(x => x.codename === codename);
            dispatch({
                type: 'channel/setCurrentChannel',
                payload: temp ? temp : { codename, assignedId: assigned._id, remark: '' },
            });
        }
    }, [myAdminChannelList, curABC]);
    useEffect(() => {
        // // console.log('useEffect assigned');
        if (ref.current !== null && ref.current.swiper !== null) {
            // // console.log('useEffect assigned');
            ref.current.swiper.slideTo(3);
        }
        if (assigned && assigned._id) {
            dispatch({
                type: 'channel/fetchMyAdminChannelList',
                payload: {
                    assignedId: assigned._id,
                },
            });
        }
    }, [assigned]);
    const goNext = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slideNext();
        }
    };

    const goPrev = () => {
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slidePrev();
        }
    };

    const handleUpdateRemarks = val => {
        dispatch({
            type: 'channel/update',
            payload: { remark: val, codename: curABC, assignedId: assigned._id },
        });
    };

    if (!currentUser.channelEmpowerUserd) return <Flex width="256px" />;
    return (
        <Flex className="switcher">
            <Arrow onClick={goPrev} />

            <div
                style={{ margin: '0 20px', position: 'relative' }}
                onClick={() => {
                    setEditChannelMark(true);
                }}
            >
                <Swiper
                    {...settings}
                    ref={ref}
                    onChange={(...args) => {
                        // // console.log('Swiper onChange', args);
                    }}
                >
                    {ABC.map((item, i) => (
                        <Text key={i}>{item}</Text>
                    ))}
                </Swiper>
                {curABC !== 'A' ? (
                    <Flex sx={{ position: 'absolute', right: 0, borderRadius: '6px', overflow: 'hidden', zIndex: 999 }} mt="20px">
                        <Flex bg="#BBBBBB" width="76px" fontSize="10px" p="6px 14px">
                            通道备注
                        </Flex>
                        <InputGray
                            style={{ width: '200px', color: '#767676' }}
                            placeholder="10字以内"
                            // defaultVaule={}
                            value={currentAdminChannel.remark}
                            onChange={e => {
                                dispatch({
                                    type: 'channel/setCurrentChannel',
                                    payload: { ...currentAdminChannel, remark: e.target.value },
                                });
                            }}
                            onBlur={e => {
                                if (handleUpdateRemarks) {
                                    handleUpdateRemarks(e.target.value);
                                }
                            }}
                            maxLength={10}
                        />
                    </Flex>
                ) : null}
            </div>
            <Arrow right onClick={goNext} />
        </Flex>
    );
};
const Switcher = connect(({ channel, user }) => ({
    myAdminChannelList: channel.myAdminChannelList,
    currentAdminChannel: channel.currentAdminChannel,
    currentUser: user.info,
}))(SwitcherComponent);
export default forwardRef((props, ref) => <Switcher {...props} refInstance={ref} />); //connect(() => ({}))(Switcher);
