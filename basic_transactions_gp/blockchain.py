import hashlib
import json
from time import time
from uuid import uuid4

from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []

        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)

    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain

        A block should have:
        * Index
        * Timestamp
        * List of current transactions
        * The proof used to mine this block
        * The hash of the previous block

        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """

        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash
        }

        # Reset the current list of transactions
        self.current_transactions = []
        # Append the chain to the block
        self.chain.append(block)
        # Return the new block
        return block

    def hash(self, block):
        """
        Creates a SHA-256 hash of a Block

        :param block": <dict> Block
        "return": <str>
        """

        # Use json.dumps to convert json into a string
        # Use hashlib.sha256 to create a hash
        # It requires a `bytes-like` object, which is what
        # .encode() does.
        # It convertes the string to bytes.
        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes

        # TODO: Create the block_string
        string_object = json.dumps(block, sort_keys=True).encode()

        # TODO: Hash this string using sha256
        raw_hash = hashlib.sha256(string_object)

        # By itself, the sha256 function returns the hash in a raw string
        # that will likely include escaped characters.
        # This can be hard to read, but .hexdigest() converts the
        # hash to a string of hexadecimal characters, which is
        # easier to work with and understand
        hex_hash = raw_hash.hexdigest()

        return hex_hash

    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def valid_proof(block_string, proof):
        """
        Validates the Proof:  Does hash(block_string, proof) contain 3
        leading zeroes?  Return true if the proof is valid
        :param block_string: <string> The stringified block to use to
        check in combination with `proof`
        :param proof: <int?> The value that when combined with the
        stringified previous block results in a hash that has the
        correct number of leading zeroes.
        :return: True if the resulting hash is a valid proof, False otherwise
        """
        guess = f"{block_string}{proof}".encode()
        guess_hash = hashlib.sha256(guess).hexdigest()

        return guess_hash[:6] == "000000"

    def new_transaction(self, sender, recipient, amount):
        """
        Creates a new transaction to go into the next mined block

        :param sender: <str> Name of the sender
        :param recipient: <str> Name of the recipient
        :param amount: <float> amount of the transaction
        :return: <index> The index of the block that will hold the transaction
        """
        self.current_transactions.append({
            'sender': sender,
            'recipient': recipient,
            'amount': amount
        })
        return len(self.chain)


# Instantiate our Node
app = Flask(__name__)

# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')

# Instantiate the Blockchain
blockchain = Blockchain()


@app.route('/transactions/new', methods=['POST'])
@cross_origin(supports_credentials=True)
def new_transaction():
    data = request.get_json()

    required = ['sender', 'recipient', 'amount']
    if not all(k in data for k in required):
        response = {'message': 'Missing values'}
        return jsonify(response), 400

    # Create new transaction
    index = blockchain.new_transaction(data['sender'],
                                       data['recipient'],
                                       data['amount'])
    response = {'message': f'Transaction will post to block {index}.'}
    return jsonify(response), 201

@app.route('/mine', methods=['POST'])
@cross_origin(supports_credentials=True)
def mine():
    data = request.get_json()
    # Check that the response contains both proof and id
    if "proof" not in data or "block_id" not in data:
        error = {
            "message": "Requires both proof and id in the request"
        }
        return jsonify(error), 422

    # Check if proof is valid for the block id
    block = blockchain.chain[data["block_id"]-1]
    proof = data["proof"]
    is_valid = blockchain.valid_proof(json.dumps(block, sort_keys=True), proof)

    # If the block is valid then forge it and append to the chain
    if is_valid:
        previous_hash = blockchain.hash(blockchain.last_block)
        forged_block = blockchain.new_block(proof, previous_hash)

        # blockchain.new_transaction(
        #     sender="0",
        #     recipient=data["id"],
        #     amount=100
        # )
        print("New block mined")
        response = {
            "message": "New Block Forged",
            "forged_block": forged_block
        }
        return jsonify(response), 200
    else:
        error = {
            "message": "Not a valid proof of work"
        }
        return error, 400


@app.route('/chain', methods=['GET'])
@cross_origin(supports_credentials=True)
def full_chain():
    response = {
        # TODO: Return the chain and its current length
        "length": len(blockchain.chain),
        "chain": blockchain.chain
    }
    return jsonify(response), 200


@app.route('/last_block', methods=['GET'])
@cross_origin(supports_credentials=True)
def last_block():
    return jsonify(blockchain.last_block), 200


# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
