const knex = require('knex')
const configuration = require('../../knexfile')

//Passa como parametro as configurações. O development informa que é banco de desenvolvimento
const connection = knex(configuration.development)

module.exports = connection