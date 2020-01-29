#  Hint:  You may not need all of these.  Remove the unused functions.
from hashtables import (HashTable,
                        hash_table_insert,
                        hash_table_remove,
                        hash_table_retrieve,
                        hash_table_resize)


class Ticket:
    def __init__(self, source, destination):
        self.source = source
        self.destination = destination


def reconstruct_trip(tickets, length):
    hashtable = HashTable(length)
    route = [None] * length

    """
    YOUR CODE HERE
    """
    # Populate hashtable
    for ticket in tickets:
        key = ticket.source
        value = ticket.destination
        hash_table_insert(hashtable, key, value)

    # Find first flight
    destination = hash_table_retrieve(hashtable, "NONE")
    for i in range(length):
        route[i] = destination
        destination = hash_table_retrieve(hashtable, destination)

    return route
