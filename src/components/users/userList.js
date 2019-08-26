import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from './userCard';
import { Container, Card } from 'semantic-ui-react';

const UserList = props => {
  console.log('props in UserList', props)
  // useState to store user list
  const [users, setUsers] = useState([]);

  // axios inside useEffect to get list of users, and inside .then sorts this array by saltiness and does setUsers with result
  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/topsaltyusers.json?key=917e1550")
      .then(response => {
        // console.log("get response", response.data);
        let sortedBySalt = response.data.slice(0,10).sort((a, b) => {
          return b.saltyScore - a.saltyScore;
        });
        // console.log("sortedBySalt", sortedBySalt);
        setUsers(sortedBySalt);
      });
  }, []);

  // return .map over list of users, rendering a UserCard for each
  return (
      <Card.Group itemsPerRow='1'>
        {users.map(user => {
          return <UserCard user={user} props={props}/>;
        })}
      </Card.Group>
  );
};

export default UserList;
