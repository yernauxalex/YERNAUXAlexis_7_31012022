const pgp = require('pg-promise')();
const dotenv = require("dotenv");
dotenv.config();

// PostgreSQL
const db = pgp(process.env.POSTGRESQL);
db.connect()
.then(() => console.log('Connected to ElephantSQL'))
.catch(() => console.log('Connection failed'));

module.exports = db;