'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Property extends Model {
  up() {
    this.create('properties', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('title').notNullable();
      table.string('adress').notNullable();
      table.decimal('price').notNullable();
      table.decimal('latitude', 9, 6).notNullable();
      table.decimal('longitude', 9, 6).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('properties');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  images() {
    return this.hasMany('App/Models/Image');
  }
}

module.exports = Property;
