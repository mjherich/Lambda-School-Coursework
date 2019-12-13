#### Please add your answers to the ***Analysis of  Algorithms*** exercises here.

## Exercise I

a) O(n^3)
~~~
a = 0                  # O(1)
while (a < n ^ 3):     # O(n^3) this dominates
    a = a + n * n      # O(1)
~~~
The second line dominates the others since it's cubic time compared to constant time, therefore the overall time complexity of this block of code is cubic O(n^3).

b) O(n log n)
~~~
sum = 0                  # O(1)     
for i in range(n):       # O(n)     =>  O(n)      ↘
    j = 1                # O(1)                      => O(n log n)
    while j < n:         # O(log n) =>  O(log n)  ↗
        j *= 2           # O(1)
        sum += 1         # O(1)
~~~
This code contains a nested loop. The for loop runs in O(n) and the while loop runs in O(log n) due to the doubling of j with a cutoff of `j<n`. This produces an overall time complexity of O(n log n).

c) O(bunnies)
~~~
def bunnyEars(bunnies):
    if bunnies == 0:                   # O(1)
        return 0                       # O(1)

    return 2 + bunnyEars(bunnies-1)    # O(bunnies)
~~~
This is a recursive function that decrements by 1 and terminates at 0, starting from bunnies (n), therefore the function is O(bunnies) or O(n).

## Exercise II

n = # floors in building
f is what we are searching for
🥚 breaks if floor_dropped_from >= f else doesn't break
_________
|◼ ◼ ◼ ◼| n = 10
|◼ ◼ ◼ ◼| n = 9
|◼ ◼ ◼ ◼| n = 8
|◼ ◼ ◼ ◼| n = 7
|◼ ◼ ◼ ◼| n = 6
|◼ ◼ ◼ ◼| n = 5 
|◼ ◼ ◼ ◼| n = 4
|◼ ◼ ◼ ◼| n = 3
|◼ ◼ ◼ ◼| n = 2
|◼ ◼ ◼ ◼| n = 1
|◼ ◼ ◼ ◼| n = 0

To find f we should...
1) Start at floor n/2, call that f and set f'=0                                                                           # O(1)
2) Drop 🥚 and see if it breaks     # This will loop over and over until f-f'==0, where f' is the last floor you tested   # O(1)
    2.1) If f-f'==0 we can't go up or down anymore so return last f where egg dropped and didn't break                    # O(1)
    2.2) If breaks: Go down (f-f')/2 floors and repeat step 2                                                             # O(log n)
         If intact: Go up (f-f')/2 floors and check if the egg breaks from there

The above algorithm is effectively binary search since the number of floors we are testing (search space n) halves every iteration, therefore the overall time complexity would be O(log n).