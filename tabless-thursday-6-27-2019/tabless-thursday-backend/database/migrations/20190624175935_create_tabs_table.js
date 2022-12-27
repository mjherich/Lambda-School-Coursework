exports.up = function(knex, Promise) {
    return knex.schema.createTable('tabs', tabs => {
        tabs.increments()

        tabs
        .string('title', 255)
        .notNullable()
        .unique()

        tabs
        .string('url', 128)
        .notNullable()

        tabs
        .string('description', 128)

        tabs
        .string('category', 128)
        .notNullable()

        // tabs
        // .integer('users_id')
        // .notNullable()
        // .unsigned()
        // .references('id')
        // .inTable('users')
        // .onDelete('CASCADE')
        // .onUpdate('CASCADE');

    })  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('tabs')
  
};
