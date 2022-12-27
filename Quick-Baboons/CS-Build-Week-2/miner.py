import hashlib
import requests
import json

import time
from timeit import default_timer as timer
from thesecrets import LS_API_URL



def proof_of_work(last_proof, difficulty):

    start = timer()

    print("Searching for next proof")
    proof = last_proof
    last_proof_string = json.dumps(last_proof)
    difficulty = json.dumps(difficulty)
    while valid_proof(last_proof_string, proof, difficulty) is False:
        proof += 1
    print("Proof found: " + str(proof) + " in " + str(timer() - start))
    return proof

# hash(last_proof, proof) contain N leading zeroes
def valid_proof(last_proof, proof, difficulty):

    str_diff = ""
    for i in range(int(difficulty)):
        str_diff += "0"

    guess = f"{last_proof}{proof}".encode()
    guess_hash = hashlib.sha256(guess).hexdigest()

    return guess_hash[:int(difficulty)] == str_diff


def mine_coin(player_token):
    # What node are we interacting with?
    
    # node = "https://lambda-treasure-hunt.herokuapp.com/api/bc"

    coins_mined = 0
    headers = {
        "Authorization": f"Token {player_token}",
        "Content-Type": "application/json"
    }
    while True:
        # Get the last proof from the server
        time.sleep(1)
        r = requests.get(LS_API_URL + "/api/bc/last_proof/", headers=headers)
        data = r.json()

        last_proof = data.get('proof')
        print(last_proof)

        new_difficulty = data.get('difficulty')
        new_proof = proof_of_work(last_proof, new_difficulty)
        
        post_data = {"proof": new_proof}

        r = requests.post(LS_API_URL + '/api/bc/mine/', headers=headers, json=post_data)
        data = r.json()
        if 'errors' in data:
            print(data['errors'])
            time.sleep(data['cooldown'])
            return False
        time.sleep(data['cooldown'])
        return True




# if __name__ == '__main__':
#     # What node are we interacting with?
    
#     node = "https://lambda-treasure-hunt.herokuapp.com/api/bc"

#     coins_mined = 0

#     player = bryan
#     while True:
#         # Get the last proof from the server
#         time.sleep(1)
#         r = bryan.requests.get("https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/")
#         data = r.json()

#         data['proof']

#         new_difficulty = data['difficulty']
#         new_proof = proof_of_work(data['proof'], new_difficulty)
        
#         post_data = {"proof": new_proof}

#         r = bryan.requests.post(url=node + '/mine/', json=post_data)
#         data = r.json()
#         print(data)
#         time.sleep(data.cooldown)