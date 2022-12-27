
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tabs').del()
    .then(function () {
      // Inserts seed entries
      return knex('tabs').insert([
        {
          id: 1,
          title: 'Google',
          url: 'www.google.com',
          description: 'I use this everyday!',
          category: 'Resources',
        },
        {
          id: 2,
          title: 'Youtube',
          url: 'www.youtube.com',
          description: 'I use this everyday also!',
          category: 'Resources',
        },
        {
          id: 3,
          title: 'Training kit for JavaScript Fundamentals',
          url: 'https://learn.lambdaschool.com/fsw/sprint/recclZwJxMU8kUngT',
          description: 'Helps with the fundamentals and leads into deeper concepts of Javascript.',
          category: 'Training Kit',
        },
        
      ]);
    });
};
