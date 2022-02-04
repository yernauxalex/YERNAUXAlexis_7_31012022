const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/comment');

router.post('/:id', auth, contentCtrl.createComment);
router.get('/:id', auth, contentCtrl.getAllComment);
router.get('/:id/:idComment', auth, contentCtrl.getOneComment);
router.delete('/:id/:idComment', auth, contentCtrl.deleteComment);

module.exports = router;