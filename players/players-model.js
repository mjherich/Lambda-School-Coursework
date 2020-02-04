const db = require('../database/db-config.js');

module.exports = {
  find,
  findById,
  add,
  edit,
  remove
}

function find() {
  return db('players')
}

function findById(player_id) {
  return db('players').where('player_id', player_id).first()
}

function add(player) {
  return db('players').insert(player)
}

function edit(player_id, player) {
  return db('players').update(player).where('player_id', player_id)
}

function remove(player_id) {
  return db('players').del().where('player_id', player_id)
}