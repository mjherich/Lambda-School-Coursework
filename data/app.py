import pandas as pd
import numpy as np
import json
import psycopg2
from flask import Flask, json, jsonify, request


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
    return None

if __name__ == "__main__":
    foo = user_salt()
    print(foo)
    #app.run(debug=True)