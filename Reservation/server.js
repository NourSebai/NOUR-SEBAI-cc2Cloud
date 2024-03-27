// Importation des modules nécessaires
const express = require('express');
const mongoose = require('mongoose');

// Initialisation de l'application Express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/nom_de_votre_base_de_données', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connexion à MongoDB réussie !");
})
.catch((err) => {
  console.error("Erreur de connexion à MongoDB :", err);
});

// Configuration du port
const PORT = process.env.PORT || 3000;

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
