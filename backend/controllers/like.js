const db = require('../database')

// Création d'un nouveau like
exports.newLike = async function (req,res) {
    await db.any("INSERT INTO likes (content_id, author_id) VALUES ($1,$2)", [req.params.id, req.params.id_user]);
    await db.any("UPDATE users SET last_interaction = $1, interaction = 'like' WHERE id_user = $2", [req.params.id, req.params.id_user]);
}

// Récupération de tous les likes d'un post
exports.getLike = async function (req,res) {
    const data = await db.any("SELECT * FROM likes WHERE content_id = $1", req.params.id)
    return data;
}

// Suppression d'un like
exports.deleteLike = async function (req,res) {
    await db.any("DELETE FROM likes WHERE content_id = $1 AND author_id = $2", [req.params.id, req.params.id_user]);
}