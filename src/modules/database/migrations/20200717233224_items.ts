import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Item', table => {
    table.increments('id').primary();
    table.string('description', 60).notNullable();
    table.decimal('amount', 14, 2).notNullable();
    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Item');
}
