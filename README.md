# bw-saltiest-hacker-news-trolls-DS

![Architecture image](https://github.com/Saltiest-Hacker-News-Trolls/bw-saltiest-hacker-news-trolls-DS/blob/master/Architecture%20Image.png)

1. Top 100 users by salt_score. Returns top 100 users with average salt score, # of posts, username, most salty comment, and the score of that comment.  Also, average salt scores across all comments group by day.
End point: http://hackernews-serving.herokuapp.com/salt

  Expected method: `POST -d {"mode": "average"}, {"mode":"total"},  {"mode":"timing"}`

  CLI: `curl -X POST -H "Content-Type: application/json" -d '{"mode":"total"}' http://hackernews-serving.herokuapp.com/salt`

  Returns: ```[{"salt_score": float,
              "num_posts": int,
              "username": string,
              "text": string,
              "score": float
              }, {}, ...]```

  OR for 'timing' mode, returns
`[{"time_ts": string, score": float}, {"time_ts": string, score": float}, {...}, ...]`

2. Wordcloud. Returns user and word counts of his negative sentiment comments.
End point: http://hackernews-serving.herokuapp.com/cloud
Expected method: `POST -d {'username': string}`

CLI: ```curl -X POST -H "Content-Type: application/json" -d '{"username": "swombat"}' http://hackernews-serving.herokuapp.com/cloud```

Returns: ```{"username": str,
          "texts": {text: str, values:int}. {text: str, values:int}, {text: str, values:int}, ...}```

3. User comment. Returns user, salt score of the user, and its comments w/ sentiment score for individual comment.
End point: http://hackernews-serving.herokuapp.com/user

Expected method: `POST -d {'username': string}`

CLI: ```curl -X POST -H "Content-Type: application/json" -d '{"username":"codecool"}' http://hackernews-serving.herokuapp.com/user```

Returns: ```{'username': str, 
          'salt_score': float,
          'comments': {'parent' : int,
                       'id' : int,
                       'time' : int,
                       'username' : str,
                       'text': str, 
                       'score': float}}```

where id is the parent is the id of the parent comment, id is the comment id, time is unix time, and score is the score of that specific comment.

4. Most salty comment. Returns score, text, username, text id, and parent id, where score is the sentiment score for the text, id is the id of the entry, and parent id is the id of the parent.
End point: http://hackernews-serving.herokuapp.com/comment

Expected method: `POST -d {}`

CLI: `curl -X POST -H "Content-Type: application/json" -d '{}' http://hackernews-serving.herokuapp.com/comment`
Returns: ```[{'score': str, 'text' : int, 'username' : str, 'id' : int, 'parent': str}, {...}, ...]
}```


`<Response 2 bytes [400 BAD REQUEST]>` or `{}` will be returned when an API call produces an error
