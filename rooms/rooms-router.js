// Initialize player
// Store current location in player-room 
// If current location not in room database, put it in


// Move (takes in a direction)

// wiseman object

// get player location info
// if player location.direction_room is not null or -1:
// add direction_room id to wiseman object


// use direction to make axios call for new room
// new room database opposite direction to player location (update room db)

// update old room direction to new room (update room db)

// add new room to database if doesn't exist

// update player current location


const router = require('express').Router();
const Rooms = require('./rooms-model.js');
const Players = require('../players/players-model.js');
const {
  validateRoomId,
  validatePostReqBody
} = require('../api/middleware.js')
const axios = require('axios')


router.get('/rooms', (req, res) => {
  Rooms.find()
    .then(rooms => res.json(rooms))
    .catch(err => res.json(err))
})


router.get('/players', (req, res) => {
  Players.find()
    .then(players => res.json(players))
    .catch(err => res.json(err))
})




// requires ---> {Authorization: 'Token 564738fhghgjfg...'}
router.get('/init', async (req, res) => {

  // grab token

  let token = req.headers.authorization
  console.log(token)
  let auth = {
    headers: {
      Authorization: `Token ${token}`
    }
  }

  // This try catch is for Lambda's init. If error, it's from lambda, not our API
  try {
    // use init lambda function to get room data
    const player = await axios('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', auth);

    // cons
    // put player data in player location
    let player_data = { 'current_room': player.data.room_id }
    await Players.edit(token, player_data)
    // console.log('player', player)


    try {
      possible_room = await Rooms.findById(player.data.room_id)
      console.log('possible_room', possible_room, player.data)

      if (possible_room === undefined) {
        let room_data = {}
        room_data['room_id'] = player.data.room_id
        room_data['title'] = player.data.title
        room_data['description'] = player.data.description
        room_data['coordinates'] = player.data.coordinates
        room_data['n'] = null
        room_data['s'] = null
        room_data['e'] = null
        room_data['w'] = null

        player.data.exits.forEach(exit => {
          room_data[exit] = -1

          // exit === 'n' ? room_data['n'] = -1 : null
          // exit === 's' ? room_data['s'] = -1 : null
          // exit === 'e' ? room_data['e'] = -1 : null
          // exit === 'w' ? room_data['w'] = -1 : null
        })

        try {
          let added_room = await Rooms.add(room_data)
          return res.status(200).json({ added_room, message: "rooms add" })
        } catch {
          return res.status(500).json({ messsage: 'Could not add room to database' })
        }
      }

      else {
        return res.status(200).json({ player: player.data, message: "findbyId" })
      }
    } catch {
      return res.status(500).json({ message: "Database error" })
    }

  } catch (err) {
    // If lambda throws error
    return res.status(500).json({ err, message: "Error from lambda, init not working. Possibly add token?" });
  }
})

// move player to new room and return all data about that room
// INPUT: 'direction'

router.get('/move', async (req, res) => {


  // Get direction and room info from body

  // Query database to find room info in database, specifically the directions
  //If direction has room_id, add it to body object

  // In the axios call getting the next room
  //Add room to database if not already
  // If direction === s, current room n === new room 
  //If direction === n, current room s === new room
  let auth = {
    headers: {
      Authorization: `Token ${req.headers.authorization}`
    }
  }
  let reqBody = {
    body: {
      direction: req.body.direction,
      // next_room_id: req.body.next_room_id
    }
  }
  // Query our table for the current room id and get back all the data we have on it
  // knex... room
  let room = Rooms.findById()
  let moveToKnownRoom = false
  if (room[req.direction] === -1) {
    // Do nothing
  } else if (room[req.direction] === null) {
    // Respond with 500 error
  } else {
    reqBody.body.next_room_id = room[req.direction]
    moveToKnownRoom = true
  }

  // Hit the endpoint with reqBody
  try {
    const player = await axios('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', auth, reqBody);
    return res.status(200).json(player.data);
  } catch (e) {
    return res.status(500).json(e);
  }
  // Get back data on the room we went to
  // Use that data to update our knowledge of the map in the db
  if (!moveToKnownRoom) {
    // Create a new room entry with the data returned from above axios call
  }


  let toBeSaved = {}
  toBeSaved[room_id] = player.data.room_id
  toBeSaved[title] = player.data.title
  toBeSaved[description] = player.data.description
  toBeSaved[coordinates] = player.data.coordinates
  player.data.exits.forEach(exit => {
    if (exit === 'n') {
      toBeSaved['n'] = -1
    } else {
      toBeSaved['n'] = null
    }
    if (exit === 's') {
      toBeSaved['s'] = -1
    } else {
      toBeSaved['s'] = null
    }
    if (exit === 'e') {
      toBeSaved['e'] = -1
    } else {
      toBeSaved['e'] = null
    }
    if (exit === 'w') {
      toBeSaved['w'] = -1
    } else {
      toBeSaved['w'] = null
    }
  })
  toBeSaved[room_id] = player.data.room_id
  toBeSaved[room_id] = player.data.room_id
  toBeSaved[room_id] = player.data.room_id
  toBeSaved[room_id] = player.data.room_id

  if (req.body.next_room_id) {
    Rooms.findById(req.body.next_room_id)
  }

})



router.get('/', (req, res) => {
  Rooms.find()
    .then(rooms => {
      res.status(200).json(rooms)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the rooms.' })
      console.log(err)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Rooms.findById(id)
    .then(room => {
      res.status(200).json(room)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the room.' })
      console.log(err)
    })
})

router.post('/', validatePostReqBody, (req, res) => {
  const room = req.body
  Rooms.add(room)
    .then(id => {
      [newRoomId] = id
      return Rooms.findById(newRoomId)
    })
    .then(room => {
      res.status(201).json({ message: 'Successfully added the room.', room })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the room.' })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const updated = req.body
  Rooms.edit(id, updated)
    .then(updatedRoomId => {
      return Rooms.findById(updatedRoomId)
    })
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating the room.' })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Rooms.remove(id)
    .then(deleted => {
      res.status(200).json({ message: 'Successfully removed the room.' })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error removing the room.' })
    })
})

module.exports = router;