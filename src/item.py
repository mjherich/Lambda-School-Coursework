class Item:
  def __init__(self, name, description):
    self.name = name
    self.description = description
  def on_take(self):
    print(f'\nYou have picked up {self.name}')
  def on_drop(self):
    print(f'\nYou have dropped {self.name}')

class Treasure(Item):
  def __init__(self, name, description, value):
    super().__init__(name, description)
    self.value = value

class Weapon(Item):
  def __init__(self, name, description, multiplier):
    super().__init__(name, description)
    self.multiplier = multiplier