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
        table.string('tipo_investimento_id').notNullable();
        table.foreign('tipo_investimento_id').references('id').inTable('tipo_investimento');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('investimento');
};
