# Vader sentiment analysis and psycopg2 import
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import psycopg2
from tqdm import tqdm

# Connection information
dbname = 'postgres'
user = 'hacker'
password = 'tFbCRNUZpMeYyhYB4ht'
host = 'hackernews.c6st0zcwf68q.us-east-2.rds.amazonaws.com'

# Sentiment analyzer provided by ML engineers
analyser = SentimentIntensityAnalyzer()
def sentiment_analyzer_scores(comment):
    x = 0
    score = analyser.polarity_scores(comment)
    x = x + score['pos']
    x = x + score['compound']
    x = x - score['neg'] 
    return x

def updater():
    '''
    
    '''
    pg_conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)

    pg_curs = pg_conn.cursor()

    add_column = '''ALTER TABLE comments
    ADD scores FLOAT;'''
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

if __name__ == '__main__':
    updater()
