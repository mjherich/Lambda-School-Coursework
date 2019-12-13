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


