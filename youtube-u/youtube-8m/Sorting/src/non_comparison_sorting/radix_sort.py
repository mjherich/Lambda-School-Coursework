import math


def get_int_at(idx, num):
    factor = idx * 10
    x = math.floor(num / factor)
    return x % factor


def digit_count(num):
    return len(str(num))


def radix_sort(arr):
    """
    Radix sort only works on lists of numbers since it exploits the fact that a number with more digits is larger than one with less.
    """
    # Determine number of iterations by finding the number with the most digits
    iterations = 0
    for num in arr:
        num_digits = digit_count(num)
        if num_digits > iterations:
            iterations = num_digits

    # Loop over each num in arr, `iterations` times
    bins = {0: [], 1: [], 2: [], 3: [], 4: [],
            5: [], 6: [], 7: [], 8: [], 9: []}
    for i in range(1, iterations + 1):
        for num in arr:
            num_digits = digit_count(num)
            if num_digits >= i:
                num_str = str(num)
                digit = num_str[-i]
                bins[int(digit)].append(num)
            else:
                bins[0].append(num)
        # Re-build arr after first iteration and reset bins
        if i >= 1:
            arr = []
            for b in bins:
                arr += bins[b]
            bins = {0: [], 1: [], 2: [], 3: [], 4: [],
                    5: [], 6: [], 7: [], 8: [], 9: []}
    return arr
