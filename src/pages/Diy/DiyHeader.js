import React, { useEffect, useRef } from 'react';

import Swiper from 'react-id-swiper';
import { Carousel } from 'antd';
import Slider from 'react-slick';
import { ReactSVG } from 'react-svg';
import CirCleArrow from '@/public/icons/circle_arrow.svg';
import styles from './index.less';
// import 'swiper/swiper.css';

const settings = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    renderPrevButton: props => (
        <div {...props} class="swiper-button-next">
            <ReactSVG
                src={CirCleArrow}
                className={styles.nextIcon}
                style={{
                    width: '18px',
                    height: '18px',
                    transform: 'rotateZ(180deg)',
                }}
            />
        </div>
    ),
    renderNextButton: props => (
        <div {...props} class="swiper-button-prev">
            <ReactSVG
                src={CirCleArrow}
                className={styles.nextIcon}
                style={{
                    width: '18px',
                    height: '18px',
                }}
            />
        </div>
    ),
};

const ClassifyItem = ({ children, isSelected, ...props }) => (
    <div
        {...props}
        style={{
            padding: '0 11px',
            cursor: 'pointer',
            color: '#7B7B7B',
        }}
    >
        {children}
    </div>
);

const DiyHeader = props => {
    useEffect(() => {}, []);
    const swiperRef = useRef();

    console.log(swiperRef);
    return (
        <div
            style={{
                marginTop: '74px',
                background: '#323232',
                // display: 'flex',
                width: '100%',
                height: '110px',
            }}
        >
            <div
                style={{
                    width: '230px',
                    margin: 'auto',
                }}
            >
                <Swiper {...settings}>
                    <ClassifyItem>Italy</ClassifyItem>
                    <ClassifyItem>Spain</ClassifyItem>
                    <ClassifyItem>California</ClassifyItem>
                    <ClassifyItem>ShangHai</ClassifyItem>
                    <ClassifyItem>BeiJing</ClassifyItem>
                </Swiper>
            </div>
        </div>
    );
};

export default DiyHeader;
