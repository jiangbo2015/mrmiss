import UserInfoFrom from '@/components/UserInfoFrom';
import { Box, Flex } from 'rebass/styled-components';
import { Card } from 'antd';
import { Chart, Line, Point, Tooltip, Axis, Coordinate, Interval } from 'bizcharts';
const data = [
    {
        year: '2020-01',
        value: 30,
    },
    {
        year: '2020-02',
        value: 40,
    },
    {
        year: '2020-03',
        value: 35,
    },
    {
        year: '2020-04',
        value: 50,
    },
    {
        year: '2020-05',
        value: 49,
    },
    {
        year: '2020-06',
        value: 60,
    },
    {
        year: '2020-07',
        value: 70,
    },
    {
        year: '2020-08',
        value: 90,
    },
    {
        year: '2020-09',
        value: 80,
    },
];
const data1 = [
    {
        country: 'MM-01',
        population: 131744,
    },
    {
        country: 'MM-02',
        population: 104970,
    },
    {
        country: 'MM-05',
        population: 29034,
    },
    {
        country: 'MM-08',
        population: 23489,
    },
    {
        country: 'MM-09',
        population: 18203,
    },
    {
        country: 'MM-11',
        population: 18203,
    },
    {
        country: 'MM-24',
        population: 18203,
    },
    {
        country: 'MM-29',
        population: 18203,
    },
    {
        country: 'MM-19',
        population: 18203,
    },
    {
        country: 'MM-06',
        population: 18203,
    },
];
data1.sort((a, b) => a.population - b.population);
const data2 = [
    { year: '2020-01', sales: 38 },
    { year: '2020-02', sales: 52 },
    { year: '2020-03', sales: 61 },
    { year: '2020-04', sales: 45 },
    { year: '2020-05', sales: 48 },
    { year: '2020-06', sales: 38 },
    { year: '2020-07', sales: 38 },
    { year: '2020-08', sales: 38 },
];
const UserInfo = () => {
    return (
        <Box>
            <Flex>
                <Box width={1 / 2}>
                    <Card title="销售折线图">
                        <Chart
                            padding={[10, 20, 50, 50]}
                            autoFit
                            height={300}
                            data={data}
                            // onLineMouseleave={console.log}
                            // onPointClick={console.warn}
                            onAxisLabelClick={e => {
                                const { axis } = e.gEvent.delegateObject;
                                debugger;
                                alert(`you clicked axis: ${axis.get('field')}`);
                            }}
                        >
                            <Line position="year*value" />
                            <Point position="year*value" />
                            <Tooltip showCrosshairs lock triggerOn="click" />
                            <Axis
                                name="销售件数"
                                title={{
                                    position: 'center',
                                    style: {
                                        fontSize: '12',
                                    },
                                }}
                            />
                        </Chart>
                    </Card>
                    <Card title="历史对比图" style={{ marginTop: '20px' }}>
                        <Chart height={300} autoFit data={data2}>
                            <Interval position="year*sales" />
                        </Chart>
                    </Card>
                    <Card title="胶囊系列历史排名" style={{ marginTop: '20px' }}>
                        <Chart height={300} autoFit data={data2}>
                            <Interval color="year" position="year*sales" />
                        </Chart>
                    </Card>
                </Box>

                <Box width={1 / 4} pl="20px">
                    <Card title="款式销售排行">
                        <Chart height={800} data={data1} autoFit>
                            <Coordinate transpose />
                            <Interval position="country*population" />
                        </Chart>
                    </Card>
                </Box>
                <Box width={1 / 4} pl="20px">
                    <Card title="客户排行">
                        <Chart height={800} data={data1} autoFit>
                            <Coordinate transpose />
                            <Interval position="country*population" />
                        </Chart>
                    </Card>
                </Box>
            </Flex>
        </Box>
    );
};

export default UserInfo;
