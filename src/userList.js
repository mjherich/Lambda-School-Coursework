import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = (props) => {

    // useState to store user list
    const [users, setUsers] = useState([])

    // axios inside useEffect to get list of users, and inside .then sorts this array by saltiness and does setUsers with result
    useEffect(()=>{
        axios.get('https://my.api.mockaroo.com/topsaltyusers.json?key=917e1550')
        .then((response) => {
            console.log('get response', response.data)
            const array = response.data
            let sortedBySalt = response.data.sort((a, b) => {
                return b.saltyScore - a.saltyScore;
            })
            console.log('sortedBySalt', sortedBySalt)
            setUsers(sortedBySalt);
        })
    },[])
    // handleClick function. Should route to userPage by pushing that onto history


    // return .map over list of users, rendering a card for each

    return (
<div>
            <h1>100 Saltiest Users</h1>
            {users.map((user) => {
                return <div>Username: {user.username} Salty Score: {user.saltyScore}</div>
            })}
</div>
    )
}

export default UserList;