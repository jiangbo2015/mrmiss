import React, { useRef, useEffect } from 'react';
import { connect } from 'dva';
import { ReactSVG } from 'react-svg';

import NarrowIcon from '@/public/icons/icon-narrow.svg';
import { filterImageUrl } from '@/utils/helper';

const App = ({ dispatch, bigPicColor, collocationPattern }) => {
    const ref = useRef();
    useEffect(() => {
        if (collocationPattern !== 'bigPicColor') {
            ref.current = collocationPattern;
        }
    }, [collocationPattern]);
    const handleChangeCollocationPattern = () => {
        dispatch({
            type: 'diy/setCollocationPattern',
            payload: ref.current,
        });
    };
    return (
        <div
            style={{
                padding: '28px 20px',
                background: '#222222',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                justifyContent: 'space-between',
            }}
        >
            <div
                style={{
                    marginBottom: '60px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <ReactSVG
                    src={NarrowIcon}
                    className="mode-icon"
                    onClick={() => {
                        handleChangeCollocationPattern();
                    }}
                />
            </div>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <img src={filterImageUrl(bigPicColor.value)} style={{ width: '300px', height: 'auto' }} />
            </div>
        </div>
    );
};

export default connect(({ diy = {} }) => ({
    bigPicColor: diy.bigPicColor,
    collocationPattern: diy.collocationPattern,
}))(App);
