#!/usr/bin/python

import math

def recipe_batches(recipe, ingredients):
  batches = 0
  no_more_ingredients = False

  while not no_more_ingredients:
    for ingredient in recipe:
      if ingredient in ingredients and ingredients[ingredient] >= recipe[ingredient]:
        ingredients[ingredient] -= recipe[ingredient]
      else:
        no_more_ingredients = True

    if no_more_ingredients is False:
      batches += 1

  return batches


if __name__ == '__main__':
  # Change the entries of these dictionaries to test 
  # your implementation with different inputs
  recipe = { 'milk': 100, 'butter': 50, 'flour': 5 }
  ingredients = { 'milk': 132, 'butter': 48, 'flour': 51 }
  print("{batches} batches can be made from the available ingredients: {ingredients}.".format(batches=recipe_batches(recipe, ingredients), ingredients=ingredients))