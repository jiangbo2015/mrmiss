import React, { useEffect, useRef } from 'react';

import Swiper from 'react-id-swiper';
import { ReactSVG } from 'react-svg';
import CirCleArrow from '@/public/icons/circle_arrow.svg';
import styles from './index.less';
import { connect } from 'dva';

const settings = {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    renderPrevButton: props => <div {...props} class="swiper-button-next"></div>,
    renderNextButton: props => <div {...props} class="swiper-button-prev"></div>,
};

const ClassifyItem = ({ children, isSelected, ...props }) => (
    <div
        {...props}
        style={{
            padding: '0 11px',
            cursor: 'pointer',
            color: isSelected ? '#ffffff' : '#7B7B7B',
            fontSize: isSelected ? '16px' : '12px',
        }}
    >
        {children}
    </div>
);

const DiyHeader = ({ dispatch, goodsList = [], currentGood = {} }) => {
    useEffect(() => {
        dispatch({
            type: 'diy/fetchGoodsList',
        });
    }, []);

    useEffect(() => {
        if (goodsList.length > 0) {
            handleSelectGood(goodsList[Math.floor(goodsList.length / 2)]);
        }
    }, [goodsList]);

    const handleSelectGood = good => {
        dispatch({
            type: 'diy/setCurrentGood',
            payload: good,
        });
    };

    const handleChangeStep = step => {
        const index = goodsList.findIndex(x => x._id === currentGood._id);
        if (index < 0) return;
        const objIndex = (index + step + goodsList.length) % goodsList.length;
        dispatch({
            type: 'diy/setCurrentGood',
            payload: goodsList[objIndex],
        });
    };

    // console.log(swiperRef);
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
            <div className="diy-switch" style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
                <ReactSVG
                    src={CirCleArrow}
                    className={styles.nextIcon}
                    style={{
                        width: '18px',
                        height: '18px',
                    }}
                    onClick={() => {
                        handleChangeStep(-1);
                    }}
                />

                {goodsList.map(g => (
                    <ClassifyItem
                        isSelected={g._id === currentGood._id}
                        onClick={() => {
                            handleSelectGood(g);
                        }}
                    >
                        {g.name}
                    </ClassifyItem>
                ))}
                <ReactSVG
                    src={CirCleArrow}
                    className={styles.nextIcon}
                    style={{
                        width: '18px',
                        height: '18px',
                        transform: 'rotateZ(180deg)',
                    }}
                    onClick={() => {
                        handleChangeStep(1);
                    }}
                />
            </div>
        </div>
    );
};

export default connect(({ diy }) => ({ goodsList: diy.goodsList, currentGood: diy.currentGood }))(DiyHeader);
