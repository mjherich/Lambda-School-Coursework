import React, { useEffect, useState } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from 'recharts';
import axios from 'axios';

// WIP
// Todo: refactor with context api to store HN data and pass it to scatterplot, usercards

const SaltyKarma = (props) => {

    console.log('props in saltyKarma', props)
    const data = props.users
    const [hnUsers, setHnUsers] = useState([]);
    console.log('HN Users array',hnUsers)

    useEffect(() => {
        data.forEach((user) => {
            axios
              .get(
                `https://hacker-news.firebaseio.com/v0/user/${user.username}.json?print=pretty`
              )
              .then(response => {
                // console.log('HN api response', response, 'response.data.submitted', response.data.submitted.length)
                setHnUsers([...hnUsers, response.data])
              });
        })
      }, [data]);

    return (
        <ScatterChart
          width={600}
          height={600}
          margin={{
            top: 20, right: 20, bottom: 20, left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="num_posts" name="num_posts" label="Number of Posts"/>
          <YAxis type="number" dataKey="score" name="score" label="User's Saltiness Score"/>
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Number of Posts vs User Saltiness" data={data} fill="#8884d8">
            <LabelList dataKey="username" />
          </Scatter>
        </ScatterChart>
      );
}



export default SaltyKarma;
