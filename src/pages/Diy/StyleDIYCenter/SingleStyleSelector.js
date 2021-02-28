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
}) => {
    const params = {
        scrollbar: {
            el: '.swiper-scrollbar',
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
                }}
                onClick={() => {
                    handleSetCurrentStyleRegion(-1);
                }}
            >
                <div style={{ width: '320px' }}>
                    <Swiper
                        {...params}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                width: '320px',
                                display: 'flex',
                                justifyContent: 'center',
                                padding: '28px 0',
                            }}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="170px"
                                width={`${(currentStyle.styleSize / 27) * 180}px`}
                                styleId={`single-${currentStyle._id}`}
                                colors={selectColorList}
                                {...currentStyle}
                                styleId={currentStyle._id}
                                showGroupStroke={true}
                                curStylesEditGroupIndex={currentStyleRegion - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion}
                            />
                        </div>
                        <div
                            style={{
                                width: '320px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <StyleItem
                                width={`${(currentStyle.styleBackSize / 27) * 180}px`}
                                colors={selectColorList}
                                {...currentStyle}
                                styleId={`single-${currentStyle._id}`}
                                svgUrl={currentStyle.svgUrlBack}
                                showGroupStroke={true}
                                shadowUrl={currentStyle.shadowUrlBack}
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
                            margin: '0 60px 0 10px',
                        }}
                        width={`${(d.styleSize / 27) * 100}px`}
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
