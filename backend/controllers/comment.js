const db = require('../database');

// Création d'un nouveau commentaire dans la DB
exports.createComment = async function (req, res, next) {
    const data = await db.one("INSERT INTO comments (data_comment, content_id, id_author_comment) VALUES ($1, $2,$3) RETURNING content_id",[req.body.data_content, req.params.id, req.params.id_user]);
    await db.any("UPDATE users SET last_interaction = $1, interaction = 'comment' WHERE id_user = $2", [data.content_id, req.params.id_user]);
};

// Recherche de tous les commentaires d'un contenu
exports.getAllComment = async function (req, res, next) {
    const data = await db.any("SELECT c.id_comment, c.data_comment, c.date, c.content_id, c.id_author_comment, u.firstname, u.lastname FROM comments c, users u WHERE c.content_id = $1 AND c.id_author_comment = u.id_user ORDER BY date DESC, c.id_comment DESC LIMIT 5", req.params.id);
    return data
};

// Recherhe d'un commentaire par son id 
exports.getOneComment = async function (req, res, next)  {
    const data = await db.any("SELECT * FROM comments WHERE id_content = $1 AND id_comment = $2", [req.params.id, req.params.idcomment]);
    return data
};

// Suppression d'un commentaire dans la db 
exports.deleteComment = async function (req, res, next)  {
    await db.any("DELETE FROM comments WHERE id_comment = $1", req.params.id);
};
