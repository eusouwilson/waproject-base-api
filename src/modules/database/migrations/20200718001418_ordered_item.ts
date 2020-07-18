import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('OrderItem', table => {
    table.increments('id').primary();
    table.integer('amount').notNullable();
    table
      .integer('orderId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('Order')
      .onDelete('CASCADE');

    table
      .integer('itemId')
      .nullable()
      .unsigned()
      .references('id')
      .inTable('Item')
      .onDelete('CASCADE');

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Order_item');
}
