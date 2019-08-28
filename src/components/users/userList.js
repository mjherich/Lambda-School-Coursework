import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";
import { Card, Header } from "semantic-ui-react";
import Pagination from "../common/Pagination";
import "./user.scss";

const UserList = props => {
  // console.log("props in UserList", props);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .post("https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/salt", {"mode": "average"})
      .then(response => {
        console.log('100 users response', response)
        let sorted = response.data.sort((a, b) => {
          return a.score - b.score
        })
        setUsers(sorted)
      
        // let json = JSON.parse(response.data)
        // console.log('JSON', json)
      });
  }, []);

  // return paginated .map over list of users, rendering a UserCard for each
  return (
<div>
      <Header id="header" textAlign="center" as="h1">Saltiest 100 Users</Header>
      <Card.Group className="cardGroup" itemsPerRow="1">
        {users !== [] ? (
          <Pagination
            dataArray={users}
            render={function paginatedData(props) {
              return (
                <>
                  {props.handleShowCount(10)}
                  {props.paginatedData.map(function renderPaginatedData(data) {
                    return <UserCard user={data} />;
                  })}
                </>
              );
            }}
          />
        ) : (
          <h1>Users not found</h1>
        )}
        {/* {uses.map(user => {
          return <UserCard user={user} props={props} />;
        })} */}
      </Card.Group>
</div>
  );
};

export default UserList;
