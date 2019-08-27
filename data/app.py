import pandas as pd
import numpy as np
import json
import psycopg2
from flask import Flask, json, jsonify, request, send_file
from wordcloud import WordCloud
from PIL import Image
from io import StringIO


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
    Querying the database for ranking, user, text, and salt score.
    
    Parameters:
    -----------
    
    Output:
    -----------
    pd.Dataframe: dataframe table with everything.
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
    text = ' '.join(map(str, text))
    #print(text)
    #df = pd.DataFrame(data, columns=['ranking', 'text'])
    # appending a placeholder row for salt score
    wordcloud = WordCloud(max_font_size=40).generate(text)
    img = wordcloud.to_image()
    #img.show()
    curs.close()
    conn.close()

    return img
    
def serve_pil_image(pil_img):
    img_io = StringIO()
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
    img = user_wordcloud()
    return serve_pil_image(img)

if __name__ == "__main__":
    #foo = user_salt()
    #print(foo)
    #user_wordcloud()
    app.run(debug=True)