import { Card, Radio } from 'antd';
import Chart from 'bizcharts/lib/components/Chart';
import Coordinate from 'bizcharts/lib/components/Coordinate';
import Interval from 'bizcharts/lib/geometry/Interval';
import Line from 'bizcharts/lib/geometry/Line';
import Point from 'bizcharts/lib/geometry/Point';
import Axis from 'bizcharts/lib/components/Axis';
import Legend from 'bizcharts/lib/components/Legend';
import Tooltip from 'bizcharts/lib/components/Tooltip';

import { filterImageUrl } from '../../utils/helper';

import { useState } from 'react';
import { useIntl } from 'umi';
const colors = ['#6394f9', '#62daaa'];

export const OrderRank = ({ data: originData = [] }) => {
    const { formatMessage } = useIntl()
    let chartIns = null;
    const scale = {
        // tickCount控制双轴的对齐
        amount: {
            alias:  formatMessage({
                id: 'amount',
                defaultMessage:  '金额',
            }),
            min: 0,
            type: 'linear-strict', // (⚠️需要更新至4.1.x版本才能使用)
        },
        number: {
            min: 0,
            alias:  formatMessage({
                id: 'quantity',
                defaultMessage:  '数量',
            }),
            type: 'linear-strict',
        },
        date: {
            alias:  formatMessage({
                id: 'date',
                defaultMessage:  '日期',
            }),
            // type: 'timeCat',
            // mask: 'YYYY-MM-DD HH:mm:ss'
        },
    };
    return (
        <Card title={formatMessage({
            id: 'sales_graph_overview',
            defaultMessage:  '销售折线图',
        })}>
            <Chart
                scale={scale}
                onGetG2Instance={chart => {
                    chartIns = chart;
                }}
                autoFit
                height={500}
                data={originData}
            >
                <Tooltip shared showCrosshairs />
                <Line
                    position="date*amount"
                    color={colors[0]}
                    tooltip={[
                        'date*amount',
                        (date, amount) => {
                            // console.log("waiting", waiting);
                            const myTitle = date;
                            return {
                                name: '销售金额',
                                value: `${amount}`,
                                title: myTitle,
                            };
                        },
                    ]}
                />
                <Line
                    position="date*number"
                    color={colors[1]}
                    tooltip={[
                        'date*number',
                        (date, number) => {
                            // console.log("waiting", waiting);
                            const myTitle = date;
                            return {
                                name: '销售数量',
                                value: `${number}`,
                                title: myTitle,
                            };
                        },
                    ]}
                />
                <Point position="date*amount" color={colors[0]} size={4} shape="circle" tooltip={false} />
                <Point position="date*number" color={colors[1]} size={4} shape="circle" tooltip={false} />
                <Axis name="amount" title />
                <Axis name="number" title />
                <Axis name="date" title />
                <Legend
                    custom={true}
                    allowAllCanceled={true}
                    items={[
                        {
                            value: 'amount',
                            name: formatMessage({
                                id: 'amount',
                                defaultMessage:  '金额',
                            }),
                            marker: {
                                symbol: 'circle',
                                style: { fill: colors[0], r: 5 },
                            },
                        },
                        {
                            value: 'number',
                            name: formatMessage({
                                id: 'quantity',
                                defaultMessage:  '数量',
                            }),
                            marker: {
                                symbol: 'hyphen',
                                style: { stroke: colors[1], r: 5, lineWidth: 3 },
                            },
                        },
                    ]}
                    onChange={ev => {
                        console.log('ev', ev);
                        const item = ev.item;
                        const value = item.value;
                        const checked = !item.unchecked;
                        const geoms = chartIns.geometries;

                        for (let i = 0; i < geoms.length; i++) {
                            const geom = geoms[i];

                            if (geom.getYScale().field === value) {
                                if (checked) {
                                    geom.show();
                                } else {
                                    geom.hide();
                                }
                            }
                        }
                    }}
                />
                {/* <LineAdvance shape="smooth" point area position="date*amount" color="amount" /> */}
                {/* <LineAdvance shape="smooth" point area position="date*number" color="number" /> */}
                {/* <Line position="date*value" /> */}
                {/* <Point position="date*value" color="type" /> */}
                {/* <Tooltip showCrosshairs lock triggerOn="hover" /> */}
                {/* <Axis
                    name="销售件数"
                    title={{
                        position: 'center',
                        style: {
                            fontSize: '12',
                        },
                    }}
                /> */}
            </Chart>
        </Card>
    );
};

export const StyleRank = ({ data }) => {
    const { formatMessage } = useIntl()
    const [styleType, setStyleType] = useState('amount');
    return (
        <Card
            title={formatMessage({
                id: 'style_ranking',
                defaultMessage:  '款式销售排行',
            })}
            extra={
                <Radio.Group
                    style={{ color: '#00000073' }}
                    value={styleType}
                    onChange={e => {
                        setStyleType(e.target.value);
                    }}
                >
                    <Radio.Button value="amount">
                        {formatMessage({
                            id: 'sort_by_amount',
                            defaultMessage:  '按金额',
                        })}
                    </Radio.Button>
                    <Radio.Button value="number">
                        {formatMessage({
                            id: 'sort_by_quantity',
                            defaultMessage:  '按数量',
                        })}    
                    </Radio.Button>
                </Radio.Group>
            }
        >
            <Chart height={data.length * 60} data={data} autoFit>
                <Coordinate transpose />
                <Interval size={30} position={`styleNos*${styleType}`} />
            </Chart>
        </Card>
    );
};

