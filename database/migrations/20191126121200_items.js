
exports.up = function(knex) {
  return knex.schema
    .createTable('rooms', rooms => {
      rooms
        .integer('room_id')
        .notNullable()
        .unique()
      rooms
        .string('title', 255)
        .notNullable()
        // .unique();
      rooms
        .text('description')
        .notNullable()
      rooms
        .integer('elevation')
      rooms
        .string('terrain')
      rooms
        .string('coordinates');
      rooms
        .integer('n');
      rooms
        .integer('s');
      rooms
        .integer('e');
      rooms
        .integer('w');
      rooms
        .text('items')
      rooms
        .decimal('cooldown');
      rooms
        .text('errors');
      rooms
        .text('messages');
      rooms
        .timestamps(); // will create two columns: created_at, updated_at
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('items')
};