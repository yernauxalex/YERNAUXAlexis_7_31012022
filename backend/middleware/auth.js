const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	try {
		// Split pour récupérer le token après Bearer dans le header
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.id_user;
		Intid = parseInt(req.params.id_user)
		req.auth = { userId };
		console.log("auth:")
		console.log(userId)
		console.log(req.params.id_user)
		if (!Intid || Intid !== userId) {
			return res.status(401).json({message: 'Accès non autorisé par auth'})
		} else {
			next();
		}
	} catch {
		return res.status(401).json({message: 'Accès non autorisé par auth'})
	}
};