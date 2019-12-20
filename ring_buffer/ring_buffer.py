from doubly_linked_list import DoublyLinkedList


class RingBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.current = None
        self.storage = DoublyLinkedList()

    def append(self, item):
        if self.storage.length < self.capacity:
            self.storage.add_to_head(item)
            self.current = self.storage.tail
        else:
            self.current.value = item
            if self.current is self.storage.head:
                self.current = self.storage.tail
            else:
                self.current = self.current.prev

    def get(self):
        # Note:  This is the only [] allowed
        list_buffer_contents = []

        # TODO: Your code here
        prev = self.storage.tail
        # Keep appending prev until prev is head
        while prev is not self.storage.head:
            # if prev.value is not None:
            list_buffer_contents.append(prev.value)
            prev = prev.prev
        list_buffer_contents.append(self.storage.head.value)

        return list_buffer_contents

# ----------------Stretch Goal-------------------


class ArrayRingBuffer:
    def __init__(self, capacity):
        pass

    def append(self, item):
        pass

    def get(self):
        pass
