from room import Room
from player import Player
from item import Item

import textwrap
import time

# Create items
items = {
    "treasure": Item('Treasure', 'An ancient treasure chest.'),
    "sword": Item('Sword', 'This sword is stuck in a stone.'),
    "coal": Item('Coal', 'Use this coal to start fire.'),
    "candy": Item('Candy', 'A candy cane all by itself.'),
    "pokemon": Item('Goldeen', 'A wild Goldeen appears!'),
}

# Declare all the rooms

room = {
    'outside':  Room("Outside Cave Entrance",
                     "North of you, the cave mount beckons"),

    'foyer':    Room("Foyer", """Dim light filters in from the south. Dusty
passages run north and east."""),

    'overlook': Room("Grand Overlook", """A steep cliff appears before you, falling
into the darkness. Ahead to the north, a light flickers in
the distance, but there is no way across the chasm."""),

    'narrow':   Room("Narrow Passage", """The narrow passage bends here from west
to north. The smell of gold permeates the air."""),

    'treasure': Room("Treasure Chamber", """You've found the long-lost treasure
chamber! Sadly, it has already been completely emptied by
earlier adventurers. The only exit is to the south."""),
}


# Link rooms together

room['outside'].n_to = room['foyer']
room['foyer'].s_to = room['outside']
room['foyer'].n_to = room['overlook']
room['foyer'].e_to = room['narrow']
room['overlook'].s_to = room['foyer']
room['narrow'].w_to = room['foyer']
room['narrow'].n_to = room['treasure']
room['treasure'].s_to = room['narrow']

# Add items to treasure room
for item in items:
    room['treasure'].items.append(items[item])

#
# Main
#

# Textwrapper for description in repl
wrapper = textwrap.TextWrapper(width=50)

# Make a new player object that is currently in the 'outside' room.
player = Player("Matt", room['outside'])

# Write a loop that:
#
# * Prints the current room name
# * Prints the current description (the textwrap module might be useful here).
# * Waits for user input and decides what to do.
#
# If the user enters a cardinal direction, attempt to move to the room there.
# Print an error message if the movement isn't allowed.
#
# If the user enters "q", quit the game.
while True:
    print(f'\n====================\nCurrently in: {player.current_room.name}')
    print(wrapper.fill(text=player.current_room.description))
    print(f'\n{player.current_room.show_items()}')
    user_input = input('Where do you want to go? (n, e, s, w): ').split()
    # Take/get or drop Item commands
    if len(user_input) == 2:
        if user_input[0].lower() == 'get' or user_input[0].lower() == 'take':
            found = False
            for i in range(len(player.current_room.items)):
                item = player.current_room.items[i]
                if user_input[1].lower() == item.name.lower():
                    player.items.append(player.current_room.items.pop(i))
                    item.on_take()
                    found = True
                    break
            if not found:# i == len(player.current_room.items)-1:
                print(f'\n{user_input[1]} not found in {player.current_room.name}.')
        elif user_input[0].lower() == 'drop':
            found = False
            for i in range(len(player.items)):
                item = player.items[i]
                if user_input[1].lower() == item.name.lower():
                    player.current_room.items.append(player.items.pop(i))
                    item.on_drop()
                    found = True
                    break
            if not found:# i == len(player.current_room.items)-1:
                print(f'\n{user_input[1]} not found in your bag.')
    # Move North command
    elif user_input[0].lower() == 'n':
        if player.current_room.n_to != None:
            player.current_room = player.current_room.n_to
        else:
            print('There is no room north of your position, explore elsewhere!')
            time.sleep(2)
    # Move East command
    elif user_input[0].lower() == 'e':
        if player.current_room.e_to != None:
            player.current_room = player.current_room.e_to
        else:
            print('There is no room east of your position, explore elsewhere!')
            time.sleep(2)
    # Move South command
    elif user_input[0].lower() == 's':
        if player.current_room.s_to != None:
            player.current_room = player.current_room.s_to
        else:
            print('There is no room south of your position, explore elsewhere!')
            time.sleep(2)
    # Move West command
    elif user_input[0].lower() == 'w':
        if player.current_room.w_to != None:
            player.current_room = player.current_room.w_to
        else:
            print('There is no room west of your position, explore elsewhere!')
            time.sleep(2)
    # Show inventory command
    elif user_input[0].lower() == 'i' or user_input[0].lower() == 'inventory':
        print(player.show_items())
    # Quit game command
    elif user_input[0].lower() == 'q' or user_input[0].lower() == 'quit':
        break
    else:
        print('You must enter a valid direction.')
        time.sleep(2)