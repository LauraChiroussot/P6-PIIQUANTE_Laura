/*require('dotenv').config();
/*console.log (process.env)*/ //supprimer après confirmation de fonctionnement test ok
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

//intéraction avec le fichier sauces
const saucesRoutes = require("./routes/sauces");

//intéraction avec routes/user
const userRoutes = require("./routes/user");

//Connexion à MONGODB
mongoose
  .connect(
    "mongodb+srv://new-user_1:Bw1@cluster0.cxrpszc.mongodb.net/?retryWrites=true&w=majority",

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB bonne !"))
  .catch(() => console.log("Connexion à MongoDB mauvaise !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // route qui permet à tous les utilisateurs d'accéder à l'API 
                                                    //attention, ce qui me bloquait était le "router.use" il fallait mettre app.use
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"); //définit les Headers utilisés par l'API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"); //définit les méthodes possibles à utiliser
  next();
});

app.use(express.json()); //idem que bodyParsers

//ajout de fichier statique
app.use("/images", express.static(path.join(__dirname, "images")));

//intéraction/enregistrement avec le fichier sauces dans le dossier routes
app.use("/api/sauces", saucesRoutes);

//**ROUTE ATTENDUE PAR LE FRONTEND V1 C1 P3 Ch3 racine de toutes les routes liées à l'authentification
app.use("/api/auth", userRoutes);

module.exports = app;
