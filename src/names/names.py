import time

f = open('names1.txt', 'r')
names_1 = f.read().split("\n")  # List containing 10000 names
f.close()

f = open('names2.txt', 'r')
names_2 = f.read().split("\n")  # List containing 10000 names
f.close()

dict = {}

dups = []

for name in names_1:
    dict.update({name: name})

for name in names_2:
    if name in dict:
        dups.append(name)

print(set(names_1) & set(names_2))