const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const db = require('../database')

// Création du schéma pour le mot de passe
const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().symbols()
    .has().digits(1)
    .has().not().spaces()

// Création d'un nouveau compte
exports.signup = async (req, res) => {
    try{
        if (!emailValidator.validate(req.body.email)){
            return res.status(400).json({ message: 'Format du mail invalide'})
        }
        if (!schema.validate(req.body.password)){
             return res.status(400).json({ message: 'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre'})
        }
        const passwordh = await bcrypt.hash(req.body.password, 10);
        await db.any("INSERT INTO users (email, firstname, lastname, passwordh) VALUES ($1,$2,$3,$4);", [req.body.email, req.body.lastname, req.body.firstname, passwordh]);
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
        console.log("before sql request - email: ",req.body.email)
        console.log("before sql request - password: ",req.body.password)

        const data = await db.any("SELECT * FROM users WHERE email = $1", req.body.email)
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
            email: emaildb,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            last_interaction: data[0].last_interaction,
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
        const data = await db.any("SELECT * FROM users WHERE id_user = $1",req.params.id);
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

// Suppression d'un utilisateur ainsi que toutes ses publications / commentaires
exports.deleteProfile = async (req, res) => {
    try {
        await db.any("DELETE FROM comments WHERE id_author_comment = $1", req.params.id);
        await db.any("DELETE FROM content WHERE id_author = $1", req.params.id);
        await db.any("DELETE FROM users WHERE id_user = $1", req.params.id);
        return res.status(201).json({ message: 'Utilisateur supprimé' });
        
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}