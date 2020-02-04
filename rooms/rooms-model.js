const db = require('../database/db-config.js');

module.exports = {
  find,
  findById,
  add,
  edit,
  remove
}

function find() {
  return db('rooms')
}

function findById(room_id) {
  return db('rooms').where('room_id', room_id).first()
}

function add(room) {
  return db('rooms').insert(room)
}

function edit(room_id, room) {
  return db('rooms').update(room).where('room_id', room_id)
}

function remove(room_id) {
  return db('rooms').del().where('room_id', room_id)
}