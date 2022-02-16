const pgp = require('pg-promise')();
const dotenv = require("dotenv");
dotenv.config();

// PostgreSQL
// Hosted db
//const db = pgp(process.env.POSTGRESQL);
// Local db
const db = pgp(process.env.POSTGRESQLLOCAL);
db.connect()
.then(() => console.log('Connected to ElephantSQL'))
.catch(() => console.log('Connection failed'));

module.exports = db;