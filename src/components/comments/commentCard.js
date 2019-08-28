import React, { useState, useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";
// import "./user.scss";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const CommentCard = props => {
  console.log("props in commentCard", props);

  //   const [hnUserData, setHnUserData] = useState({});

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

  //   useEffect(() => {
  //     axios
  //       .get("https://hacker-news.firebaseio.com/v0/user/okket.json?print=pretty")
  //       .then(response => {
  //         // console.log('HN api response', response, 'response.data.submitted', response.data.submitted.length)
  //         setHnUserData(response.data);
  //       });
  //   }, []);

  return (
    <Card
      as={Link}
      to={`/users/${props.comment.username}`}
      color={color(props.comment.saltyScore)}
      fluid
    >
      <Card.Meta id="meta">
        <div>{"  "}</div>
        {props.comment.username}
      </Card.Meta>
      <div className="userCard">
        <Card.Content>
          <Icon name="quote left" size="small" />
          {strip(props.comment.text)}
          {"  "}
        </Card.Content>
        <div>
          <div>Salty Score: {props.comment.score}</div>
        </div>
      </div>
    </Card>
  );
};

export default CommentCard;
