# Lambda Build Week II
## Quick Baboons Backend

- Express, Knex, Sqlite3 (local), PostgreSQL (production)

Base URL: https://quick-baboons.herokuapp.com

Each endpoint requires the following headers:
```json
"Authorization": player_auth_token
```

# API Documentation


## **GET** `/api/rooms/init`
Retrieves player current location and additional information about the room the player is currently in. If current room is not saved to db, then it will be saved.

Response:
```json
{
    "player": {
        "room_id": 4,
        "title": "A misty room",
        "description": "You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.",
        "coordinates": "(61,60)",
        "elevation": 0,
        "terrain": "NORMAL",
        "players": [

        ],
        "items": [

        ],
        "exits": [
            "n",
            "e",
            "w"
        ],
        "cooldown": 1,
        "errors": [

        ],
        "messages": [

        ]
    },
    "message": "findbyId worked. Room already existed"
}
```
___

## **POST** `/api/rooms/move`
Moves the player to the connected room based on the provided exit direction.

Body:
```json
"direction": "n" || "s" || "e" || "w"
```

Response:
```json
{
    "room_id": 4,
    "title": "A misty room",
    "description": "You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.",
    "coordinates": "(61,60)",
    "elevation": 0,
    "terrain": "NORMAL",
    "items": "",
    "cooldown": 7.5,
    "errors": "",
    "messages": "You have walked east.,Wise Explorer: -50% CD,",
    "n": 23,
    "s": null,
    "e": -1,
    "w": 0
}
```
___
## **GET** `/api/rooms/adlist`
Retrieves the graph of all connected rooms.

Response:
```json
{
    "4": [
        {
            "n": 23
        }
    ],
    "23": [
        {
            "s": 4
        },
        {
            "e": 26
        }
    ],
    "26": [
        {
            "e": 55
        },
        {
            "w": 23
        }
    ],
    "55": [
        {
            "w": 26
        }
    ]
}
```