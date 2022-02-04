const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/content');

router.post('/', auth, multer, contentCtrl.createContent);
router.get('/', auth, contentCtrl.getRecentContent);
router.get('/:id', auth, contentCtrl.getOneContent);
router.delete('/:id', auth, contentCtrl.deleteContent);

module.exports = router;