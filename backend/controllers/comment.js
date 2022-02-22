const db = require('../database');

// Création d'un nouveau commentaire dans la DB
exports.createComment = async (req, res, next) => {
    try{
        const data = await db.one("INSERT INTO comments (data_comment, content_id, id_author_comment) VALUES ($1, $2,$3) RETURNING content_id",[req.body.data_content, req.params.id, req.params.id_user]);
        const update = await db.any("UPDATE users SET last_interaction = $1, interaction = 'comment' WHERE id_user = $2", [data.content_id, req.params.id_user]);
        return res.status(201).json({ message: 'Commentaire ajouté' });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Recherche de tous les commentaires d'un contenu
exports.getAllComment = async (req, res, next) => {
    try{
        const data = await db.any("SELECT c.id_comment, c.data_comment, c.date, c.content_id, c.id_author_comment, u.firstname, u.lastname FROM comments c, users u WHERE c.content_id = $1 AND c.id_author_comment = u.id_user ORDER BY date DESC, c.id_comment DESC LIMIT 5", req.params.id);
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
        return res.status(500).json({ error })
    }
};

// Recherhe d'un commentaire par son id 
exports.getOneComment = async (req, res, next) => {
    try{
        const data = await db.any("SELECT * FROM comments WHERE id_content = $1 AND id_comment = $2", [req.params.id, req.params.idcomment]);
        if (req.params.id != data[0].id_content || req.params.idcomment != data[0].id_comment){
            return res.status(401).json({ error: 'Contenu non trouvé' });
        }
        res.status(200).json({data: data[0]})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};

// Suppression d'un commentaire dans la db 
exports.deleteComment = async (req, res, next) => {
    try{
        const data = await db.any("DELETE FROM comments WHERE id_comment = $1", req.params.id);
        return res.status(201).json({ message: 'Commentaire supprimé' });
    }
    catch(error){
        console.log(error)
        return res.status(500).json({ error })
    }
};
