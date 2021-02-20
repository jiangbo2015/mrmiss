import React from 'react';
import { connect } from 'dva';

import MultipleMode from './MultipleMode';
import SingleMode from './SingleMode';
import ExpandMode from './ExpandMode';
import BigPicColor from './BigPicColor';
import EditMode from './EditMode';

const App = ({ dispatch, collocationPattern }) => {
    return (
        <>
            <div
                style={{
                    flex: 1,
                    display: collocationPattern === 'paintPrew' ? 'initial' : 'none',
                }}
            ></div>
            <div
                style={{
                    width: 'calc(100% - 656px)',
                    display: collocationPattern === 'expand' ? 'initial' : 'none',
                }}
            >
                <ExpandMode />
            </div>
            <div
                style={{
                    width: 'calc(100% - 656px)',
                    display: collocationPattern === 'single' ? 'initial' : 'none',
                }}
            >
                <SingleMode />
            </div>
            <div
                style={{
                    flex: 1,
                    display: collocationPattern === 'multiple' || collocationPattern === 'assign' ? 'initial' : 'none',
                }}
            >
                <MultipleMode assign={collocationPattern === 'assign'} />
            </div>
            <div
                style={{
                    flex: 1,
                    display: collocationPattern === 'bigPicColor' ? 'initial' : 'none',
                }}
            >
                <BigPicColor />
            </div>
            <div
                style={{
                    flex: 1,
                    display: collocationPattern === 'edit' ? 'initial' : 'none',
                }}
            >
                <EditMode />
            </div>
        </>
    );
};

export default connect(({ diy = {} }) => ({
    styleList: diy.styleList,
    collocationPattern: diy.collocationPattern,
}))(App);
