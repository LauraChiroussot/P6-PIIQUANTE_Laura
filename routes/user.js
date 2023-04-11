//Intéraction user pour se connecter au site avec le contrôle 
//de l'utilisateur via son adresse mail et son mot de passe

const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;