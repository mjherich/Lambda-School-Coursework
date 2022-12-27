class Player:
    """
    Holds the player state necessary for the script
    """
    def __init__(self, name, cur_room, requests_session):
        self.name = name
        self.cur_room = cur_room
        self.requests = requests_session


OPPOSITE_DIRECTION = {
    'n': 's',
    's': 'n',
    'e': 'w',
    'w': 'e'
}
class Graph:
    """
    Represent a graph as a dictionary of vertices mapping labels to edges.
    """

    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex_id):
        """
        Add a vertex to the graph.
        """
        self.vertices[vertex_id] = {}

    def add_edge(self, v1, v2, direction):
        """
        Add a directed edge to the graph.
        """
        # if v1 in self.vertices and v2 in self.vertices:
        if v1 != '-1':
            self.vertices[v1][direction] = v2
        if v2 != '-1':
            self.vertices[v2][OPPOSITE_DIRECTION[direction]] = v1
        # else:
        #     raise IndexError("One or both of the vertices does not exist")

    def get_neighbors(self, vertex_id):
        """
        Get all neighbors (edges) of a vertex.
        """
        if vertex_id in self.vertices:
            return self.vertices[vertex_id]
        else:
            raise IndexError("Vertex does not exist")


class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None

    def size(self):
        return len(self.queue)


class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        if self.size() > 0:
            return self.stack.pop()
        else:
            return None

    def size(self):
        return len(self.stack)
