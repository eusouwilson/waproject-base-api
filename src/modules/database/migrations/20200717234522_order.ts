import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Order', table => {
    table.increments('id').primary();
    table.date('date_order').notNullable();
    table.string('client', 50).notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Order');
}
