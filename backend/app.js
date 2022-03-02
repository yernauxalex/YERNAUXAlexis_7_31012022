// Import des packages
const express = require('express');
const expressSanitizer = require('express-sanitizer');
const app = express();
//const pgp = require('pg-promise')();
// const dotenv = require("dotenv");
// dotenv.config();
const path = require('path');
const db = require('./database')


// Import routes
const userRoutes = require ('./routes/user');
const contentRoutes = require ('./routes/content');
const commentRoutes = require ('./routes/comment');
const likeRoutes = require ('./routes/like');

// PostgreSQL
//const db = pgp(process.env.POSTGRESQL);
//db.connect()
//.then(() => console.log('Connected to ElephantSQL'))
//.catch(() => console.log('Connection failed'));


// CORS
app.use((req, res, next) => {
	// Accéder à l'API depuis n'importe où
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Ajouter les headers sur nos réponses
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	// Permet d'utiliser le CRUD
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	next();
});

// Middleware
// Utilisation du body sur req
app.use(express.json());
app.use(expressSanitizer());
app.post('/', function(req, res, next) {
	// replace an HTTP posted body property with the sanitized string
	const sanitizedString = req.sanitize(req.body.propertyToSanitize);
	res.send({ sanitized: sanitizedString });
  });
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/like', likeRoutes);

module.exports = app;