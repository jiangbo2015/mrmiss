import React from 'react';
import Swiper from 'react-id-swiper';
import StyleItem from '@/components/StyleItem';

const App = ({
    currentStyle = {},
    currentStyle2 = {},
    selectColorList = [],
    selectColorList2 = [],
    currentStyleRegion,
    currentStyleRegion2,
    docs,
    docs2,
    handleSelectStyle,
    handleSetCurrentStyleRegion,
    handleSelectStyle2,
    handleSetCurrentStyleRegion2,
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
                    minHeight: '500px',
                    width: '100%',
                    display: 'flex',

                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                }}
                onClick={() => {
                    handleSetCurrentStyleRegion(-1);
                    handleSetCurrentStyleRegion2(-1);
                }}
            >
                <div style={{ width: '300px', marginBottom: '34px' }}>
                    <Swiper
                        {...params}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="170px"
                                width={`${(currentStyle.styleSize / 27) * 170}px`}
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
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <StyleItem
                                width={`${(currentStyle.styleBackSize / 27) * 170}px`}
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
                <div style={{ width: '300px' }}>
                    <Swiper
                        {...params}
                        style={{
                            margin: '0 auto',
                        }}
                    >
                        <div
                            style={{
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            onClick={e => {
                                e.stopPropagation();
                            }}
                        >
                            <StyleItem
                                // width="170px"
                                width={`${(currentStyle2.styleSize / 27) * 170}px`}
                                styleId={`single-${currentStyle2._id}`}
                                colors={selectColorList}
                                {...currentStyle2}
                                styleId={currentStyle2._id}
                                showGroupStroke={true}
                                curStylesEditGroupIndex={currentStyleRegion2 - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion2}
                            />
                        </div>
                        <div
                            style={{
                                width: '300px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <StyleItem
                                width={`${(currentStyle2.styleBackSize / 27) * 170}px`}
                                colors={selectColorList}
                                {...currentStyle2}
                                styleId={`single-${currentStyle2._id}`}
                                svgUrl={currentStyle2.svgUrlBack}
                                showGroupStroke={true}
                                shadowUrl={currentStyle2.shadowUrlBack}
                                curStylesEditGroupIndex={currentStyleRegion2 - 1}
                                onSetEditSvgGroupIndex={handleSetCurrentStyleRegion2}
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
                    margin: '12px 0',
                }}
            >
                {docs.map((d, index) => (
                    <StyleItem
                        style={{
                            margin: '0 100px 0 10px',
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
                {docs2.map((d, index) => (
                    <StyleItem
                        style={{
                            margin: '0 100px 0 10px',
                        }}
                        width={`${(d.styleSize / 27) * 100}px`}
                        key={`${d._id}-${index}-${Math.random() * 1000000}`}
                        {...d}
                        onClick={() => {
                            handleSelectStyle2(d);
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default App;
