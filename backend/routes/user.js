const express = require('express');
const router = express.Router();
const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

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

router.post('/signup', async function (req, res) {
    try{
        if (!emailValidator.validate(req.body.email)){
            return res.status(400).json({ message: 'Format du mail invalide'})
        }
        if (!schema.validate(req.body.password)){
             return res.status(400).json({ message: 'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre'})
        }
        await userCtrl.signup(req,res)
        return res.status(201).json({ message: 'Utilisateur crée' });
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});

router.post('/login', async function (req, res) {
    try {
        const ctrlResult = await userCtrl.login(req,res);
        return res.status(200).json(ctrlResult)
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});

// CORS issue no HTTP ok status
// Pas d'erreur avec l'ancienne implémentation
router.put('/changepswd/id_user', auth, async function (req,res) {
    try{
        if (req.body.password1 !== req.body.password2) {
            return res.status(400).json({ message: 'Les mots de passe doivent être identiques' })
        }
        if (!schema.validate(req.body.password1)) {
            return res.status(400).json({ message: 'Format du  mot de passe invalide, 8 caratères minimum, dont une majuscule, une minuscule, un caractrère spécial (#?!@$%^&*-.) et un chiffre' })
        }
        await userCtrl.changePassword(req,res)
        return res.status(201).json({ message: 'Mot de passe modifié' });
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});



router.get('/profile/:id_user', async function (req,res) {
    try {
        const ctrlResult = await userCtrl.getProfile(req,res)
        return res.status(200).json(ctrlResult)
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
})

router.delete('/delete/:id_user', auth, async function (req,res) {
    try {
        await userCtrl.deleteProfile(req,res)
        return res.status(201).json({ message: 'Utilisateur supprimé' });
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
})
module.exports = router;
