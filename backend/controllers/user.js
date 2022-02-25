const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const db = require('../database')
const fs = require('fs');

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
/*exports.login = async (req, res) => {
    try {
        const password = req.body.password;
        console.log("before sql request - email: ",req.body.email)
        console.log("before sql request - password: ",req.body.password)

        const data = await db.any("SELECT * FROM users WHERE email = $1", req.body.email)
        const id_user = data[0].id_user;
        const emaildb = data[0].email;
        const passwordh = data[0].passwordh;
        const admin = data[0].admin_status;
        console.log(id_user, emaildb, passwordh, data[0].interaction)
        if(req.body.email !== emaildb){
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        const match = await bcrypt.compare(req.body.password, passwordh)
        if(!match){
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }
        res.status(200).json({
            id_user: id_user,
            token: jwt.sign({id_user, admin}, 'RANDOM_TOKEN_SECRET', {
                expiresIn: '60d',
            }),
            id_user: id_user,
            email: emaildb,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            last_interaction: data[0].last_interaction,
            interaction_type: data[0].interaction,
            admin_status: data[0].admin_status,
        });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};*/
exports.login = async function login(req,res) {
    try {
        const password = req.body.password;
        console.log("before sql request - email: ",req.body.email)
        console.log("before sql request - password: ",req.body.password)

        const data = await db.any("SELECT * FROM users WHERE email = $1", req.body.email)
        const id_user = data[0].id_user;
        const emaildb = data[0].email;
        const passwordh = data[0].passwordh;
        const admin = data[0].admin_status;
        console.log(id_user, emaildb, passwordh, data[0].interaction)
        if(req.body.email !== emaildb){
            throw { code: 401, forClient: {message: 'Utilisateur non trouvé' }};
        }
        const match = await bcrypt.compare(req.body.password, passwordh)
        if(!match){
            throw { code: 401, forClient: {message: 'Mot de passe incorrect' }};
        }
        return res.status(200).json({
            id_user: id_user,
            token: jwt.sign({id_user, admin},  'RANDOM_TOKEN_SECRET', {
                expiresIn: '60d',
            }),
            id_user: id_user,
            email: emaildb,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            last_interaction: data[0].last_interaction,
            interaction_type: data[0].interaction,
            admin_status: data[0].admin_status,
        });
    }
    catch(error){
        console.log(error)
        return { code: 500, forClient: {message: 'error'}}
    }
}

// Changement de mot de pass
exports.changePassword = async (req, res) => {
    try { 
        if (req.body.password1 !== req.body.password2){
            return res.status(400).json({message: 'Les mots de passe doivent être identiques'})
        }
        if (!schema.validate(req.body.password1)){
            return res.status(400).json({ message: 'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre'})
       }
       const passwordh = await bcrypt.hash(req.body.password1, 10);
       await db.any('UPDATE users SET passwordh = $1 WHERE id_user = $2', [passwordh, req.params.id_user])
       return res.status(201).json({ message: 'Mot de passe modifié' });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Récupération des informations d'un profil par son id 
exports.getProfile = async (req, res) => {
    try {
        const data = await db.any("SELECT * FROM users WHERE id_user = $1",req.params.id_user);
        if (req.params.id_user != data[0].id_user){
            return res.status(401).json({ error: 'Utilisateur non trouvé' });
        }
        res.status(200).json({
            id_user: data[0].id_user,
            email: data[0].email,
            firstname: data[0].firstname,
            lastname: data[0].lastname,
            last_interaction: data[0].last_interaction,
            interaction_type: data[0].interaction,
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
        await db.any("DELETE FROM comments WHERE id_author_comment = $1", req.params.id_user);
        const data = await db.any("DELETE FROM content WHERE id_author = $1 RETURNING media_content", req.params.id_user);
        await db.any("DELETE FROM users WHERE id_user = $1", req.params.id_user);
        for (let index = 0; index < data.length; index++){
            const filename = data[index].media_content.split('/images/')[1];
			fs.unlink(`images/${filename}`, () => {});
        }
        return res.status(201).json({ message: 'Utilisateur supprimé' });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }
}