const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database')

// Création d'un nouveau compte
exports.signup = async (req, res) => {
    try{
        const email = req.body.email;
        const passwordh = await bcrypt.hash(req.body.password, 10);
        await db.any("INSERT INTO users (email, passwordh) VALUES ($1,$2);", [req.body.email, passwordh]);
        return res.status(201).json({ message: 'Utilisateur crée' });
        }
    catch(error) {
        return res.status(400).json({ error })
    };
};

// Connection à un compte existant
exports.login = async (req, res) => {
    try {
        const password = req.body.password;
        const data = await db.any("SELECT id_user, email, passwordh FROM users WHERE email = $1", req.body.email)
        const id_user = data[0].id_user;
        const emaildb = data[0].email;
        const passwordh = data[0].passwordh;
        console.log(id_user, emaildb, passwordh)
        if(req.body.email !== emaildb){
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        const match = await bcrypt.compare(req.body.password, passwordh)
        if(!match){
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        res.status(200).json({
            userId: id_user,
            token: jwt.sign({id_user}, 'RANDOM_TOKEN_SECRET', {
                expiresIn: '60d',
            }),
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Récupération des informations d'un profil par son id 
exports.getProfile = async (req, res) => {
    try {
        console.log("req id: ", req.params.id)
        const data = await db.any("SELECT * FROM users WHERE id_user = $1",req.params.id);
        
        console.log("data:", data[0].id_user)
        if (req.params.id != data[0].id_user){
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(200).json({
            id_user: data[0].id_user,
            email: data[0].email,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            last_interaction: data[0].last_interaction,
        });
    }
    catch (error){
        console.log(error)
        return res.status(500).json({ error })
    }
};