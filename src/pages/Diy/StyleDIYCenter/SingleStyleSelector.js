import React from 'react';
import Swiper from 'react-id-swiper';
import StyleItem from '@/components/StyleItem';

const App = ({
    currentStyle = {},
    selectColorList = [],
    currentStyleRegion,
    docs,
    handleSelectStyle,
    handleSetCurrentStyleRegion,
    collocationBg,
}) => {
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar-style2',
            hide: false,
        },
    };

    return docs.length === 0 ? null : (
        <>
            <div
                style={{
                    flex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '28px 0',
                    backgroundColor: collocationBg ? '#ffffff' : '#222222',
                    position: 'relative',
                }}
                onClick={() => {
                    handleSetCurrentStyleRegion(-1);
                }}
            >
                <div style={{ color: '#fff', position: 'absolute', top: '10px', right: 0 }}>{currentStyle.styleNo}</div>
                <div style={{ width: '20vw' }}>
                    <Swiper
                        {...params}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingBottom: '10px',
                            }}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="280px"
                                width={`${(currentStyle.styleSize / 27) * 14}vw`}
                                styleId={`single-${currentStyle._id}`}
                                colors={selectColorList}
                                {...currentStyle}
                                showGroupStroke={true}
                                curStylesEditGroupIndex={currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
                            />
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                paddingBottom: '10px',
                            }}
                        >
                            <StyleItem
                                // width="280px"
                                width={`${(currentStyle.styleBackSize / 27) * 14}vw`}
                                colors={selectColorList}
                                {...currentStyle}
                                styleId={`single-back-${currentStyle._id}`}
                                svgUrl={currentStyle.svgUrlBack}
                                showGroupStroke={true}
                                shadowUrl={currentStyle.shadowUrlBack}
                                styleSize={currentStyle.styleBackSize}
                                curStylesEditGroupIndex={currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
                            />
                        </div>
                    </Swiper>
                </div>
            </div>
            <div
                style={{
                    display: 'flex',
                    overflowX: 'scroll',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: '#1C1C1C',
                    paddingTop: '12px',
                }}
            >
                {docs.map((d, index) => (
                    <StyleItem
                        style={{
                            margin: '0 1.6vw 0 0.7vw',
                        }}
                        width={`${(d.styleSize / 27) * 7}vw`}
                        key={`${d._id}-${index}-${Math.random() * 1000000}`}
                        {...d}
                        onClick={() => {
                            handleSelectStyle(d);
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
