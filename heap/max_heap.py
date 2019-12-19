from math import floor

class Heap:
    def __init__(self):
        self.storage = []

    def get_parent_index(self, idx):
        return floor((idx - 1) / 2)

    def get_left_child_index(self, idx):
        return floor(2 * idx + 1)

    def get_right_child_index(self, idx):
        return floor(2 * idx + 2)

    def insert(self, value):
        self.storage.append(value)
        index = len(self.storage) - 1
        parent_index = self.get_parent_index(index)
        # If the parent value is less than the value we just added (end of array) we need to swap
        while self.storage[parent_index] < self.storage[index] and parent_index >= 0:
            self._bubble_up(index)
            index = parent_index
            parent_index = self.get_parent_index(index)

    def delete(self):
        pass

    def get_max(self):
        pass

    def get_size(self):
        pass

    def _bubble_up(self, index):
        parent_index = self.get_parent_index(index)
        self.storage[index], self.storage[parent_index] = self.storage[parent_index], self.storage[index]

    def _sift_down(self, index):
        pass
