from util import Player, Graph, Queue, Stack
import time, requests
import multiprocessing as mp

API_URL = "http://localhost:6000"
OPPOSITE_DIRECTION = {
    'n': 's',
    's': 'n',
    'e': 'w',
    'w': 'e'
}

# === Initialize local script state ===
# Hit /init and get back state of Players (player name and what room they are in), store locally
r = requests.get(API_URL+"/api/init")
res = r.json()
players = []
# TODO
for player in res:
    # if player is not at room 0 we cannot continue
    if player[]
    players.append(Player(player["name"], player["previous_direction"]))

# Initialize the local graph
g = Graph()
# Hit the /graph endpoint and update the local graph with the returned adjacency list
r = requests.get(API_URL+"/api/ad_list")
res = r.json()
# TODO: Copy the adjacency list from the API response into the local graph


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

Format: [PLAYER_NAME, PREVIOUS_ROOM, PREVIOUS_DIRECTION, CURRENT_ROOM, CURRENT_ROOM_EXITS]
"""
player_q = Queue()
for player in players:
    player_q.enqueue([player["name"], player["current_room"], player["exits"]])

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