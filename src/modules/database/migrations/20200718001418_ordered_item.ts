import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('Order_item', table => {
    table.increments('id').primary();
    table.integer('order_id').unsigned();
    table.foreign('order_id').references('Order.id');
    table.integer('item_id').unsigned();
    table.foreign('item_id').references('Item.id');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists('Order_item');
}
