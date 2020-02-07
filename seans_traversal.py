from util import Player, Graph, Queue, Stack
from thesecrets import requests_sean, SEAN_TOKEN, API_URL
from miner import mine_coin

import time, requests, pdb, random

OPPOSITE_DIRECTION = {
    'n': 's',
    's': 'n',
    'e': 'w',
    'w': 'e'
}
UNIQUE_ROOMS = { 
   'wish':{ 
      'full_name': 'Wishing Well',
      'room_id':'55'
   },
   'shop':{ 
      'full_name': 'Shop',
      'room_id':'1'
   },
   'origin':{  # Starting room
      'full_name': 'A brightly lit room',
      'room_id':'0'
   },
   'holloway':{  # Shrine
      'full_name': 'The Peak of Mt. Holloway',
      'room_id':'22'
   },
   "grave":{ # Shrine to gain CARRY ability to put items on a ghost;  DONE
      'full_name': 'Glasowyn\'s Grave',
      'room_id':'499'
   },
   "linh":{ # Shrine pray to get DASH; DONE
      'full_name': 'Linh\'s Shrine',
      'room_id':'461'
   },
   "pirate":{ # Name Changer, gain PRAY ability; DONE
      'full_name': 'Pirate Ry\'s',
      'room_id':'467'
   },
   "sandofsky":{ # Shrine to gain RECALL ability; DONE
      'full_name': 'Sandofsky\'s Sanctum',
      'room_id':'492'
   },
   'fully':{ # Shrine to gain ability to warp to underworld;  DONE
      'full_name': 'Fully Shrine',
      'room_id':'374'
   },
   "aaron":{ # Not a shrine, Herin exists knowledge gathered by Arron of Web19/CS21
      'full_name': 'Arron\'s Athenaeum',
      'room_id':'486'
   },
   'trans':{ # Spend coins to make new equipment
      'full_name': 'The Transmogriphier',
      'room_id':'495'
   }
}

# === Initialize local script state ===
# Initialize player
r = requests_sean.get(API_URL+"/api/rooms/init")
player_data = r.json()["player"]
sean = Player("Matt", str(player_data['room_id']), requests_sean)
# Sleep to clear cooldown from init
time.sleep(1.5)

# Initialize the local graph
def sync_graph(g):
    # Hit the /api/rooms/adlist endpoint and update the local graph with the returned adjacency list
    r = sean.requests.get(API_URL+"/api/rooms/adlist")
    ad_list = r.json()

    # Add vertices
    for room_id in ad_list:
        # Add room_id as a vertex if not in g
        if room_id not in g.vertices:
            g.add_vertex(room_id)

    # Add edges
    for room_id in ad_list:
        neighbors = ad_list[room_id]
        for i in range(len(neighbors)):
            neighbor = neighbors[i]
            neighbor_direction = list(neighbor.keys())
            neighbor_direction = neighbor_direction[0]

            neighbor_id = neighbor[neighbor_direction]
            
            g.add_edge(room_id, str(neighbor_id), neighbor_direction)

# First graph sync
g = Graph()
sync_graph(g)

# === Find nearest unvisited room ===
# Main function
def find_nearest_unvisited(player, visited):
    room_id = player.cur_room
    neighbors = g.get_neighbors(room_id)
    q = Queue()

    # FORMAT OF QUEUE: [ [directions], [room_ids] ]
    # Initialize queue
    for direction in neighbors:
        if neighbors[direction] == '-1':
            # Return to main calling function
            print('Found next unvisited room 1 move away.')
            return [direction]
        else:
            # [directions to new location, new room id]
            room_id = neighbors[direction]
            q.enqueue( [ [direction], [room_id] ] )

    # START SEARCH
    while q.size() > 0:
        directions, room_ids = q.dequeue()
        last_room_id = room_ids[-1]
        # Get neighbors
        neighbors = g.get_neighbors(last_room_id)
        neighbors_keys = list(neighbors.keys())
        random.shuffle(neighbors_keys)
        for direction in neighbors_keys:
            r_id = neighbors[direction]
            if r_id == '-1':
                directions.append(direction)
                print(f"Found next unvisited room {len(directions)} moves away.")
                return directions
            elif r_id not in room_ids:
                new_directions = list(directions)
                new_directions.append(direction)
                new_room_ids = list(room_ids)
                new_room_ids.append(r_id)
                q.enqueue([ new_directions, new_room_ids ])


