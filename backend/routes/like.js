const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const likeCtrl = require('../controllers/like');

router.put('/newlike/:id/:id_user', auth, async function (req,res) {
    try{
        const ctrlResult = await likeCtrl.newLike(req,res)
        return res.status(201).json({message: 'Nouveau like ajouté'})
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
});

router.get('/getlike/:id', async function (req, res) {
    try{
        const ctrlResult = await likeCtrl.getLike(req,res)
        return res.status(201).json({ctrlResult})
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
})

router.delete('/removelike/:id/:id_user', auth, async function (req,res) {
    try{
        await likeCtrl.deleteLike(req,res)
        return res.status(201).json({message: 'Like supprimé'})
    }
    catch(error){
        console.log(error)
        res.status(error.code).json(error.forClient)
    }
});
module.exports = router;