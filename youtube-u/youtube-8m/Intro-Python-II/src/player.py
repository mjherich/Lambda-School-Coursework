# Write a class to hold player information, e.g. what room they are in
# currently.
class Player:
  def __init__(self, name, current_room):
    self.name = name
    self.current_room = current_room
    self.items = []
  def show_items(self):
    if len(self.items) > 0:
      return f'\nYou currently have: {", ".join([item.name for item in self.items])}'
    else:
      return '\nYour inventory is empty. Explore the world some more.'