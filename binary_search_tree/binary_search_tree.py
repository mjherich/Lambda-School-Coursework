import sys
sys.path.append('../queue_and_stack')
from dll_queue import Queue
from dll_stack import Stack


class BinarySearchTree:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

    """
    Insert the given value into the tree
    """
    def insert(self, value):
        if not self.value:
            self.value = value
            return

        if value < self.value and not self.left:
            self.left = BinarySearchTree(value)
        elif value < self.value and self.left:
            self.left.insert(value)
        elif value > self.value and not self.right:
            self.right = BinarySearchTree(value)
        elif value > self.value and self.right:
            self.right.insert(value)

    """
    Return True if the tree contains the value
    False if it does not
    """
    def contains(self, target):
        if target == self.value:
            return True
        elif target < self.value and self.left:
            return self.left.contains(target)
        elif target < self.value and not self.left:
            return False
        elif target > self.value and self.right:
            return self.right.contains(target)
        elif target > self.value and not self.right:
            return False

    """
    Return the maximum value found in the tree
    """
    def get_max(self):
        if self.right:
            return self.right.get_max()
        else:
            return self.value

    """
    Call the function `cb` on the value of each node
    You may use a recursive or iterative approach
    """
    def for_each(self, cb):
        cb(self.value)
        if self.left:
            self.left.for_each(cb)
        if self.right:
            self.right.for_each(cb)

    # DAY 2 Project -----------------------

    # Print all the values in order from low to high
    # Hint:  Use a recursive, depth first traversal
    def in_order_print(self, node):
        if not node:
            return
        self.in_order_print(node.left)
        print(node.value)
        self.in_order_print(node.right)

    # Print the value of every node, starting with the given node,
    # in an iterative breadth first traversal
    def bft_print(self, node):
        q = Queue()
        q.enqueue(self)
        while q.len() != 0:
            node = q.dequeue()
            print(node.value)
            if node.left:
                q.enqueue(node.left)
            if node.right:
                q.enqueue(node.right)

    # Print the value of every node, starting with the given node,
    # in an iterative depth first traversal
    def dft_print(self, node):
        s = Stack()
        s.push(node)
        while s.len() != 0:
            node = s.pop()
            print(node.value)
            if node.left:
                s.push(node.left)
            if node.right:
                s.push(node.right)


    # STRETCH Goals -------------------------
    # Note: Research may be required

    # Print In-order recursive DFT
    def pre_order_dft(self, node):
        if not node:
            return
        print(node.value)
        self.pre_order_dft(node.left)
        self.pre_order_dft(node.right)

    # Print Post-order recursive DFT
    def post_order_dft(self, node):
        if not node:
            return
        self.post_order_dft(node.left)
        self.post_order_dft(node.right)
        print(node.value)