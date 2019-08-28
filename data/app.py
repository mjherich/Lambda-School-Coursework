import pandas as pd
import numpy as np
import json
import psycopg2
from flask import Flask, json, jsonify, request, send_file
from collections import Counter
import re, string
import nltk


app = Flask(__name__)


def salt_rank():
    """
    Querying the database for ranking, user, text, and salt score.
    
    Parameters:
    -----------
    
    Output:
    -----------
    results: json format string with format 
             {"salt_score": float,
              "username": string,
              "text": string,
              "score": float
              }
    """
    conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)
    
    if conn.closed != 0:
        return app.response_class(response=json.dump({}),
                                  status=400,
                                  mimetype='application/json')
    curs = conn.cursor()
     
    query = '''
            SELECT ranking, author, text FROM comments
            ORDER BY ranking
            LIMIT 100;
            '''
    curs.execute(query)
    data = curs.fetchall()
    
    df = pd.DataFrame(data, columns=['salt_score', 'username', 'text'])
    # appending a placeholder row for salt score
    df['score'] = 100
    
    result = df.to_json(orient='records')
    
    curs.close()
    conn.close()

    return result
    
def user_wordcloud(user_id):
    """
    Querying the database for username, texts with negative sentiment. Removing
    all stop and common words, and returns a json string from the top N lowest 
    salt score comments from user.
    
    Parameters:
    -----------
    user: user_id
    
    Output:
    -----------
    results: json format stream with in format 
             {"username": str,
              "texts": {text: str, values:int}}
    """
    conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)
    
    # throw an error response when connection is not open
    if conn.closed != 0:
        return app.response_class(response=json.dump({}),
                                  status=400,
                                  mimetype='application/json')
    curs = conn.cursor()
    
    # check if user_id exists in the database
    check_exist = f'''
                  SELECT exists (SELECT 1 FROM comments 
                                 WHERE author = '{user_id}' LIMIT 1);
                  '''
    curs.execute(check_exist)
    exists = curs.fetchall()
    if not exists[0][0]:
        return app.response_class(response=json.dumps({}),
                                  status=400,
                                  mimetype='application/json')
    
    query = f'''
            SELECT text FROM comments
            WHERE author = '{user_id}' AND score < 0
            LIMIT 500;
            '''
    curs.execute(query)
    text = curs.fetchall()
    text = ' '.join(map(str, text)).lower()
    regex = re.compile('[%s]' % re.escape(string.punctuation))
    regetext = regex.sub(' ', text)
    
    stopwords = nltk.corpus.stopwords.words('english')
    new_words = ['i', 'p', 'com', 'http', 'we', 'that', 
                 'get', 'n', 'rel', 'much', 'like']
    stopwords.extend(new_words)
    s = set(stopwords)
    
    foo = filter(lambda w: not w in s, regetext.split())
    
    wordcount = dict(Counter(foo))
    wc_df = pd.DataFrame(list(wordcount.items()), columns=['text', 'value'])
    result_dict = {"username": "pg", "texts": wc_df.to_json(orient='records')}
    
    curs.close()
    conn.close()

    return json.dumps(result_dict)
    
def user_salt(user_id):
    """
    Querying the database for user and returns the top 10 highest salt score 
    comments in json format
    
    Parameters:
    -----------
    user: user_id
    
    Output:
    -----------
    results: json string in the format:
             {'username': str, 'comments': {'parent' : int,
                                            'id' : int,
                                            'time' : int,
                                            'username' : str,
                                            'text': str, 
                                            'score': float}}
    """
    conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)
    
    # throw an error response when connection is not open
    if conn.closed != 0:
        return app.response_class(response=json.dumps({}),
                                  status=400,
                                  mimetype='application/json')
    curs = conn.cursor()
    
    # check if user_id exists in the database
    check_exist = f'''
                  SELECT exists (SELECT 1 FROM comments 
                                 WHERE author = '{user_id}' LIMIT 1);
                  '''
    curs.execute(check_exist)
    exists = curs.fetchall()
    if not exists[0][0]:
        return app.response_class(response=json.dumps({}),
                                  status=400,
                                  mimetype='application/json')

    query_text = f'''
                 SELECT parent, id, time, by, text, score FROM comments
                 WHERE author = '{user_id}' AND score < 0
                 ORDER BY score ASC
                 LIMIT 100;
                 '''
    curs.execute(query_text)
    user_text = curs.fetchall()
    
    text_df = pd.DataFrame(user_text, 
                           columns=['parent', 'id', 'time', 
                                    'username', 'text', 'score'])
    text_json = text_df.to_json(orient='records')
    
    # querying for user's salt score.
    query_user_score = f'''
                       SELECT author, AVG(score) FROM comments
                       WHERE author = '{user_id}'
                       GROUP BY author
                       '''
    curs.execute(query_user_score)
    user_score = curs.fetchall()
    
    # Convert user score sql data into a dataframe and append text_json in 
    # a comments column
    score_df = pd.DataFrame(user_score, columns=['username', 'salt_score'])
    score_df['comments'] = text_json
    
    results = score_df.to_json(orient='records')
    
    curs.close()
    conn.close()

    return results
    
@app.route("/salt", methods=['POST'])
def serve_results():
    """
    Pulling user salt ranking from database(s) and returns the results in
    json format.
    Calls salt_rank.
    """
    if request.method != 'POST':
        return app.response_class(response=json.dump({}),
                                  status=400,
                                  mimetype='application/json')
    
    # right now this is a dummy
    input_json = request.get_json(force=True)
    
    result_json = salt_rank()

    try:
        foo = json.loads(result_json)
    except ValueError as e:
        print("NOT JSON")

    return jsonify(result_json)

@app.route("/cloud", methods=['POST'])
def serve_wordcloud():
    """
    This endpoint serves a user with all its salty comments. 
    Calls user_wordcloud
    """
    input_json = request.get_json(force=True)
    # error checking if the json file has username input, if not, return error
    try:
        user_id = str(input_json['username'])
    except:
        return app.response_class(response=json.dumps({}),
                                  status=400,
                                  mimetype='application/json')
    
    result_json = user_wordcloud(user_id)
    return result_json

@app.route("/user", methods=['POST'])
def serve_user():
    """
    This endpoint serves a user with its salt score and its most salty comments.
    Calls user_salt
    """
    input_json = request.get_json(force=True)
    # error checking if the json file has username input, if not, return error
    try:
        user_id = str(input_json['username'])
    except:
        return app.response_class(response=json.dumps({}),
                                  status=400,
                                  mimetype='application/json')
    
    result_json = user_salt(user_id)
    
    return result_json


if __name__ == "__main__":
    #foo = user_salt('asdff')
    #print(foo)
    #foo = user_wordcloud('asdfff')
    #print(foo)
    app.run(debug=True)