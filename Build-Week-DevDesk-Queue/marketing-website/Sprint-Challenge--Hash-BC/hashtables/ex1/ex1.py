#  Hint:  You may not need all of these.  Remove the unused functions.
from hashtables import (HashTable,
                        hash_table_insert,
                        hash_table_remove,
                        hash_table_retrieve,
                        hash_table_resize)


def get_indices_of_item_weights(weights, length, limit):
    ht = HashTable(16)

    """
    YOUR CODE HERE
    """
    if length < 2:
        return None
    
    # Loop through the weights and populate the hashtable
    for i in range(length):
        w = weights[i]
        hash_table_insert(ht, w, i)

    # Loop through weights again checking if limit - weight is a key
    for i in range(length):
        w = weights[i]
        can_merge = limit - w
        check = hash_table_retrieve(ht, can_merge)
        if check is not None:
            if i < check:
                smaller = i
                bigger = check
            else:
                smaller = check
                bigger = i
            return (bigger, smaller)

    return None


def print_answer(answer):
    if answer is not None:
        print(str(answer[0] + " " + answer[1]))
    else:
        print("None")
