import Knex from 'knex';

/**Fazer ações */
export async function up(knex: Knex) {
  return knex.schema.createTable('connections', (table) => {
    table.increments('id').primary();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamp('created_at').defaultTo('now()').notNullable();
  });
}

/**Desfazer ações em up */
export async function down(knex: Knex) {
  return knex.schema.dropTable('connections');
}
