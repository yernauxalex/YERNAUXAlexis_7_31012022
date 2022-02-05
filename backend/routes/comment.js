const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/:id', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getAllComment);
router.get('/:id/:idComment', auth, commentCtrl.getOneComment);
router.delete('/:id/:idComment', auth, commentCtrl.deleteComment);

module.exports = router;