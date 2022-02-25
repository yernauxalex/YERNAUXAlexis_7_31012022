const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', async function (req, res) {
    try {
        const ctrlResult = userCtrl.login(req,res);
        return ctrlResult;
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});

//router.post('/login', userCtrl.login);
router.put('/changepswd/:id_user', auth, userCtrl.changePassword);
router.get('/profile/:id_user', userCtrl.getProfile);
router.delete('/delete/:id_user', auth, userCtrl.deleteProfile);

module.exports = router;
