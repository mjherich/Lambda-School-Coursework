#!/usr/bin/python

import sys

def rock_paper_scissors(n):
  moves = ['rock', 'paper', 'scissors']

  # Array to hold each game permutation
  games = []
  
  def find_games(n, turn=[]):
    # Check if end of permutation and append to plays
    if n == 0:
      games.append(turn)
      return

    for move in moves:
      find_games(n-1, turn + [move])

  find_games(n)
  return games



if __name__ == "__main__":
  if len(sys.argv) > 1:
    num_plays = int(sys.argv[1])
    print(rock_paper_scissors(num_plays))
  else:
    print('Usage: rps.py [num_plays]')