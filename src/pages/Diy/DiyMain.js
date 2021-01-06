import React from 'react';
import ColorSelector from './ColorSelector';
import FlowerSelector from './FlowerSelector';
import StyleDIYCenter from './StyleDIYCenter';
const App = props => {
    console.log('diy sssss');
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
        </div>
    );
};

export default App;
