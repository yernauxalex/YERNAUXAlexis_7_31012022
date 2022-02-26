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
exports.signup = async function (req, res) {
    const passwordh = await bcrypt.hash(req.body.password, 10);
    await db.any("INSERT INTO users (email, firstname, lastname, passwordh) VALUES ($1,$2,$3,$4);", [req.body.email, req.body.lastname, req.body.firstname, passwordh]);
}

// Connection à un compte existant
exports.login = async function (req, res) {

    const password = req.body.password;
    console.log("before sql request - email: ", req.body.email)
    console.log("before sql request - password: ", req.body.password)

    const data = await db.any("SELECT * FROM users WHERE email = $1", req.body.email)
    const id_user = data[0].id_user;
    const emaildb = data[0].email;
    const passwordh = data[0].passwordh;
    const admin = data[0].admin_status;
    console.log(id_user, emaildb, passwordh, data[0].interaction)
    if (req.body.email !== emaildb) {
        throw { code: 401, forClient: { error: 401, message: 'Utilisateur non trouvé' } };
    }
    const match = await bcrypt.compare(req.body.password, passwordh)
    if (!match) {
        throw { code: 401, forClient: { error: 401, message: 'Mot de passe incorrect' } };
    }
    const result = {
        id_user: id_user,
        token: jwt.sign({ id_user, admin }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '60d',
        }),
        id_user: id_user,
        email: emaildb,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        last_interaction: data[0].last_interaction,
        interaction_type: data[0].interaction,
        admin_status: data[0].admin_status,
    }
    return result
}

// Changement de mot de passe
exports.changePassword = async function changePassword(req, res) {
    const passwordh = await bcrypt.hash(req.body.password1, 10);
    await db.any('UPDATE users SET passwordh = $1 WHERE id_user = $2', [passwordh, req.params.id_user])
}

// Récupération des informations d'un profil par son id 
exports.getProfile = async function (req, res) {
    const data = await db.any("SELECT * FROM users WHERE id_user = $1", req.params.id_user);
    if (req.params.id_user != data[0].id_user) {
        throw { code: 401, forCLient: { error: 401, message: 'Utilisateur non trouvé'}}
    }
    const result = {
        id_user: data[0].id_user,
        email: data[0].email,
        firstname: data[0].firstname,
        lastname: data[0].lastname,
        last_interaction: data[0].last_interaction,
        interaction_type: data[0].interaction,
    }
    return result;
};

// Suppression d'un utilisateur ainsi que toutes ses publications / commentaires
exports.deleteProfile = async function (req, res) {
    await db.any("DELETE FROM comments WHERE id_author_comment = $1", req.params.id_user);
    const data = await db.any("DELETE FROM content WHERE id_author = $1 RETURNING media_content", req.params.id_user);
    await db.any("DELETE FROM users WHERE id_user = $1", req.params.id_user);
    for (let index = 0; index < data.length; index++) {
        const filename = data[index].media_content.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => { });
    }
}