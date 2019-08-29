import React, { useState, useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";
import "./user.scss";
import { Link } from "react-router-dom";
import axios from "axios";

const UserCard = props => {
  const [hnUserData, setHnUserData] = useState({});
  // console.log('HN', hnUserData)
  const color = saltyScore => {
    if (saltyScore <= 16.7) return "teal";
    else if (saltyScore <= 33.4) return "green";
    else if (saltyScore <= 50) return "olive";
    else if (saltyScore <= 66.7) return "yellow";
    else if (saltyScore <= 83.4) return "orange";
    else return "red";
  };

  function strip(html) {
    var doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  useEffect(() => {
    axios
      .get(
        `https://hacker-news.firebaseio.com/v0/user/${props.user.username}.json?print=pretty`
      )
      .then(response => {
        setHnUserData(response.data);
      });
  }, []);
  return (
    <Card
      as={Link}
      to={`/users/${props.user.username}`}
      color={color(props.user.salt_score)}
      fluid
    >
      <div className="userCard">
        <div>
          <Card.Header as="h2">{props.user.username}</Card.Header>
          {hnUserData.submitted && (
            <Card.Meta>
              {hnUserData.submitted.length} Comments, {hnUserData.karma} Karma
            </Card.Meta>
          )}
          <div className="quote">
            <Icon name="quote left" size="small" />
            {strip(props.user.text).slice(0, 200)}...
          </div>
        </div>
        <div className="rightContent">
          <div className="score">Score: {props.user.score.toFixed(2)}</div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
