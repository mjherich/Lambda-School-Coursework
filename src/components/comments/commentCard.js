import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";


const CommentCard = props => {
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

  return (
    <Card as={Link}
    to={`/users/${props.comment.username}`} color={color(props.comment.saltyScore)} fluid>
    <Card.Meta id="meta"><div>{"  "}</div>{props.comment.username}</Card.Meta>
      <div className="userCard">
        <Card.Content>
          <Icon name="quote left" size="small" />
          {strip(props.comment.text)}
          <Icon name="quote right" size="small" />
        </Card.Content>
        <div>
          <div>Salty Score: {props.comment.score}</div>
        </div>
      </div>
    </Card>
  );
};

export default CommentCard;
