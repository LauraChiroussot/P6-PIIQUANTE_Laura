//création fichier routes intéraction avec sauces et app 

const express = require('express');
/*const auth = require ('auth');*///V1 C1 P3 Ch6 voir si c'est celui-là qui bloquait. Toujours pas de connexion---fait crasher nodemon
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);//récupération de la sauce utilisateur

router.post('/', auth, multer, saucesCtrl.createSauce);//lecture et écriture

router.get('/:id', auth, saucesCtrl.getOneSauce);//**interaction avec la page affichage de la sauce (suite insertion de la sauce) 

router.put('/:id', auth, multer, saucesCtrl.modifySauce);//modification 

router.delete('/:id', auth, saucesCtrl.deleteSauce);//supppression

router.post('/:id/like', auth, saucesCtrl.likeSauce);//noter la sauce

module.exports = router;
