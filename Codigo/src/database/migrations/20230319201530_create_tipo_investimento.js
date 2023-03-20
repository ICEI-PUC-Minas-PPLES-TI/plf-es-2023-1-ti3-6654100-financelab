/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tipo_investimento', function(table) {
    table.string('id').primary();
    table.string('Tipo');
    table.string('MetaDiaria');
    table.string('MetaMensal');
    table.string('usuario_id').notNullable();
    table.foreign('usuario_id').references('id').inTable('usuario');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tipo_investimento');
};
