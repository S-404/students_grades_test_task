require('dotenv').config()
const pg = require('pg')

const POSTGRES_DB = process.env.POSTGRES_DB
const POSTGRES_USER = process.env.POSTGRES_USER
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD
const POSTGRES_HOSTNAME = process.env.POSTGRES_HOSTNAME
const POSTGRES_PORT = process.env.POSTGRES_PORT

module.exports = {
    development: {
        url: `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOSTNAME}:${POSTGRES_PORT}/${POSTGRES_DB}`,
        dialect: 'postgres',
        logging: false,
        dialectModule: pg,
    },
}