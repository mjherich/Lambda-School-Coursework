# ingestion HackerNews dataset on Kaggle using Google bigquery 
# to be stored in a postgreSQL dB on ElephantDB.
from google.cloud import bigquery
import pandas as pd
import psycopg2
import click


# ElephantDB connection information

# Google Cloud bigquery API setup information:
# https://cloud.google.com/docs/authentication/getting-started

def pull_rows(client, dset):
    pass
    
def get_schema(client, dset, table_name):
    """
    Get the schema from the Google bigquery dataset and write it
    to a csv file and then returns a pandas dataframe. reference:
    https://googleapis.github.io/google-cloud-python/latest/bigquery/generated/google.cloud.bigquery.schema.SchemaField.html
    
    parameters:
    -----------
    client: bigquery client connection
    dset: bigquery data set
    table_name: name of the table inside the bigquery dataset
    
    output:
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
    
    parameters:
    -----------
    client: a google.cloud bigquery connection
    dset: a conected bigquery dataset
    
    output:
    -----------
    list: a list of all the name of the tables inside dset
    """
    return [x.table_id for x in client.list_tables(dset)]
    
    
#def run():    
    #pass

if __name__ == "__main__":
    # https://www.kaggle.com/sohier/beyond-queries-exploring-the-bigquery-api
    client = bigquery.Client()
    hn_dataset_ref = client.dataset('hacker_news', project='bigquery-public-data')
    hn_dset = client.get_dataset(hn_dataset_ref)
    
    tables = get_tables(client, hn_dset)
    print(f'tables are {tables}')
    
    #"""
    for t in tables:
        table = client.get_table(hn_dset.table(t))
        #print(t)
        #print(table.schema)
        #print("\n\n")
        get_schema(client, hn_dset, t)
    #"""    
    #hn_full = client.get_table(hn_dset.table('full'))
    
    
    #print(hn_full.schema)
    #print(hn_full.schema)
    #for i in hn_full.schema:
    #    print(i)
    #    print(i.to_api_repr())
    
    #results = [x for x in client.list_rows(hn_full, start_index=100, max_results=20)]

    #print("dataset_tables", type(hn_full))

    #print([command for command in dir(hn_full) if not command.startswith('_')])

    #print(hn_full.schema)

    #schema_subset = [col for col in hn_full.schema if col.name in ('by', 'title', 'time')]
    #results = [x for x in client.list_rows(hn_full, start_index=100, selected_fields=schema_subset, max_results=10)]

    #print(results)

    #for i in results:
    #    print(dict(i))