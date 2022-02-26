const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentCtrl = require('../controllers/comment');

//router.post('/:id/:id_user', auth, commentCtrl.createComment);
//router.get('/:id_user/:id', auth, commentCtrl.getAllComment);
//router.get('/:id/:idcomment', auth, commentCtrl.getOneComment);

router.post('/:id/:id_user', auth, async function (req,res) {
    try{
        await commentCtrl.createComment(req, res)
        return res.status(201).json({ message: 'Commentaire ajouté' });
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
})

router.get('/:id_user/:id', auth, async function (req,res) {
    try {
        const data = await commentCtrl.getAllComment(req,res)
        let datajson = [];
        for (let index = 0; index < 20; index++) {
            if (data[index] != null){
                datajson.push(data[index]);
            }
        }
        return res.status(200).json({datajson});
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
})

router.get('/:id/:idcomment', auth, async function (req, res) {
    try{
        const data = await commentCtrl.getOneComment(req,res)
        if (req.params.id != data[0].id_content || req.params.idcomment != data[0].id_comment){
            return res.status(401).json({ error: 'Contenu non trouvé' });
        }
        res.status(200).json({data: data[0]})
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
})
router.delete('/:id_user/:id', auth, async function (req,res) {
    try{
        await commentCtrl.deleteComment(req,res)
        return res.status(201).json({ message: 'Commentaire supprimé' });
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
});
module.exports = router;