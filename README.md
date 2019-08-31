# Saltiest Hackers Data Engineering And Backend

![Architecture image](https://github.com/Saltiest-Hacker-News-Trolls/bw-saltiest-hacker-news-trolls-DS/blob/master/Backend_architecture_image.png)

##[Technical Design Doc](https://docs.google.com/document/d/1lPI9yx3g5VGFWusxn_U5BfgOXBkrin4-mCu3XJHoqaI/)

## 1. Top 100 users by salt_score and saltiness by time
Returns top 100 users according to either average or total salt score. Each row includes average/total salt score, # of posts, username, most salty comment, and the score of that comment. Also has optionality of outputting average salt scores across all comments group by day.

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

## 2. Wordcloud
Returns user and word counts from all of user's negative sentiment comments.

End point: http://hackernews-serving.herokuapp.com/cloud

Expected method: `POST -d {'username': string}`

CLI: ```curl -X POST -H "Content-Type: application/json" -d '{"username": "swombat"}' http://hackernews-serving.herokuapp.com/cloud```

Returns: ```{"username": str,
          "texts": {text: str, values:int}. {text: str, values:int}, {text: str, values:int}, ...}```

## 3. User's comments
Returns user, salt score of the user, and user's comments with sentiment score for each comment.

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

where id is the id of the parent comment, id is the comment id, time is unix time, and score is the score of that specific comment.

## 4. Most salty comments
Returns score, text, username, text id, and parent id, where score is the sentiment score for the text, id is the id of the entry, and parent id is the id of the parent.

End point: http://hackernews-serving.herokuapp.com/comment

Expected method: `POST -d {}`

CLI: `curl -X POST -H "Content-Type: application/json" -d '{}' http://hackernews-serving.herokuapp.com/comment`
Returns: ```[{'score': str, 'text' : int, 'username' : str, 'id' : int, 'parent': str}, {...}, ...]
}```

`<Response 2 bytes [400 BAD REQUEST]>` or `{}` will be returned when an API call produces an error
