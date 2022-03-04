const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const db = require('../database');

// Création d'un nouveau contenu dans la DB
exports.createContent = async function (req, res){
    let media, media_content;
    if(req.body.media == 'true'){
        media = true;
        const { filename: file } = req.file;
        const resizedPic = await sharp(req.file.path).resize(504, 504, {
            fit: 'inside'
        }).toFile(path.resolve(req.file.destination,'resized' + req.file.filename))
        fs.unlinkSync(req.file.path)
        media_content = `${req.protocol}://${req.get('host')}/images/${'resized' + req.file.filename}`
    }
    else{
        media = false;
    }
    const data = await db.one("INSERT INTO content (text_content, media, media_content, id_author) VALUES ($1,$2,$3,$4) RETURNING id_content",[req.body.text_content, media, media_content, req.params.id_user]);
    const update = await db.any("UPDATE users SET last_interaction = $1, interaction = 'content' WHERE id_user = $2", [data.id_content, req.params.id_user]);
    return {last_interaction: data.id_content};
};

// Recherche du contenu récent
exports.getRecentContent = async function (req, res) {
    const data = await db.any("SELECT c.id_content, c.text_content, c.date, c.media, c.media_content, c.id_author, u.firstname, u.lastname FROM content c , users u WHERE c.id_author = u.id_user ORDER BY date DESC, id_content DESC LIMIT 10");
    return data
};

// Recherhe d'un contenu par son id 
exports.getOneContent = async function (req, res) {
    const data = await db.any("SELECT c.id_content, c.text_content, c.date, c.media, c.media_content, c.id_author, u.firstname, u.lastname FROM content c, users u WHERE id_content = $1 AND c.id_author = u.id_user LIMIT 1", req.params.id);
    if (data[0] == undefined || req.params.id != data[0].id_content){
        throw { code: 401, forClient: { code: 401, message: 'Contenu non trouvé'}}
    }
    const result = {data: data[0]}
    return result
};

// Suppression d'un contenu dans la db 
exports.deleteContent = async function (req, res, next) {
    await db.any("DELETE FROM likes WHERE content_id = $1", req.params.id)
    await db.any("DELETE FROM comments WHERE content_id = $1", req.params.id)
    const data = await db.any("DELETE FROM content WHERE id_content = $1 RETURNING media_content", req.params.id);
    if(data[0].media_content !== null){
        const filename = data[0].media_content.split('/images/')[1];
		fs.unlink(`images/${filename}`, () => {});
    }
};
