const { Client } = require('pg')
const client = new Client( {
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "psql1234",
    database: "test"
})

module.exports = client;