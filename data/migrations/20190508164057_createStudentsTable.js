
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Students', function(tbl){
      tbl.increments();

      tbl
      .string('name', 128)
      .notNullable(); 

      tbl
      .integer('cohort_id')
      .unsigned()
      .references('id')
      .inTable('Cohorts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('Students');
};
