import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Sector,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
const data = [
    { name: '8-1', salty: 1, sweet: 3.1 },
    { name: '8-2', salty: 0.9, sweet: 1.3 },
    { name: '8-3', salty: 1.9, sweet: 2 },
    { name: '8-4', salty: 1, sweet: 3.4 },
    { name: '8-5', salty: 0.9, sweet: 1.3 },
    { name: '8-6', salty: 1.3, sweet: 2 },
    { name: '8-7', salty: 1.1, sweet: 3.1 },
    { name: '8-8', salty: -0.9, sweet: 2 },
    { name: '8-9', salty: -1.9, sweet: 1 },
    { name: '8-10', salty: 0.1, sweet: 1.3 },
    { name: '8-11', salty: 1.9, sweet: 1.9 },
    { name: '8-12', salty: 1.4, sweet: 2.3 },
    { name: '8-13', salty: -1, sweet: 3 },
    { name: '8-14', salty: 0.5, sweet: 2 },
    { name: '8-15', salty: -0.9, sweet: 3 },
];

export const TimeChart = () => {
    return (
        <div>
            <Header
                as="h1"
                content="Saltiness over time"
                style={{ marginLeft: 45 }}
            />
            <LineChart width={600} height={200} data={data}>
                <Line type="monotone" dataKey="salty" stroke="#57bb12" />
                <Line type="monotone" dataKey="sweet" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
    );
};

export const TwoLevelPieChart = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (data, index) => {
        setActiveIndex(index);
    };

    const COLORS = ['#0088FE', '#00C49F'];

    const renderActiveShape = props => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value,
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill="#333"
                >{`${value} Comments`}</text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={18}
                    textAnchor={textAnchor}
                    fill="#999"
                >
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    return (
        <PieChart width={450} height={200}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={200}
                cy={100}
                innerRadius={40}
                outerRadius={60}
                onMouseEnter={onPieEnter}
            >
                {data.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};
