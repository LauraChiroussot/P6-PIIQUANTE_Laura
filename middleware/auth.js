//Création des middlewares 
const jwt = require('jsonwebtoken');
/*require('dotenv').config();*/

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId){
            throw 'User Id non valable';
        } else {
            next();
        }
        console.log(token);
    } catch (error) {
        res.status(401).json({error: error | 'Requête non authentifiée !' });
    }
};




