const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/changepswd/:id', auth, userCtrl.changePassword);
router.get('/profile/:id', auth, userCtrl.getProfile);
router.delete('/delete/:id_user', auth, userCtrl.deleteProfile);

module.exports = router;