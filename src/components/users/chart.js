import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './user.scss';
import { Link } from 'react-router-dom';

const Chart = (props) => {
    let positive = props.users.map(function absoluteVal(user) {
        return {...user, score: Math.abs(user.score)}
    } )

    const handleClick = (e) => {
        // console.log(e.username)
        // I don't like hardcoding this, the alternative is to pass down props.match, but that isn't going through the pagination component right now.
        window.location.assign('https://hn-trolls.now.sh/users/' + e.username)
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
        <Bar dataKey="score" fill="#ffcd00" onClick={handleClick}><Link to="/"/></Bar>
      </BarChart>        
    )
}

export default Chart;