export const UserRank = ({ data }) => {
    const { formatMessage } = useIntl()
    const [userType, setUserType] = useState('amount');
    return (
        <Card
            title={formatMessage({
                id: 'clients_ranking',
                defaultMessage:  '客户排行',
            })}
            extra={
                <Radio.Group
                    style={{ color: '#00000073' }}
                    value={userType}
                    onChange={e => {
                        setUserType(e.target.value);
                    }}
                >
                    <Radio.Button value="amount">{formatMessage({
                            id: 'sort_by_amount',
                            defaultMessage:  '按金额',
                        })}</Radio.Button>
                                        <Radio.Button value="number">                        
                        {formatMessage({
                            id: 'sort_by_quantity',
                            defaultMessage:  '按数量',
                        })} 
                    </Radio.Button>
                </Radio.Group>
            }
        >
            <Chart height={data.length * 60 + 80} data={data} autoFit>
                <Coordinate transpose />
                <Interval size={30} position={`user*${userType}`} />
            </Chart>
        </Card>
    );
};

export const CapsuleRank = ({ data }) => {
    const { formatMessage,locale } = useIntl()
    const [userType, setUserType] = useState('amount');
    return (
        <Card
            title={formatMessage({
                id: 'capsule_ranking',
                defaultMessage:  '胶囊系列排行',
            })}
            extra={
                <Radio.Group
                    style={{ color: '#00000073' }}
                    value={userType}
                    onChange={e => {
                        setUserType(e.target.value);
                    }}
                >
                    <Radio.Button value="amount">{formatMessage({
                            id: 'sort_by_amount',
                            defaultMessage:  '按金额',
                        })}</Radio.Button>
                    <Radio.Button value="number">                        
                        {formatMessage({
                            id: 'sort_by_quantity',
                            defaultMessage:  '按数量',
                        })} 
                    </Radio.Button>
                </Radio.Group>
            }
        >
            <Chart height={data.length * 60 + 80} autoFit data={data}>
                <Coordinate transpose />
                <Interval size={30} position={locale === 'en-US' ? `capsuleNameen*${userType}` : `capsuleNamecn*${userType}`} />
                {/* <Tooltip shared/> */}
            </Chart>
        </Card>
    );
};

export const ColorRank = ({ data }) => {
    const [userType, setUserType] = useState('amount');
    const { formatMessage } = useIntl()
    return (
        <Card
            title={formatMessage({
                id: 'color_ranking',
                defaultMessage:  '颜色排行',
            })}
            extra={
                <Radio.Group
                    style={{ color: '#00000073' }}
                    value={userType}
                    onChange={e => {
                        setUserType(e.target.value);
                    }}
                >
                    <Radio.Button value="amount">{formatMessage({
                            id: 'sort_by_amount',
                            defaultMessage:  '按金额',
                        })}</Radio.Button>
                    <Radio.Button value="number">                        
                        {formatMessage({
                            id: 'sort_by_quantity',
                            defaultMessage:  '按数量',
                        })} 
                    </Radio.Button>
                </Radio.Group>
            }
        >
            <Chart height={data.length * 60 + 80} autoFit data={data}>
                <Coordinate transpose />
                <Interval
                    size={30}
                    position={`code*${userType}`}
                    color={[
                        'value',
                        (xVal, o) => {
                            console.log('ooooo----', o);
                            return xVal;
                        },
                    ]}
                />
                {/* <Tooltip shared/> */}
            </Chart>
        </Card>
    );
};

export const ImgRank = ({ data }) => {
    const [userType, setUserType] = useState('amount');
    const { formatMessage } = useIntl()
    return (
        <Card
            title={formatMessage({
                id: 'pattern_ranking',
                defaultMessage:  '花布排行',
            })}
            extra={
                <Radio.Group
                    style={{ color: '#00000073' }}
                    value={userType}
                    onChange={e => {
                        setUserType(e.target.value);
                    }}
                >
                    <Radio.Button value="amount">{formatMessage({
                            id: 'sort_by_amount',
                            defaultMessage:  '按金额',
                        })}</Radio.Button>
                                        <Radio.Button value="number">                        
                        {formatMessage({
                            id: 'sort_by_quantity',
                            defaultMessage:  '按数量',
                        })} 
                    </Radio.Button>
                </Radio.Group>
            }
        >
            <Chart height={data.length * 60 + 80} data={data} autoFit>
                <Coordinate transpose />

                <Interval size={30} position={`code*${userType}`} />
                <Point
                    position={`code*${userType}`}
                    size={20}
                    shape={[
                        'code*value',
                        function(code, value) {
                            return ['image', filterImageUrl(value)];
                        },
                    ]}
                    label={userType}
                />
            </Chart>
        </Card>
    );
};