def path_to_room_id(player, target_room_id):
    room_id = player.cur_room
    neighbors = g.get_neighbors(room_id)
    q = Queue()

    # FORMAT OF QUEUE: [ [directions], [room_ids] ]
    # Initialize queue
    for direction in neighbors:
        if neighbors[direction] == target_room_id:
            # Return to main calling function
            print(f'Found {target_room_id} 1 move away')
            return [direction]
        else:
            # [directions to new location, new room id]
            room_id = neighbors[direction]
            q.enqueue( [ [direction], [room_id] ] )

    # START SEARCH
    while q.size() > 0:
        directions, room_ids = q.dequeue()
        last_room_id = room_ids[-1]
        # Get neighbors
        neighbors = g.get_neighbors(last_room_id)
        neighbors_keys = list(neighbors.keys())
        random.shuffle(neighbors_keys)
        for direction in neighbors_keys:
            r_id = neighbors[direction]
            if r_id == target_room_id:
                directions.append(direction)
                print(f'Found room {target_room_id} {len(directions)} moves away.')
                return directions
            elif r_id not in room_ids:
                new_directions = list(directions)
                new_directions.append(direction)
                new_room_ids = list(room_ids)
                new_room_ids.append(r_id)
                q.enqueue([ new_directions, new_room_ids ])


item_counter = 0
def pick_up_items(arr):
    for item in arr[0:-1]:
        cooldown = 8
        # we don't want tiny treasure because it takes up space and we can't pick up more than 10
        # if item != 'tiny treasure' or item_counter < 8:
        if item != '':
            #pick up Item
            post_data = {"name": item}
            headers= {"Authorization": f"Token {SEAN_TOKEN}" } #we need to put the token here
            r = requests.post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/', headers=headers, json=post_data)
            print('response1', r)
            response = r.json()
            print('response', response)
            #set cooldown
            # cooldown = response["cooldown"]
            time.sleep(cooldown)
            
            #print errors if any
            if len(response["errors"]) > 0:
                print("can't pick up Item", item, response["errors"])
                #print error cooldown message
                print('error cooldown ' + str(response["cooldown"]) + ' seconds')
            else:
                # item_counter += 1 # if no errors, item was picked up
                #print normal cooldown message
                print('pick up item cooldown ' + str(response["cooldown"]) + ' seconds')
        else:
            print('ERROR: bad item: ', item)
        
def move(player, direction, visited):
    """ 
    Just moves the player and updates the visited set
    """
    print(f"moving {direction}")
    # Save previous room to update graph after moving
    prev_room = player.cur_room

    payload = {'direction': direction}
    r = player.requests.post(API_URL+'/api/rooms/move', json=payload)
    res = r.json()
    print(res)
    # After moving:
    new_room_id = str(res['room_id'])
    print(f"Moved to room {new_room_id}")
    cooldown = res['cooldown'] + 0.1
    # Add room_id to visited set
    visited.add(new_room_id)
    # Add new vertex if new_room_id is not present in g.vertices
    if new_room_id not in g.vertices:
        g.add_vertex(new_room_id)
        # update the edges as well
        g.add_edge(prev_room, new_room_id, direction)
    # Update player.cur_room
    player.cur_room = new_room_id
    # Sleep for cooldown seconds
    print(f"Cooling down for {cooldown} seconds")
    time.sleep(cooldown)
    # --pick up items--
    if len(res['items']) > 0:
        pick_up_items(res["items"].split(','))



visited = {room for room in g.vertices}
# Main script loop which calls find_nearest_unvisited()
player = sean
# Sleep for a second to gaurantee init cooldown has elapsed
if False:
    while len(visited) < 500:
        print(f"Number of rooms in db: {len(visited)}")
        path = find_nearest_unvisited(player, visited) # path is a list of directions
        print(f"Found shortest path \n {path}")
        for direction in path:
            move(player, direction, visited)
        # Re-sync local graph/vertices with db
        g = Graph()
        sync_graph(g)
        visited = {room for room in g.vertices}

# Navigate to Shop
path = path_to_room_id(player, UNIQUE_ROOMS['wish']['room_id'])
# path_to_shop = path_to_room_id(player, '317')
print(path)
for direction in path:
    move(player, direction, visited)

# Try mining a coin
# mined = False
# while not mined:
#     mined = mine_coin(SEAN_TOKEN)

# headers = {}
# r = requests.post(API_URL+'/api/rooms/move', json={'direction': 's'})
# res = r.json()
# print('res', res)