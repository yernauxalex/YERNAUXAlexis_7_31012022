const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const contentCtrl = require('../controllers/content');

router.post('/newpost/:id_user', auth, multer, async function(req,res) {
    try{
        const crtlResult = await contentCtrl.createContent(req,res)
        return res.status(201).json({ message: 'Contenu ajouté' , crtlResult});
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});

router.get('/getrecentcontent/:id_user', auth, async function (req,res) {
    try  {
        const data = await contentCtrl.getRecentContent(req,res)
        let datajson = [];
        for (let index = 0; index < 10; index++) {
            if (data[index] != null){
                datajson.push(data[index]);
            }
        }
        return res.status(200).json({datajson});
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});

router.get('/getcontent/:id_user/:id', async function (req, res) {
    try{
        const ctrlResult = await contentCtrl.getOneContent(req,res)
        return res.status(200).json(ctrlResult)
    }
    catch(error){
        res.status(error.code).json(error.forClient)
    }
});

router.delete('/delete/:id_user/:id_content', auth, async function (req,res) {
    try{
        await contentCtrl.deleteContent(req,res)
        return res.status(201).json({ message: 'Contenu supprimé' });
    }
    catch(error){
        res.status(error).json(error)
    }
});

module.exports = router;