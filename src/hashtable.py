import math

# '''
# Linked List hash table key/value pair
# '''
class LinkedPair:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.next = None

class HashTable:
    '''
    A hash table that with `capacity` buckets
    that accepts string keys
    '''
    def __init__(self, capacity):
        self.capacity = capacity  # Number of buckets in the hash table
        self.entries = 0
        self.storage = [None] * capacity


    def _hash(self, key):
        '''
        Hash an arbitrary key and return an integer.

        You may replace the Python hash with DJB2 as a stretch goal.
        '''
        return self._hash_djb2(key)


    def _hash_djb2(self, key):
        '''
        Hash an arbitrary key using DJB2 hash

        OPTIONAL STRETCH: Research and implement DJB2
        '''
        h = 5381 # Arbitrary number that supposedly results in less collisions
        for c in key:
            h = (h * 33) + ord(c)
        return h

    def _load_factor(self):
        return self.entries / self.capacity

    def _hash_mod(self, key):
        '''
        Take an arbitrary key and return a valid integer index
        within the storage capacity of the hash table.
        '''
        return self._hash(key) % self.capacity


    def insert(self, key, value):
        '''
        Store the value with the given key.

        Hash collisions should be handled with Linked List Chaining.

        Fill this in.
        '''
        # First check if load factor is over 0.7
        lf = self._load_factor()
        if lf > 0.7:
            self.resize(2)
        elif lf < 0.2:
            self.resize(0.5)
        idx = self._hash_mod(key)
        if self.storage[idx] is None:
            self.storage[idx] = LinkedPair(key, value)
            self.entries += 1
        else:
            item = self.storage[idx]
            # Loop over each node in the list and check if key matches
            # If we get to the end then add a new node

            while item is not None:
                if item.key is key:
                    item.value = value
                    return
                if item.next is None:
                    item.next = LinkedPair(key, value)
                    self.entries += 1
                    return
                else:
                    item = item.next


    def remove(self, key):
        '''
        Remove the value stored with the given key.

        Print a warning if the key is not found.

        Fill this in.
        '''
        idx = self._hash_mod(key)
        if self.storage[idx].key is key:
            next_node = self.storage[idx].next
            self.storage[idx] = next_node
        else:
            item = self.storage[idx]
            while item.key is not key:
                prev = item
                item = item.next
                if item is None:
                    print(f"No item found with key {key}")
                    return None
            prev.next = item.next
        self.entries -= 1


    def retrieve(self, key):
        '''
        Retrieve the value stored with the given key.

        Returns None if the key is not found.

        Fill this in.
        '''
        idx = self._hash_mod(key)
        if self.storage[idx] is None:
            return None
        elif self.storage[idx].key is key:
            return self.storage[idx].value
        else:
            item = self.storage[idx]
            while item.key is not key:
                if item.next is None:
                    return None
                item = item.next
            return item.value


    def resize(self, factor=2):
        '''
        Doubles the capacity of the hash table and
        rehash all key/value pairs.

        Fill this in.
        '''
        new_capacity = math.floor(self.capacity * factor)
        self.capacity = new_capacity
        new_storage = [None] * self.capacity
        # Loop over each index in old storage
        for item in self.storage:
            # Only items that have stuff matter
            if item is not None:
                # This is the node from old storage
                old_node = item
                while old_node is not None:
                    # Get new index to use for new_storage
                    idx = self._hash_mod(old_node.key)
                    if new_storage[idx] is None:
                        new_storage[idx] = LinkedPair(old_node.key, old_node.value)
                    else:
                        node = new_storage[idx]
                        while node.next is not None:
                            node = node.next
                        node.next = LinkedPair(old_node.key, old_node.value)
                    old_node = old_node.next
        # Update storage
        self.storage = new_storage



if __name__ == "__main__":
    ht = HashTable(2)

    ht.insert("line_1", "Tiny hash table")
    ht.insert("line_2", "Filled beyond capacity")
    ht.insert("line_3", "Linked list saves the day!")

    print("")

    # Test storing beyond capacity
    print(ht.retrieve("line_1"))
    print(ht.retrieve("line_2"))
    print(ht.retrieve("line_3"))

    # Test resizing
    old_capacity = len(ht.storage)
    ht.resize()
    new_capacity = len(ht.storage)

    print(f"\nResized from {old_capacity} to {new_capacity}.\n")

    # Test if data intact after resizing
    print(ht.retrieve("line_1"))
    print(ht.retrieve("line_2"))
    print(ht.retrieve("line_3"))

    print("")
