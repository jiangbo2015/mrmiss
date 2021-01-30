import CirCleArrow from '@/public/icons/circle_arrow.svg';
import React, { forwardRef } from 'react';
import Swiper from 'react-id-swiper';
import { ReactSVG } from 'react-svg';
import { Box, Flex, Text } from 'rebass/styled-components';
import ABC from './ABC';
import styles from './switcher.less';

const settings = {
    slidesPerView: 3,
    spaceBetween: 10,
    activeSlideKey: 0,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
};

export const Arrow = ({ right, ...props }) => (
    <Box
        css={{
            display: 'inline-block',
        }}
        {...props}
    >
        <ReactSVG
            src={CirCleArrow}
            className={styles.nextIcon}
            style={
                right && {
                    transform: 'rotateZ(180deg)',
                }
            }
        />
    </Box>
);

export default forwardRef((props, ref) => {
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

    return (
        <Flex className="switcher">
            <Arrow onClick={goPrev} />
            <Swiper {...settings} ref={ref}>
                {ABC.map((item, i) => (
                    <Text key={i}>{item}</Text>
                ))}
            </Swiper>
            <Arrow right onClick={goNext} />
        </Flex>
    );
});
