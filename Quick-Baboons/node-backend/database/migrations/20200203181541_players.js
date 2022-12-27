






exports.up = function(knex) {
  return knex.schema
    .createTable('players', player => {
      player
        .string('player_id')
        .notNullable()
        .unique()
      player
        .string('name', 255)
        // .notNullable()
      player
        .integer('current_room')
        // .notNullable()
      player
        .timestamps(); // will create two columns: created_at, updated_at
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('items')
};