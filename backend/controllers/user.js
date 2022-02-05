const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database')


// Création d'un nouveau compte
// exports.signup = (req, res) => {
//     bcrypt
//         .hash(req.body.password, 10)
//         .then((hash) => {
//             const email = req.body.email;
//             const passwordh = hash;
//             console.log(email, passwordh);
//             db.any("INSERT INTO users (email, passwordh) VALUES ('$1','$2');", [email, passwordh])
//                 .then(() => res.status(201).json({ message: 'Utilisateur crée' }))
//                 .catch((error) => res.status(400).json({ error }));
//         })
//         console.log(error.message || error)
//         .catch((error) => res.status(500).json({ error }));
// };

// Création d'un nouveau compte
exports.signup = async (req, res) => {
    let passwordh;  
        try{
            const email = req.body.email;
            passwordh = await bcrypt.hash(req.body.password, 10);
            console.log(email, passwordh);
        }
        catch(error){ 
            console.log(error.message || error)
            return res.status(500).json({ error })};
        try{
            console.log('before db')
            await db.any("INSERT INTO users (email, passwordh) VALUES ('$1','$2');", [req.body.email, passwordh]);
            console.log('after db')
            return res.status(201).json({ message: 'Utilisateur crée' });
            }
        catch(error) {
            console.log(error.message || error)
            res.status(400).json({ error })
        };
        
};

// Connection à un compte existant
exports.login = (req, res) => {
    const email = req.body.email;
    const passwordh = req.body.password;
    db.any("SELECT id_user, email, passwordh FROM user WHERE email = $1", email)
    .then((data) => {
        const id_user = data[0];
        const emaildb = data[1];
        passwordh = data[2];
        bcrypt
                // Comparaison mdp de l'user et son hash
                .compare(req.body.password, passwordh)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                            expiresIn: '24h',
                        }),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(401).json({ error: 'Utilisateur non trouvé'}));

};

exports.getProfile = (req, res) => {
    
};