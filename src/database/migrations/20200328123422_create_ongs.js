// método up é responsável pela criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('ongs', function(table){
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

// método down é responsável por tratar erros
// funciona como se fosse um rollback no banco.
// o que eu devo fazer caso dê algum erro ?
exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};

// npx knex migrate:latest para rodar