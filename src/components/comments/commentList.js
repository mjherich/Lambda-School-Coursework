import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "./commentCard";
import { Card, Icon } from "semantic-ui-react";
import Pagination from "../common/Pagination";

const CommentList = props => {
  console.log("props in UserList", props);
  // useState to store user list
  const [comments, setComments] = useState([]);

  // axios inside useEffect to get list of users, and inside .then sorts this array by saltiness and does setUsers with result
  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/usercomments.json?key=917e1550")
      .then(response => {
        console.log("Comments get response", response.data);
        let sortedBySalt = response.data.sort((a, b) => {
          return b.saltyScore - a.saltyScore;
        });
        console.log("sortedBySalt", sortedBySalt);
        setComments(sortedBySalt);
      });
  }, []);

  // return .map over list of comments, rendering a CommentCard for each
  return (
    <Card.Group className="cardGroup" itemsPerRow="1">
      {comments !== [] ? <Pagination
        dataArray={comments}
        render={function paginatedData(props) {
          return (
            <>
              {props.handleShowCount(10)}
              {props.paginatedData.map(function renderPaginatedData(data) {
                return <CommentCard comment={data} />;
              })}
            </>
          );
        }}
      /> : <h1>Comments not found</h1>}

    </Card.Group>
  );
};

export default CommentList;
