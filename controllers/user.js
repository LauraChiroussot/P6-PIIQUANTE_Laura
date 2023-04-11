//Sécurisation de l'API

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/*require('dotenv').config();*///neutralisé mais toujours pas de connexion

const User = require('../models/User');


exports.signup = (req, res, next) => {
    /*const passwordValidator = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"///Minimum huit caractères, avec une lettre majuscule + une lettre minuscule + un chiffre + un caractère spécial 
    
    if (passwordValidator.test(req.body.password))*///neutralisé mais toujours pas de connexion
    if (req.body.password){
    bcrypt.hash(req.body.password, 10)//cryptage du mot de passe avec limitation de passage à 10
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()//enregistement dans la base de donées
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ message: "L'adresse mail renseignée est déjà utilisée. "}));
        })
        .catch(error => res.status(500).json({ error }));
    }
    else {
        res.status(400).json({message : "Le mot de passe doit contenir 8 caractères avec obligatoirement une majuscule, une minuscule, un chiffre et un cactère spécial "});
    }
};
//Vérification mot de passe  
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                res.status(401).json({ message: 'Mot de passe incorrect !' });
            } else {
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            res.status(401).json({ message: 'Mot de passe incorrect !' });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                   'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
                    .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};
