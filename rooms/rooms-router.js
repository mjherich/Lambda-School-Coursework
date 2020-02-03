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
    return res.status(200).json(player.data);
  } catch (e) {
    return res.status(500).json(e);
  }
})

// router.get('/move', async (req, res) => {
//   let auth = {
//     headers: {
//       Authorization: `Token ${req.headers.authorization}`
//     }
//   }
// })



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