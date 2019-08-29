import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";
import { Card, Header, Form, Radio, Container } from "semantic-ui-react";
import Pagination from "../common/Pagination";
import "./user.scss";
import Chart from "./chart";
import { average, total } from "../../state/DataSnapshots";

import { useStateValue } from "../../state";

const UserList = () => {
  const sortedAverage = average.sort((a, b) => {
    return a.score - b.score;
  });
  const sortedTotal = total.sort((a, b) => {
    return a.score - b.score;
  });

  const [{ theme }, dispatch] = useStateValue();
  const [failed, setFailed] = useState(false);
  // const [mode, setMode] = useState("average");
  const [users, setUsers] = useState(sortedAverage);
  console.log("users", users);

  // Because the endpoint /salt makes a slow SQL call, we instead use periodically snapshotted data, temporarily.
  // useEffect(() => {
  //   axios
  //     .post(
  //       "https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/salt",
  //       { mode: `${mode}` }
  //     )
  //     .then(response => {
  //       let sorted = response.data.sort((a, b) => {
  //         return a.score - b.score;
  //       });
  //       setUsers(sorted);
  //     })
  //     .catch(err => {
  //       console.log(err)

  //     })
  // }, [mode]);

  useEffect(() => {
    dispatch({
      type: "updateTheme",
      payload: "dark"
    });
  }, []);

  return (
    <div>
      <Header id="header" textAlign="center" as="h1">
        Saltiest 100 Users
      </Header>
      <div className="topContent">
        <Chart users={users} />
        <Form className="modeToggle">
          <Form.Field>Rank By:</Form.Field>
          <Form.Field>
            <Radio
              label="Average Saltiness"
              name="radioGroup"
              value="average"
              checked={users === average}
              onChange={e => {
                e.preventDefault();
                setUsers(sortedAverage);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label="Total Saltiness"
              name="radioGroup"
              value="total"
              checked={users === total}
              onChange={e => {
                e.preventDefault();
                setUsers(sortedTotal);
              }}
            />
          </Form.Field>
        </Form>
      </div>
      {/* <SaltyKarma users={users}/> Todo: refactor with context api to store HN data and pass it to scatterplot, usercards*/}
      <Card.Group className="cardGroup" itemsPerRow="1">
        {typeof users == "object" && users.length > 0 ? (
          <Pagination
            dataArray={users}
            render={function paginatedData(props) {
              return (
                <>
                  {props.handleShowCount(10)}

                  {props.paginatedData.map(function renderPaginatedData(
                    data,
                    index
                  ) {
                    return <UserCard key={index} user={data} />;
                  })}
                </>
              );
            }}
          />
        ) : (
          <div className="loading">
            {failed ? (
              <h1>failed to load resource</h1>
            ) : (
              //  credit to https://loading.io/css/
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            )}
            {function checkUsers() {
              return setTimeout(function inTenSeconds() {
                if (users.length == 0) {
                  setFailed(true);
                }
                return null;
              }, 10000);
            }}
          </div>
        )}
      </Card.Group>
    </div>
  );
};

export default UserList;
