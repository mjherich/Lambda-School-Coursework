import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
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

//   useEffect(() => {
//     axios
//       .get("https://hacker-news.firebaseio.com/v0/user/okket.json?print=pretty")
//       .then(response => {
//         // console.log('HN api response', response, 'response.data.submitted', response.data.submitted.length)
//         setHnUserData(response.data);
//       });
//   }, []);

  return (
    <Card color={color(props.comment.saltyScore)} fluid>
        <div className="userCard">
          <div>{props.comment.comment}</div>
          <div>
            <div>{props.comment.saltyScore}% Salty</div>
          </div>
        </div>
    </Card>
  );
};

export default CommentCard;
