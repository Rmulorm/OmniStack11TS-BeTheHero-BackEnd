import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('incidents', table => {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value', 2).notNullable();

    table.string('ngo_id').notNullable();

    table.foreign('ngo_id').references('id').inTable('ngo');
  })
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('incidents');
}
