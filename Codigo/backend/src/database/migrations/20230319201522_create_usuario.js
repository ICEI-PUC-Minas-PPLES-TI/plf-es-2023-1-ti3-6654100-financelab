/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('usuario', function (table) {
    table.string('id').primary();
    table.string('nome');
    table.string('email');
    table.string('telefone');
    table.string('senha');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('usuario');

};
