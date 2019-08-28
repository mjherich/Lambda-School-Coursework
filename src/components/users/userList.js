import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";
import { Card, Header, Form, Radio, Container } from "semantic-ui-react";
import Pagination from "../common/Pagination";
import "./user.scss";
import Example from "./chart";

import { useStateValue } from "../../state";

const UserList = props => {
  // console.log("props in UserList", props);

  const [users, setUsers] = useState([]);
  const [{ theme }, dispatch] = useStateValue();
  const [mode, setMode] = useState("average");

  useEffect(() => {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/salt",
        { mode: `${mode}` }
      )
      .then(response => {
        console.log("100 users response", response);
        let sorted = response.data.sort((a, b) => {
          return a.score - b.score;
        });
        setUsers(sorted);
      });
  }, [mode]);

  //   useEffect(() => {
  //     console.log(theme);
  //     dispatch({
  //         type: 'updateTheme',
  //         payload: 'dark',
  //     });
  // }, []);

  // console.log(theme);

  // return paginated .map over list of users, rendering a UserCard for each
  return (
    <div>
      <Header id="header" textAlign="center" as="h1">
        Saltiest 100 Users
      </Header>
<div className="topContent">
        <Example />
        <Form compact className="modeToggle">
          <Form.Field>Rank By:</Form.Field>
          <Form.Field>
            <Radio
              label="Average Saltiness"
              name="radioGroup"
              value="average"
              checked={mode === "average"}
              onChange={e => {
                e.preventDefault();
                setMode("average");
              }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Total Saltiness"
              name="radioGroup"
              value="total"
              checked={mode === "total"}
              onChange={e => {
                e.preventDefault();
                setMode("total");
              }}
            />
          </Form.Field>
        </Form>
</div>
      <Card.Group className="cardGroup" itemsPerRow="1">
        {users !== [] ? (
          <Pagination
            dataArray={users}
            render={function paginatedData(props) {
              return (
                <>
                  {props.handleShowCount(10)}
                  {props.paginatedData.map(function renderPaginatedData(data) {
                    return <UserCard user={data} mode={mode} />;
                  })}
                </>
              );
            }}
          />
        ) : (
          <h1>Users not found</h1>
        )}
      </Card.Group>
    </div>
  );
};

export default UserList;
