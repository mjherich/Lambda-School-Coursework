






exports.up = function(knex) {
  return knex.schema
    .createTable('players', player => {
      players
        .integer('player_id')
        .notNullable()
        .unique()
      players
        .string('name', 255)
        .notNullable()
      players
        .integer('current_room')
        .notNullable()
      players
        .timestamps(); // will create two columns: created_at, updated_at
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('items')
};