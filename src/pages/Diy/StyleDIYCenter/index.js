import React from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';
import SearchInput from '@/components/SearchInput';
import Select from '@/components/Select';
import StyleItem from '@/components/StyleItem';
import InfiniteScroll from 'react-infinite-scroll-component';

import MultipleMode from './MultipleMode';
import SingleMode from './singleMode';

import ExpandIcon from '@/public/icons/icon-expand.svg';
import MultipleIcon from '@/public/icons/icon-multiple.svg';
import SwitchBgIcon from '@/public/icons/icon-switch-bg.svg';

const renderContent = pattern => {
    let p = new Promise(resovle => {
        setTimeout(() => {
            resovle('go');
        }, time);
    });
    return p;
};

const App = ({ styleList = { docs: [] }, dispatch, collocationPattern }) => {
    return (
        <>
            <div
                style={{
                    flex: 1,
                    display:
                        collocationPattern === 'paintPrew' ? 'initial' : 'none',
                }}
            ></div>
            <div
                style={{
                    width: 'calc(100% - 656px)',
                    display:
                        collocationPattern === 'single' ? 'initial' : 'none',
                }}
            >
                <SingleMode />
            </div>
            <div
                style={{
                    flex: 1,
                    display:
                        collocationPattern === 'multiple' ? 'initial' : 'none',
                }}
            >
                <MultipleMode />
            </div>
        </>
    );
};

export default connect(({ diy }) => ({
    styleList: diy.styleList,
    collocationPattern: diy.collocationPattern,
}))(App);
