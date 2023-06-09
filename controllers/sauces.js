//Création controllers/sauce.js

const Sauce = require('../models/Sauce');
const fs = require('fs');




//Exportation logique métier 

//Création sauce avec comptabilisation des votes
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });

    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutée !' }))
        .catch(error => res.status(400).json({ error }))
    console.log('Sauce initialisée');
};

//Mdification... mise à jour de la modification 
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée' }))
        .catch(error => res.status(400).json({ error }))
    console.log('Sauce modifiée');
};

//Suppression
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }))
                console.log('Sauce supprimée');
            });

        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
};


exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }))
};



//Intégration du mode vote et de sa mise à jour
exports.likeSauce = (req, res, next) => {
    if (req.body.like == 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersLiked: req.body.userId },
                $inc: { likes: +1 }
            }
        )
            .then(() => res.status(200).json({ message: 'Sauce votée !' }))
            .catch(error => res.status(400).json({ error }));
    }

    if (req.body.like == 0) {
        Sauce.findOne({ _id: req.params.Id })
            .then((sauce) => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        }
                    )
                        .then(() => res.status(200).json({ message: 'Cette sauce ne vous interesse plus !' }))
                        .catch(error => res.status(400).json({ error }));
                }
                if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne(
                        { _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        }
                    )
                        .then(() => res.status(200).json({ message: 'Cette sauce ne vous interesse plus !' }))
                        .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
    }

    if (req.body.like == -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $push: { usersDisliked: req.body.userId },
                $inc: { dislikes: +1 }
            }
        )
            .then(() => res.status(200).json({ message: 'Vote supprimé !' }))
            .catch(error => res.status(400).json({ error }));
    }
    console.log(req.body);
};




