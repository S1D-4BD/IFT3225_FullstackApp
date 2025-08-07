const jwt = require("jsonwebtoken");
//comme dans files du cours
module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token manquant" });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], "PHRASE_ALEATOIRE_TRES_LONGUE");

        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalide" });
    }
};