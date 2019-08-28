import React from 'react';
import { Header } from 'semantic-ui-react';
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';
import { Segment } from 'semantic-ui-react';

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

export const TimeChart = ({ width = 600, height = 200 }) => {
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
