from math import floor
import unittest
from unittest.mock import MagicMock

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
        ret = self.storage[0]
        self.storage[0] = self.storage[-1]
        del self.storage[-1]
        index = 0
        while True:
            left_index = self.get_left_child_index(index)
            right_index = self.get_right_child_index(index)
            if left_index < self.get_size() and right_index < self.get_size(): # Both children exist
                if self.storage[left_index] >= self.storage[right_index]: # left child bigger than right
                    if self.storage[left_index] >= self.storage[index]:
                        index = self._sift_down(index, 'left')
                    else:
                        break
                else:                                                     # right child bigger than left
                    if self.storage[right_index] > self.storage[index]:
                        index = self._sift_down(index, 'right')
                    else:
                        break
            elif left_index < self.get_size() and right_index >= self.get_size(): # Only left exists
                if self.storage[left_index] >= self.storage[index]:
                    index = self._sift_down(index, 'left')
                else:
                    break
            elif left_index >= self.get_size(): # No children exist, so break out of loop
                break
        return ret

    def get_max(self):
        return self.storage[0]

    def get_size(self):
        return len(self.storage)

    def _bubble_up(self, index):
        parent_index = self.get_parent_index(index)
        self.storage[index], self.storage[parent_index] = self.storage[parent_index], self.storage[index]

    def _sift_down(self, index, direction):
        if direction == 'left':
            left_index = self.get_left_child_index(index)
            self.storage[index], self.storage[left_index] = self.storage[left_index], self.storage[index]
            return left_index # Returns the new index
        elif direction == 'right':
            right_index = self.get_right_child_index(index)
            self.storage[index], self.storage[right_index] = self.storage[right_index], self.storage[index]
            return right_index # Returns the new index