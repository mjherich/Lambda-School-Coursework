from util import Player, Graph, Queue, Stack
from secrets import *

import time, requests, pdb
import multiprocessing as mp

API_URL = "http://39ca3396.ngrok.io"
LS_API_URL = "https://lambda-treasure-hunt.herokuapp.com"
OPPOSITE_DIRECTION = {
    'n': 's',
    's': 'n',
    'e': 'w',
    'w': 'e'
}

# === Initialize local script state ===
# Hit /init and get back state of Players (player name and what room they are in), store locally

# Load Player instances
players = []

requests_blaine = requests.Session()
requests_blaine.headers.update({
    "Authorization": BLAINE_TOKEN
})
# r = requests_blaine.get(API_URL+"/api/rooms/init")
# player_data = r.json()["player"]
# players.append(Player("Blaine", player_data['room_id'], player_data['exits'], requests_blaine))

requests_bryan = requests.Session()
requests_bryan.headers.update({
    "Authorization": BRYAN_TOKEN
})
# r = requests_bryan.get(API_URL+"/api/rooms/init")
# player_data = r.json()["player"]
# players.append(Player("Bryan", player_data['room_id'], player_data['exits'], requests_bryan))

requests_matt = requests.Session()
requests_matt.headers.update({
    "Authorization": MATT_TOKEN
})
r = requests_matt.get(API_URL+"/api/rooms/init")
player_data = r.json()["player"]
players.append(Player("Matt", player_data['room_id'], player_data['exits'], requests_matt))

requests_sean = requests.Session()
requests_sean.headers.update({
    "Authorization": SEAN_TOKEN
})
# r = requests_sean.get(API_URL+"/api/rooms/init")
# player_data = r.json()["player"]
# players.append(Player("Sean", player_data['room_id'], player_data['exits'], requests_sean))

# FORMAT OF CUSTOM requests session
# res = requests_matt.get(API_URL+"/api/rooms/init")

# Initialize the local graph
g = Graph()
# Hit the /api/rooms/adlist endpoint and update the local graph with the returned adjacency list
r = requests_matt.get(API_URL+"/api/rooms/adlist")
ad_list = r.json()

# Add vertices
for room_id in ad_list:
    # Add room_id as a vertex if not in g
    if room_id not in g.vertices:
        g.add_vertex(room_id)


# Add edges
for room_id in ad_list:
    neighbors = ad_list[room_id]
    # print(neighbors)
    for i in range(len(neighbors)):
        neighbor = neighbors[i]
        # id of neighbors
        neighbor_direction = list(neighbor.keys())
        neighbor_direction = neighbor_direction[0]

        neighbor_id = neighbor[neighbor_direction]
        
        g.add_edge(room_id, str(neighbor_id), neighbor_direction)


# === Traversal using Multiprocessing ===
# Main function which gets called in separate processes for each player
def move(player):
    """
    Takes in a Player object and determines the next move to take to traverse the graph
    Then waits until the cooldown has elapsed before re-enqueuing to the player queue
    """
    # TODO: Find a direction


# Create player queue and enqueue all players
"""
The player queue will contain players whose cooldown is zero.
Players will automatically be enqued by subsequent processes when the cooldown has finished.
"""
player_q = Queue()
# TESTING WITH player: MATT
player_q.enqueue(players[2])
# for player in players:
#     player_q.enqueue([player["name"], player["current_room"], player["exits"]])

# Main loop
# Create visited set to keep track of the number of rooms we know
visited = {room for room in g}
while len(visited) < 500:

    # Keep checking size of player queue every 200ms
    p = None
    while p is None:
        if player_q.size() > 0:
            name, prev_room, prev_direction, cur_room, cur_exits  = player_q.dequeue()
            # If we move to a new room update the local graph and visited set
            if cur_room not in visited:
                visited.add(cur_room)
                g.add_vertex(cur_room)
                # Connect previous room with current room using prev_direction
                g.add_edge(prev_room, cur_room, prev_direction)
                # Connect current room with previous room using opposite of prev_direction
                g.add_edge(cur_room, prev_room, OPPOSITE_DIRECTION[prev_direction])
        else:
            time.sleep(0.2)

    # Now we have a player with no cooldown so figure out the best direction to go in the graph...
    # Spin up a new process which will handle moving a player and waiting for cooldown to enqueue to player_q
    process = mp.Process(target=move, args=(p,))
    process.start()

    # After starting the process, the move function will work in the background and this main loop
    # will continue processing players and making new threads...
    # Once the move function moves the player it will wait for the cooldown to elapse before enqueuing
    # the player back to player_q