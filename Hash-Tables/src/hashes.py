import time
import hashlib

n = 1000000
key = b"STR"
print(key)

for _ in range(10):
    print(int(hashlib.sha256(key).hexdigest(), 16) % 8)