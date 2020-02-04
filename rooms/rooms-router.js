// Initialize player
  // Store current location in player-room 
  // If current location not in room database, put it in


// Move (takes in a direction)

  // wiseman object

  // get player location info
  // if player location.direction_room is not null or -1:
      // add direction_room id to wiseman object


  // use direction to make axios call for new room
    // update new room. direction to player location info
    // update player location info opposite direction to new room
    // Add new room to database if not in


const router = require('express').Router();
const Rooms = require('./rooms-model.js');
const {
  validateRoomId,
  validatePostReqBody
} = require('../api/middleware.js')
const axios = require('axios')

// requires ---> {Authorization: 'Token 564738fhghgjfg...'}
router.get('/init', async (req, res) => {
  let auth = {
    headers: {
      Authorization: `Token ${req.headers.authorization}`
    }
  }
  try {
    const player = await axios('https://lambda-treasure-hunt.herokuapp.com/api/adv/init/', auth);
    // let toBeSaved = {}
    // toBeSaved[room_id] = player.data.room_id
    // toBeSaved[title] = player.data.title
    // toBeSaved[description] = player.data.description
    // toBeSaved[coordinates] = player.data.coordinates
    // // player.data.exits.forEach(exit => {
    // //   if (exit === 'n') {
    // //     toBeSaved['n'] = 
    // //   }
    // // })
    // toBeSaved[room_id] = player.data.room_id
    // toBeSaved[room_id] = player.data.room_id
    // toBeSaved[room_id] = player.data.room_id
    // toBeSaved[room_id] = player.data.room_id
    
    // Rooms.add(player.data.)
    return res.status(200).json(player.data);
  } catch (e) {
    return res.status(500).json(e);
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
      res.status(500).json({message: 'Error retrieving the rooms.'})
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
      res.status(201).json({ message: 'Successfully added the room.', room})
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