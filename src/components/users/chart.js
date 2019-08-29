import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './user.scss';
import { Link } from 'react-router-dom';
import { useStateValue } from "../../state";

const Chart = (props) => {
    const [{ theme }, dispatch] = useStateValue();

    let positive = props.users.map(function absoluteVal(user) {
        return {...user, score: Math.abs(user.score)}
    } )

    const handleClick = (e) => {
        props.history.push(`/users/${e.username}`)
      }
    // console.log('props in chart', props)
    return (
      <BarChart
        className="barChart"
        width={800}
        height={300}
        data={positive}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="username" />
        <YAxis />
        <Tooltip />
        {/* <Legend /> */}
        <Bar dataKey="score" fill="#ffcd00" onClick={handleClick} />
      </BarChart>        
    )
}

export default Chart;

