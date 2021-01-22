import React from 'react';
import { connect } from 'dva';

import MultipleMode from './MultipleMode';
import SingleMode from './SingleMode';
import ExpandMode from './ExpandMode';

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
                        collocationPattern === 'expand' ? 'initial' : 'none',
                }}
            >
                <ExpandMode />
            </div>
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
