import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import "./user.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const UserCard = props => {
  console.log("props in userCard", props);
  // TODO: handleClick function. Should route to userPage by pushing that onto history. Or, wrap in Link.

  const [hnUserData, setHnUserData] = useState({});
  const [redirect, setRedirect] = useState(false);

  const color = saltyScore => {
    if (saltyScore <= 16.7) return "teal";
    else if (saltyScore <= 33.4) return "green";
    else if (saltyScore <= 50) return "olive";
    else if (saltyScore <= 66.7) return "yellow";
    else if (saltyScore <= 83.4) return "orange";
    else return "red";
  };

  // const handleClick = e => {
  // e.preventDefault();
  // props.props.history.push(`/${props.user.username}`);
  // };

  useEffect(() => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/user/okket.json?print=pretty")
      .then(response => {
        // console.log('HN api response', response, 'response.data.submitted', response.data.submitted.length)
        setHnUserData(response.data);
      });
  }, []);

  return (
    <Card as={Link} to={`/users/${props.user.username}`} color={color(props.user.saltyScore)} fluid>
      {/* <Link to={`/users/${props.user.username}`}> */}
        <div className="userCard">
          <div>{props.user.username}</div>
          <div>
            {hnUserData.submitted && (
              <div>Number of Comments: {hnUserData.submitted.length}</div>
            )}
            <div>Karma: {hnUserData.karma}</div>
            <div>Salty Score: {props.user.saltyScore}</div>
          </div>
        </div>
      {/* </Link> */}
    </Card>
  );
};

export default UserCard;
