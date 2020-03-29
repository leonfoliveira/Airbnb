'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Image extends Model {
  up() {
    this.create('images', (table) => {
      table.increments();
      table
        .integer('property_id')
        .unsigned()
        .references('id')
        .inTable('properties')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('path').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('images');
  }
}

module.exports = Image;
