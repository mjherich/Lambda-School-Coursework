import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCard from "./commentCard";
import { Card, Header } from "semantic-ui-react";
import Pagination from "../common/Pagination";

const CommentList = props => {
  // console.log("props in CommentList", props);
  // useState to store user list
  const [comments, setComments] = useState([]);
  const [failed, setFailed] = useState(false);

  // axios inside useEffect to get list of users, and inside .then sorts this array by saltiness and does setUsers with result
  useEffect(() => {
    axios
      .post(
        "https://cors-anywhere.herokuapp.com/http://hackernews-serving.herokuapp.com/comment",
        { username: "swombat" }
      )
      .then(response => {
        // console.log("Comments post response", response.data);
        let sortedBySalt = response.data.sort((a, b) => {
          return a.score - b.score;
        });
        // console.log("sortedBySalt", sortedBySalt);
        setComments(sortedBySalt);
      })
      .catch(err => console.log(err));
  }, []);

  // return .map over list of comments, rendering a CommentCard for each
  return (
    <div>
      <Header id="header" textAlign="center" as="h1">
        Saltiest 100 Comments
      </Header>
      {typeof comments == "object" && comments.length > 0 ? (
        <Card.Group className="cardGroup" itemsPerRow="1">
          {comments !== [] ? (
            <Pagination
              dataArray={comments}
              render={function paginatedData(props) {
                return (
                  <>
                    {props.handleShowCount(10)}
                    {props.paginatedData.map(function renderPaginatedData(
                      data
                    ) {
                      return <CommentCard comment={data} key={data.username} />;
                    })}
                  </>
                );
              }}
            />
          ) : (
            <h1>Comments not found</h1>
          )}
        </Card.Group>
      ) : (
        <div className="loading">
          {failed ? (
            <h1>failed to load resource</h1>
          ) : (
            //  credit to https://loading.io/css/
            <div className="lds-roller" id="light">
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
          {function checkComments() {
            return setTimeout(function inTenSeconds() {
              if (comments.length == 0) {
                setFailed(true);
              }
              return null;
            }, 10000);
          }}
        </div>
      )}
    </div>
  );
};

export default CommentList;
