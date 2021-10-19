
import { Card,Radio } from 'antd';
import Chart from 'bizcharts/lib/components/Chart';
import Coordinate from 'bizcharts/lib/components/Coordinate';
import Interval from 'bizcharts/lib/geometry/Interval';
import Line from 'bizcharts/lib/geometry/Line';
import Point from 'bizcharts/lib/geometry/Point';
import Axis from 'bizcharts/lib/components/Axis';
import Legend from 'bizcharts/lib/components/Legend';

import {filterImageUrl} from '../../utils/helper'

import { useState } from 'react';
const colors = ["#6394f9", "#62daaa"];

export const OrderRank = ({ data: originData = [] }) => {
    let chartIns = null;
    const scale = {
        // tickCount控制双轴的对齐
        amount: {
            alias: "金额",
            min: 0,
            type: 'linear-strict'// (⚠️需要更新至4.1.x版本才能使用)
        },
        number: {
            min: 0,
            alias: "数量",
            type: 'linear-strict'
        },
        date: {
            alias: "日期",
            // type: 'timeCat',
            // mask: 'YYYY-MM-DD HH:mm:ss'
        },
    };
    return (
        <Card title="销售折线图">
            <Chart scale={scale}
				onGetG2Instance={(chart) => {
					chartIns = chart;
				}} autoFit height={500} data={originData}>
                <Line
					position="date*amount"
					color={colors[0]}
					tooltip={[
						"date*amount",
						(date, amount) => {
							// console.log("waiting", waiting);
							const myTitle = date;
							return {
								name: "销售金额",
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
						"date*number",
						(date, number) => {
							// console.log("waiting", waiting);
							const myTitle = date;
							return {
								name: "销售数量",
								value: `${number}`,
								title: myTitle,
							};
						},
					]}
				/>
                <Axis name="amount" title />
				<Axis name="number" title />
				<Axis name="date" title/>
                <Legend
					custom={true}
					allowAllCanceled={true}
					items={[
						{
							value: "amount",
							name: "金额",
							marker: {
								symbol: "circle",
								style: { fill: colors[0], r: 5 },
							},
						},
						{
							value: "number",
							name: "数量",
							marker: {
								symbol: "hyphen",
								style: { stroke: colors[1], r: 5, lineWidth: 3 },
							},
						},
					]}
					onChange={(ev) => {
						console.log("ev", ev);
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
    const [styleType, setStyleType] = useState('amount')
    return (
    <Card title="款式销售排行" extra={
    <Radio.Group style={{color: '#00000073'}} value={styleType} 
        onChange={(e) => {
        setStyleType(e.target.value)}}>
    <Radio.Button value="amount">按金额</Radio.Button>
    <Radio.Button value="number">按数量</Radio.Button>
  </Radio.Group>}>
        <Chart height={data.length*60} data={data} autoFit>
            <Coordinate transpose />
            <Interval 
                size={30}
                position={`styleNos*${styleType}`}
            />
        </Chart>
    </Card>
);}

export const UserRank = ({ data }) => {
    const [userType, setUserType] = useState('amount')
    return (
    <Card title="客户排行" extra={
    <Radio.Group style={{color: '#00000073'}} value={userType} 
        onChange={(e) => {
            setUserType(e.target.value)}}>
    <Radio.Button value="amount">按金额</Radio.Button>
    <Radio.Button value="number">按数量</Radio.Button>
  </Radio.Group>}>
        <Chart height={data.length*60} data={data} autoFit>
            <Coordinate transpose />
            <Interval size={30} position={`user*${userType}`} />
        </Chart>
    </Card>
)};



export const CapsuleRank = ({ data }) => {
    const [userType, setUserType] = useState('amount')
    return (
    <Card title="胶囊系列排行" extra={
    <Radio.Group style={{color: '#00000073'}} value={userType} 
        onChange={(e) => {
            setUserType(e.target.value)}}>
    <Radio.Button value="amount">按金额</Radio.Button>
    <Radio.Button value="number">按数量</Radio.Button>
  </Radio.Group>}>
  <Chart height={300} autoFit data={data} >
		<Interval size={30} position={`capsuleNamecn*${userType}`} />
		{/* <Tooltip shared/> */}
        </Chart>
    </Card>
)};


export const ColorRank = ({ data }) => {
    const [userType, setUserType] = useState('amount')
    return (
    <Card title="颜色排行" extra={
    <Radio.Group style={{color: '#00000073'}} value={userType} 
        onChange={(e) => {
            setUserType(e.target.value)}}>
    <Radio.Button value="amount">按金额</Radio.Button>
    <Radio.Button value="number">按数量</Radio.Button>
  </Radio.Group>}>
  <Chart height={300} autoFit data={data} >
        <Coordinate transpose />
		<Interval size={30} position={`code*${userType}`} 
            color={['value', (xVal, o) => {
            console.log('ooooo----', o)
            return xVal;
          }]}
        />
		{/* <Tooltip shared/> */}
        </Chart>
    </Card>
)};

export const ImgRank = ({ data }) => {
    const [userType, setUserType] = useState('amount')
    return (
    <Card title="花布排行" extra={
    <Radio.Group style={{color: '#00000073'}} value={userType} 
        onChange={(e) => {
            setUserType(e.target.value)}}>
    <Radio.Button value="amount">按金额</Radio.Button>
    <Radio.Button value="number">按数量</Radio.Button>
  </Radio.Group>}>
  <Chart height={data.length*60+80} data={data}  autoFit>
        <Coordinate transpose />
 
		<Interval size={30} position={`code*${userType}`}/>
        <Point
            position={`code*${userType}`}
            size={20}
            shape={[
              "code*value",
              function(code,value) {
                return ["image", filterImageUrl(value)];
              }
            ]}
            label={userType}
          />
          
        </Chart>
    </Card>
)};
