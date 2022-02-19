const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const db = require('../database');

// Création d'un nouveau contenu dans la DB
exports.createContent = async (req, res, next) => {
    try{
        let media, media_content;
        if(req.body.media == 'true'){
            media = true;
            const { filename: file } = req.file;
            const resizedPic = await sharp(req.file.path).resize(504, 504, {
                fit: 'outside'
            }).toFile(path.resolve(req.file.destination,'resized' + req.file.filename))
            fs.unlinkSync(req.file.path)
            media_content = `${req.protocol}://${req.get('host')}/images/${'resized' + req.file.filename}`
        }
        else{
            media = false;
        }
        const data = await db.one("INSERT INTO content (text_content, media, media_content, id_author) VALUES ($1,$2,$3,$4) RETURNING id_content",[req.body.text_content, media, media_content, req.params.id_user]);
        const update = await db.any("UPDATE users SET last_interaction = $1, interaction = 'content' WHERE id_user = $2", [data.id_content, req.params.id_user]);
        return res.status(201).json({ message: 'Contenu ajouté' , last_interaction: data.id_content});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Recherche du contenu récent
exports.getRecentContent = async (req, res, next) => {
    try{
        const data = await db.any("SELECT * FROM content ORDER BY date DESC, id_content DESC LIMIT 5");
        let datajson = [];
        for (let index = 0; index < 10; index++) {
            if (data[index] != null){
                datajson.push(data[index]);
            }
        }
        return res.status(200).json({datajson});
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Recherhe d'un contenu par son id 
exports.getOneContent = async (req, res, next) => {
    try{
        const data = await db.any("SELECT * FROM content WHERE id_content = $1 LIMIT 1", req.params.id);
        if (req.params.id != data[0].id_content){
            return res.status(401).json({ error: 'Contenu non trouvé' });
        }
        res.status(200).json({data: data[0]})
        // res.status(200).json({
        //     id_content: data[0].id_content,
        //     text_content: data[0].text_content,
        //     date: data[0].date,
        //     media: data[0].media,
        //     media_content: data[0].media_content,
        //     id_author: data[0].id_author,
        // });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Suppression d'un contenu dans la db 
exports.deleteContent = async (req, res, next) => {
    try{
        const data = await db.any("DELETE FROM content WHERE id_content = $1", req.params.id);
        return res.status(201).json({ message: 'Contenu supprimé' });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};
