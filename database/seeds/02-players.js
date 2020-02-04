
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {player_id: process.env.BRYAN_TOKEN, name: 'Bryan', current_room: null},
        {player_id: process.env.MATT_TOKEN, name: 'Matt', current_room: null},
        {player_id: process.env.SEAN_TOKEN, name: 'Sean', current_room: null},
        {player_id: process.env.BLAINE_TOKEN, name: 'Blaine', current_room: null}, 
      ]);
    });
};