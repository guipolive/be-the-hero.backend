// responsável pela criação da tabela
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments();
        
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();

        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

// responsável por uma espécie de rollback caso dê algum erro na criação da tabela
exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};

// npx knex migrate:latest para rodar e atualizar o banco