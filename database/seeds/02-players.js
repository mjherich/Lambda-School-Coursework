
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {player_id: '64d8129bb04ced928d49f594740060746653ad9b', name: 'Bryan', current_room: null},
        {player_id: '14c573287422fb859d763daacf394c13ad6dcbc6', name: 'Matt', current_room: null},
        {player_id: 'f7d185032deae45d2005b15029ebcb7d53c0c4df', name: 'Sean', current_room: null},
        {player_id: '867bde1d09ebfad6c81fa9fa5bda855b3e16c3d6', name: 'Blaine', current_room: null}, 
      ]);
    });
};