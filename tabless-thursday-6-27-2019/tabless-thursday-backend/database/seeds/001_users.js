
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'victor123@gmail.com',
          password: 'pass'
        },
        {
          id: 2,
          email: 'joel123@gmail.com',
          password: 'pass123'
        }
      ]);
    });
};
