const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const contentCtrl = require('../controllers/content');

router.post('/:id_user', auth, multer, contentCtrl.createContent);
router.get('/:id_user', auth, contentCtrl.getRecentContent);
router.get('/:iduser/:id', auth, contentCtrl.getOneContent);
router.delete('/:iduser/:id', auth, contentCtrl.deleteContent);

module.exports = router;