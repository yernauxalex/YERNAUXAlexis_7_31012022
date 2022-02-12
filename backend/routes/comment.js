const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

router.post('/:id/iduser', auth, commentCtrl.createComment);
router.get('/:id', auth, commentCtrl.getAllComment);
router.get('/:id/:idcomment', auth, commentCtrl.getOneComment);
router.delete('/:id/:idcomment', auth, commentCtrl.deleteComment);

module.exports = router;