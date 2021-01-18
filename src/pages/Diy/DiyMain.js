import React from 'react';
import ColorSelector from './ColorSelector';
import FlowerSelector from './FlowerSelector';
import StyleDIYCenter from './StyleDIYCenter/index';
import { ReactSVG } from 'react-svg';
import IconHeart from '@/public/icons/icon-heart.svg';
import IconUnHeart from '@/public/icons/icon-unheart.svg';

const App = props => {
    return (
        <div
            style={{ padding: '0 35px', width: '100%', background: '#323232' }}
        >
            <div
                style={{
                    width: 'cacl(100% - 70px)',
                    background: '#323232',
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <ColorSelector />
                <StyleDIYCenter />
                <FlowerSelector />
            </div>
            <div
                style={{
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div
                    style={{
                        width: '80px',
                        height: '28px',
                        borderRadius: '14px',
                        background: '#1C1C1C',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ReactSVG
                        src={IconUnHeart}
                        style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
