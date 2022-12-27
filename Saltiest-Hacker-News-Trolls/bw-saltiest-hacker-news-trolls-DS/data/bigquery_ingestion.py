######################################################################
# Data ingestion from Google Bigquery HackerNews dataset to be stored
# in a postgreSQL dB.
# 
######################################################################

from google.cloud import bigquery
import pandas as pd
import psycopg2
from tqdm import tqdm
import click
from decouple import config


# ElephantDB 2 connection information
#"""
dbname = config('ESQL2_DBNAME')
user = config('ESQL2_USER')
password = config('ESQL2_PASSWORD')
host = config('ESQL2_HOST')
#"""


# ElephantDB 1 connection information
"""
dbname = config('ESQL1_DBNAME')
user = config('ESQL1_USER')
password = config('ESQL1_PASSWORD')
host = config('ESQL1_HOST')
"""

# AWS RDS 1 connection information
"""
dbname = config('RDS1_DBNAME')
user = config('RDS1_USER')
password = config('RDS1_PASSWORD')
host = config('RDS1_HOST')
"""

# Google Cloud bigquery API setup information:
# https://cloud.google.com/docs/authentication/getting-started

def pull_rows(client, dset, table_name, start_index=0, count=40000):
    """
    Query {count} rows starting at index {start_index} from {table_name} in {dset} from the established bigquery client.
    
    Google Cloud API references:  https://googleapis.github.io/google-cloud-python/latest/bigquery/generated/google.cloud.bigquery.table.Row.html
    https://google-cloud.readthedocs.io/en/latest/bigquery/generated/google.cloud.bigquery.client.Client.list_rows.html
    
    Parameters:
    -----------
    client: bigquery client connection
    dset: bigquery data set
    table_name: name of the table inside the bigquery dataset
    start_index: the starting index of the query
    count: max number of rows to be returned
    
    Output:
    -----------
    list: query results in a list of google bigquery Row instances
    """
    results = [x for x in client.list_rows(dset, start_index=start_index, max_results=count)]

    return results
    
def get_schema(client, dset, table_name):
    """
    Get the schema from the Google bigquery dataset and write it
    to a csv file and then returns a pandas dataframe. reference:
    https://googleapis.github.io/google-cloud-python/latest/bigquery/generated/google.cloud.bigquery.schema.SchemaField.html
    
    Parameters:
    -----------
    client: bigquery client connection
    dset: bigquery data set
    table_name: name of the table inside the bigquery dataset
    
    Output:
    -----------
    schema/{table_name}.csv: schema of the table in .csv format
    schema: a pandas dataframe of representation of the schema
    """
    table = client.get_table(dset.table(table_name))
    schema = pd.DataFrame({'mode': [],
                           'name': [],
                           'type': [],
                           'description': [],
                           })
    for s in table.schema:
        dict_s = s.to_api_repr()
        df_s = pd.DataFrame([dict_s], columns = dict_s.keys())
        schema = pd.concat([schema, df_s], axis =0)
    
    # write out the schema to a .csv file under schema/
    schema.to_csv(f"schema/{table_name}.csv", index=None)
    
    return schema
    
def get_tables(client, dset):
    """
    Get all the names of the table inside a bigquery dataset
    
    Parameters:
    -----------
    client: a google.cloud bigquery connection
    dset: a conected bigquery dataset
    
    Output:
    -----------
    list: a list of all the name of the tables inside dset
    """
    
    return [x.table_id for x in client.list_tables(dset)]
    
def get_row_count(client, dset, table_name):
    """
    Get numer of rows in a bigquery table
    
    Parameters:
    -----------
    client: a google.cloud bigquery connection
    dset: a conected bigquery dataset
    table_name: name of the table
    
    Output:
    -----------
    row_count: a count of the number of rows in a table
    """
    
    table = client.get_table(dset.table(table_name))
    row_count = table.num_rows
    
    return row_count

def ingest(table_name, rows):
    """
    Ingest list of bigquery Row instances into postgreSQL dB. 
    
    *** Only tested on comments table in the hacker news dataset. ***
    
    Parameters:
    -----------
    rows: list of bigquery Row instances
    
    Output:
    -----------
    None
    """
    conn = psycopg2.connect(dbname=dbname, user=user,
                            password=password, host=host)

    curs = conn.cursor()
    
    for r in tqdm(rows):
        keys = list(r.keys())
        values = list(r.values())
        
        # inserting single quotes everywhere so sql is happy. plz accept moi
        values[1] = "'"+str(values[1])+"'"
        values[2] = "'"+str(values[2])+"'"
        values[4] = "TO_TIMESTAMP('"+str(values[4])+"', 'yyyy-mm-dd hh24:mi:ss')"
        values[5] = "'"+str(values[5]).replace('"', '""').replace("'", "''")+"'"
        values[6] = "0" if str(values[6]) == "None" else str(values[6])
        values[7] = "'0'" if str(values[7]) == "None" else "'1'"
        values[8] = "'0'" if str(values[8]) == "None" else "'1'"
        #print(f'{type(values)}, {values}')
        #print(f'{type(str(values[4]))}, {str(values[4])}')
        #print(', '.join(str(k) for k in keys))
        insert_record = f'''
            INSERT INTO {table_name} ( 
                {', '.join(str(k) for k in keys)}
            )
            VALUES (
                {', '.join(str(v) for v in values)}
            );
        '''
        #"str(v) for v in values)}
        #print(insert_record)
        curs.execute(insert_record)
    
    #print(list(results[0].keys()))
    #print(list(results[0].values()))
    
    curs.close()
    conn.commit()
    conn.close()
    
    pass

@click.command()
@click.option('--schema', default=False, help='Generate schema files from tables and columns')
@click.option('--counts', default=False, help='Returns total number of rows in a table')
@click.option('--start', default=0, help='Starting row of the data to be pulled')
@click.option('--rows', default=10000, help='Numbers of rows to ingest from bigquery api')
def run(schema, counts, start, rows):
    """
    kaggle reference to using bigquery https://www.kaggle.com/sohier/beyond-queries-exploring-the-bigquery-api
    """
    
    client = bigquery.Client()
    hn_dataset_ref = client.dataset('hacker_news', project='bigquery-public-data')
    hn_dset = client.get_dataset(hn_dataset_ref)
    
    tables = get_tables(client, hn_dset)

    # write out the schema csvs if requested
    if schema:
        for t in tables:
            table = client.get_table(hn_dset.table(t))
            get_schema(client, hn_dset, t)
            
    if counts:
        row_count = get_row_count(client, hn_dset, 'comments')
        print(f"There are {row_count} in 'comments' table.")
        
    #hn_comments = client.get_table(hn_dset.table('comments'))
    #db_rows = pull_rows(client, hn_comments, 'comments', start, rows)
    #ingest('comments', db_rows)


if __name__ == "__main__":
    run()
