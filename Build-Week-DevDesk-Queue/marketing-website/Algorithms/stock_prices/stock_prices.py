#!/usr/bin/python

import argparse

def find_max_profit(prices):
  # Initialize counters
  min_price = prices[0]
  max_profit = prices[1] - prices[0]
  
  for price in prices[1:]:
    potential_profit = price - min_price
    if potential_profit > max_profit:
      max_profit = potential_profit
    if price < min_price:
      min_price = price
  
  return max_profit

if __name__ == '__main__':
  # This is just some code to accept inputs from the command line
  parser = argparse.ArgumentParser(description='Find max profit from prices.')
  parser.add_argument('integers', metavar='N', type=int, nargs='+', help='an integer price')
  args = parser.parse_args()

  print("A profit of ${profit} can be made from the stock prices {prices}.".format(profit=find_max_profit(args.integers), prices=args.integers))