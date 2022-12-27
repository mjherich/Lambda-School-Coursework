"""
Write a program to determine if a number, given on the command line, is prime.

How can you optimize this program?
Implement The Sieve of Eratosthenes, one of the oldest algorithms known (ca. 200 BC).
"""
import os, sys, math, json

# Load sieve from file
sieve = None
with open('sieve.json', 'r') as sieve_json:
    data = json.load(sieve_json)
    sieve = data


def persist_sieve(data):
    with open('sieve.json', 'w') as sieve_json:
        json.dumps(data, sieve_json)


def build_sieve(num):
    """Builds a Sieve of Eratosthenes (https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)"""

    if num < 2:
        raise Exception("Primes must be greater than 1")
    else:
        # Create a new set from 2 to num
        new_sieve = [True for _ in range(num)]
        # Determine max multiples to eliminate
        max_multiple = math.sqrt(num)
        current_multiple = 2
        while current_multiple <= max_multiple:
            times = 2
            multiple = current_multiple * times
            # Eliminate all multiples of this prime
            while multiple <= num:
                new_sieve[multiple-1] = False
                times += 1
                multiple = current_multiple * times
            current_multiple += 1
            # Sieve is now an array starting from 2 to num; primes are True
        primes = []
        for i in range(len(new_sieve)):
            num = i + 2
            # If prime append to primes list
            if new_sieve[i]:
                primes.append(num)
        return primes
            

def is_prime(num):
    if num < 2:
        raise Exception("Primes must be greater than 1")
    # If input is smaller than max of sieve we can check if it's prime
    elif num <= len(sieve):
        return sieve[num-1]
    # Else we have to increase the size of the sieve
    else:
        pass
    


if __name__ == '__main__':
    if len(sys.argv) > 1:
        num = int(sys.argv[1])
        primes = build_sieve(num)
        print(primes)
    else:
        print(f"Must pass in an integer argurment.")