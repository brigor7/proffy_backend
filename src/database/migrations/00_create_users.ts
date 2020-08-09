import Knex from 'knex';

/**Fazer ações */
export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable;
    table.string('avatar').notNullable;
    table.string('wathsapp').notNullable;
    table.string('bio').notNullable;
  });
}

/**Desfazer ações em up */
export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
