# Implement a class to hold room information. This should have name and
# description attributes.
class Room:
  '''
  This is a room class which contains methods to navigate to surrounding rooms.
  '''
  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.n_to = None
    self.e_to = None
    self.s_to = None
    self.w_to = None
    self.items = []
  def show_items(self):
    if len(self.items) > 0:
      return f'Available items: {", ".join([item.name for item in self.items])}'
    else:
      return 'No items in this room.'