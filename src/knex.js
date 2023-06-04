// knexの橋渡し用
const config = require('../knexfile');
const knex = require('knex');
const environment = process.env.NODE_ENV ?? 'development';

module.exports = knex(config[environment]);
