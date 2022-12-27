# TO-DO: Complete the selection_sort() function below 
def selection_sort( arr ):
    # loop through n-1 elements
    for i in range(0, len(arr) - 1):
        smallest_index = i
        # TO-DO: find next smallest element
        # (hint, can do in 3 loc) 
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[smallest_index]:
                smallest_index = j

        # TO-DO: swap
        if smallest_index != i:
            arr[i], arr[smallest_index] = arr[smallest_index], arr[i]

    return arr


# TO-DO:  implement the Bubble Sort function below
def bubble_sort( arr ):
    while True:
        swap = False
        for i in range(len(arr)-1):
            if arr[i+1] < arr[i]:
                arr[i], arr[i+1] = arr[i+1], arr[i]
                swap = True
        if swap == False:
            break
    return arr


# STRETCH: implement the Count Sort function below
def count_sort( arr ):
    # Get max value in input arr
    max_val = 0
    for el in arr:
        if el > max_val:
            max_val = el
    count = [0 for i in range(max_val+1)]

    # Tally counts for each element in input
    for el in arr:
        if el < 0:
            return "Error, negative numbers not allowed in Count Sort"
        count[el] += 1

    # Add previous counts
    for i in range(1,len(count)):
        count[i] += count[i-1]

    out = [0 for i in range(len(arr))]

    for i in range(len(arr)):
        val = arr[i]
        out[count[val]-1] = val
        count[val] -= 1

    return out