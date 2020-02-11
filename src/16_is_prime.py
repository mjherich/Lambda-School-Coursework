"""
Write a program to determine if a number, given on the command line, is prime.

How can you optimize this program?
Implement The Sieve of Eratosthenes, one of the oldest algorithms known (ca. 200 BC).
"""
import os, sys, json

# Load sieve from file
sieve = None
with open('sieve.json', 'r') as sieve_json:
    data = json.load(sieve_json)
    sieve = data

print(sieve)
def is_prime(num):
    memo = {}
    pass
    


if __name__ == '__main__':
    print("in main")
    if len(sys.argv) > 1:
        num = int(sys.argv[1])
        result = is_prime(num)
    else:
        print(f"Program")