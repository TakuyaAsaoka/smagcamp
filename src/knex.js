// knexの橋渡し用
const config = require('../knexfile');
const knex = require('knex');
const environment = 'production';

module.exports = knex(config[environment]);
