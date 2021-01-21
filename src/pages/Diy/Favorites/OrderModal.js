import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import Modal from '@/components/Modal';

const App = ({ colorList = { docs: [] }, dispatch, visible, onCancel }) => {
    let { docs } = colorList;

    const handleSelectColor = color => {
        dispatch({
            type: 'diy/toogleSelectColor',
            payload: color,
        });
    };
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            width={'100%'}
            footer={null}
        >
            <p>context....</p>
            <p>context....</p>
            <p>context....</p>
        </Modal>
    );
};

export default connect(({ diy }) => ({
    colorList: diy.colorList,
    flowerList: diy.flowerList,
    selectColorList: diy.selectColorList,
}))(App);
