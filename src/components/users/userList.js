import React, { useState, useEffect } from "react";
import axios from "axios";
import UserCard from "./userCard";
import { Card, Header } from "semantic-ui-react";
import Pagination from "../common/Pagination";
import "./user.scss";


import { useStateValue } from '../../state';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [{ theme }, dispatch] = useStateValue();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios
      .post("https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/salt", {"mode": "average"})
      .then(response => {
        let sorted = response.data.sort((a, b) => {
          return a.score - b.score
        })
        setUsers(sorted)
      });
  }, []);

  useEffect(() => {
    dispatch({
        type: 'updateTheme',
        payload: 'dark',
    });
}, []);
  return (
<div>
      <Header id="header" textAlign="center" as="h1" className="salty-title">Saltiest 100 Users</Header>
      <Card.Group className="cardGroup" itemsPerRow="1">

        {typeof users == "object" && users.length > 0 ? (
          <Pagination
            dataArray={users}
            render={function paginatedData(props) {
              return (
                <>
                  {props.handleShowCount(10)}
                  {props.paginatedData.map(function renderPaginatedData(data, index) {
                    return <UserCard key={index} user={data} />;
                  })}
                </>
              );
            }}
          />
        ) : (
          <div className="loading">
            {failed 
            ? <h1>failed to load resource</h1>
            //  credit to https://loading.io/css/
            : <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            }
            {(function checkUsers(){
              return setTimeout(function inTenSeconds(){
                if(users.length == 0){
                  setFailed(true);
                }
                return null;
              },10000)
            })()}
          </div>
        )}
      </Card.Group>
</div>
  );
};

export default UserList;
