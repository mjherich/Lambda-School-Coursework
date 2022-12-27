class DynamicArray:
    def __init__(self, capacity=8):
        self.storage = [None] * capacity
        self.count = 0  # Count is how much is currently used
        self.capacity = capacity  # How much is currently allocated

    def insert(self, idx, val):
        if self.count == self.capacity:
            # TODO resize
            print("Error, array is full")
            return

        # Shift everything to the right
        for i in range(self.count, idx, -1):
            self.storage[i] = self.storage[i - 1]

        # Insert our value
        self.storage[idx] = val
        self.count += 1

    def append(self, value):
        self.insert(self.count, val)

    def resize(self):
        self.capacity *= 2
        new_storage = [None] * self.capacity
        for i in range(self.count):
            new_storage[i] = self.storage[i]
        self.storage = new_storage

    def replace(self):
        self.storage[idx] = val

    def add_to_front(self, val):
        self.insert(0, val)

    def slice(self, beginning_idx, end_idx):
        # Beginning and end
        # Create subarray to store values

        # Copy beginning to end to subarray

        # Decide how this works. What happens to the original array?
        # leave it alone? Or cut out what we're slicing

        # Return subarray