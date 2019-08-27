import pandas as pd
import numpy as np
import json
import psycopg2
from flask import Flask, json, jsonify, request, send_file
from collections import Counter
import re, string
#from nltk.corpus import stopwords
import nltk


app = Flask(__name__)

# ElephantDB connection information
dbname = 'mrbekufe'
user = 'mrbekufe'
password = 'IbQXFoww4GFxiA-D-2al5sJXGaaJ_4Qs'
host = 'isilo.db.elephantsql.com'


def user_salt():
    """
    Querying the database for ranking, user, text, and salt score.
    
    Parameters:
    -----------
    
    Output:
    -----------
    pd.Dataframe: dataframe table with everything.
    """
    conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)
    
    print(conn.closed)
    curs = conn.cursor()
     
    query = '''
            SELECT ranking, author, text FROM comments
            ORDER BY ranking
            LIMIT 100;
            '''
    curs.execute(query)
    data = curs.fetchall()
    
    df = pd.DataFrame(data, columns=['ranking', 'username', 'text'])
    # appending a placeholder row for salt score
    df['salt_score'] = 100
    
    curs.close()
    conn.close()

    return df.to_json(orient='records')
    
def user_wordcloud():    
    """
    Querying the database for ranking, user, text, and salt score. Removes
    stopwords and common words in the process, and returns {'text': "", 'value': int}
    from the top N highest salt score comments from user.
    
    Parameters:
    -----------
    user: user_id
    
    Output:
    -----------
    results: json format stream with in format {"userID": "", "texts": {text: str, values:int}}
    """
    conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)
    
    # throw an error response when connection is not open
    if conn.closed != 0:
        return app.response_class(response=json.dump({}),
                                  status=400,
                                  mimetype='application/json')
    curs = conn.cursor()
    
    # Using author = 'pg' as placeholder
    query = '''
            SELECT text FROM comments
            WHERE author = 'pg';
            '''
    curs.execute(query)
    text = curs.fetchall()
    text = ' '.join(map(str, text)).lower()
    regex = re.compile('[%s]' % re.escape(string.punctuation))
    regetext = regex.sub(' ', text)#.split()
    
    stopwords = nltk.corpus.stopwords.words('english')
    new_words = ['i', 'p', 'com', 'http', 'we', 'that', 'get', 'n', 'rel', 'much', 'like']
    stopwords.extend(new_words)
    s=set(stopwords)
    
    foo = filter(lambda w: not w in s, regetext.split())
    
    wordcount = dict(Counter(foo))
    wc_df = pd.DataFrame(list(wordcount.items()), columns=['text', 'value'])
    #print(wc_df.head(10))
    result_dict = {"userID": "pg", "text": wc_df.to_json(orient='records')}
    #print(wc_df)
    curs.close()
    conn.close()

    return json.dumps(result_dict)
    
def serve_pil_image(pil_img):
    """
    *** NOT USED ***
    Retun a send_file image in ByteStreamIO.
    """
    img_io = BytesIO()
    pil_img.save(img_io, 'JPEG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')

@app.route("/salt", methods=['POST'])
def serve_results():
    """
    Pulling user salt ranking from database(s) and returns the results in
    json format.
    """
    if request.method != 'POST':
        return app.response_class(response=json.dump({}),
                                  status=400,
                                  mimetype='application/json')
    
    # right now this is a dummy
    input_json = request.get_json(force=True)
    #print(f'Input request {input_json}')
    
    result_json = user_salt()

    try:
        foo = json.loads(result_json)
    except ValueError as e:
        print("NOT JSON")

    return jsonify(result_json)

@app.route("/cloud", methods=['POST'])
def serve_wordcloud():
    if request.method != 'POST':
        return app.response_class(response=json.dump({}),
                                  status=400,
                                  mimetype='application/json')
    
    input_json = request.get_json(force=True)
    
    result_json = user_wordcloud()
    return result_json

if __name__ == "__main__":
    #foo = user_salt()
    #print(foo)
    #foo = user_wordcloud()
    #print(foo)
    app.run(debug=True)