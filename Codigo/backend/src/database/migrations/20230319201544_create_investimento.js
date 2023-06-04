/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('investimento', function (table) {
        table.string('id').primary();
        table.float('preco_compra');
        table.float('preco_venda');
        table.string('nome');
        table.string('descricao');
        table.string('quantidade');
        table.string('tipo_investimento').notNullable();
        table.string('usuario_id').notNullable();
        table.foreign('usuario_id').references('id').inTable('usuario');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('investimento');
};
