# Vader sentiment analysis and psycopg2 import
from google.cloud import bigquery
import psycopg2
import pandas as pd

from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

from decouple import config
from functools import wraps
from time import time
from tqdm import tqdm
import click


# Connection information
#"""
dbname = config('RDS2_DBNAME')
user = config('RDS2_USER')
password = config('RDS2_PASSWORD')
host = config('RDS2_HOST')
#"""

def timing(f):
    """
    Timing wrapper decorator function. To use, add @timing decorator before
    function name.
    
    Output:
    ----------
    Prints "func <function_name> took: <time> sec"
    """
    @wraps(f)
    def wrap(*args, **kw):
        ts = time()
        result = f(*args, **kw)
        te = time()
        print('func:%r took: %2.4f sec' % (f.__name__, te-ts))
        return result
    return wrap


def sentiment_analyzer_scores(comment):
    """
    Sentiment analyzer provided by ML engineers
    """
    analyser = SentimentIntensityAnalyzer()
    x = 0
    score = analyser.polarity_scores(comment)
    x = x + score['pos']
    x = x + score['compound']
    x = x - score['neg'] 
    
    return x

def updater():
 
    pg_conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)

    pg_curs = pg_conn.cursor()

    add_column = '''
                 ALTER TABLE comments ADD COLUMN IF NOT EXISTS scores FLOAT;
                 '''
    pg_curs.execute(add_column)

    # Select all rows to be iterated over to fill score values.
    pg_curs.execute(
    '''
    SELECT id, text, scores FROM comments
    ''')
    # Iterate over selected rows to update 'scores' column. 
    for row in tqdm(pg_curs):
        text = row[1]
        id = row[0]
        analysis_result = round(sentiment_analyzer_scores(text), 4)

        add = f'''
            UPDATE comments
            SET scores = {analysis_result}
            WHERE id={id}'''

        pg_curs1 = pg_conn.cursor()
        pg_curs1.execute(add)

    pg_curs.close()
    pg_conn.commit()
    pg_conn.close()
    pass
    
def ingest_transform(table_name, rows, every=30):
    """
    Ingest list of bigquery Row instances into postgreSQL dB. 
    
    *** Only tested on comments table in the hacker news dataset. ***
    
    Parameters:
    -----------
    table_name: name of the table to be populated
    rows: list of bigquery Row instances
    every: commit every every rows ingested.
    
    Output:
    -----------
    Boolean: True if completed.
    """

    i = 0
    try:
        conn = psycopg2.connect(dbname=dbname, user=user,
                                password=password, host=host)

        curs = conn.cursor()
        
        # add scores column if it doesnt exists in comments table
        # this should not be called everytime.
        add_column = '''
                     ALTER TABLE comments ADD COLUMN IF NOT EXISTS scores FLOAT;
                     '''
        curs.execute(add_column)
        
        for i, r in enumerate(tqdm(rows)):
            keys = list(r.keys())
            values = list(r.values())
            
            # appending scores column
            keys.append('scores')
            
            # inserting single quotes everywhere so sql is happy. plz accept moi
            values[1] = "'"+str(values[1])+"'"
            values[2] = "'"+str(values[2])+"'"
            values[4] = "TO_TIMESTAMP('"+str(values[4])+\
                        "','yyyy-mm-dd hh24:mi:ss')"
            values[5] = "'"+str(values[5]).replace('"', '""')\
                        .replace("'", "''")+"'"
            values[6] = "0" if str(values[6]) == "None" else str(values[6])
            values[7] = "'0'" if str(values[7]) == "None" else "'1'"
            values[8] = "'0'" if str(values[8]) == "None" else "'1'"
            # append text sentiment analysis score
            values.append(sentiment_analyzer_scores(values[5]))
            
            insert_record = f'''
                INSERT INTO {table_name} ( 
                    {', '.join(str(k) for k in keys)}
                )
                VALUES (
                    {', '.join(str(v) for v in values)}
                );
            '''
            curs.execute(insert_record)
            
            if (i + 1) % every == 0:
                conn.commit()
        
        curs.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error, i)
        return False
    finally:
        if conn is not None:
            conn.close()
    
    return True

@click.command()
@click.option('--start', default=0, help='Start index of the data to be pulled')
@click.option('--rows', default=10, help='End index of data pulled.')
def run(start, rows):
    """
    main function of the script.
    """
    client = bigquery.Client()
    hn_dataset_ref = client.dataset('hacker_news', 
                                    project='bigquery-public-data')
    hn_dset = client.get_dataset(hn_dataset_ref)

    # get the total number of rows in the google bigquery database
    table = client.get_table(hn_dset.table('comments'))
    row_count = table.num_rows
    #print(f"There are {row_count} in 'comments' table.")
    
    # getting comments in 100k batches
    batch_size = 50000
    start_index = start
    end_index = start + rows
    while start_index < end_index:
        print(f'Ingesting {batch_size} from row {start_index} to row \
              {start_index+batch_size}...')
        # ingest from bigquery
        hn_comments = client.get_table(hn_dset.table('comments'))
        results = [x for x in client.list_rows(hn_comments, 
                                               start_index=start_index, 
                                               max_results=batch_size)]
        
        # transform and save into databse
        ingest_transform('comments', results)
        
        start_index += batch_size
    
    pass
    
if __name__ == '__main__':
    run()