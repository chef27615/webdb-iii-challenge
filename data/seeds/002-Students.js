
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Students').insert([
    {name:'Ray', cohort_id: 3},
    {name:'Rosemary', cohort_id:2},
    {name:'Sage', cohort_id:1}
  ])
};
