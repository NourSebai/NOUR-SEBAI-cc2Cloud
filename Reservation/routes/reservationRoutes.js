const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');
const Chambre = require('../../Chambre/models/chambre');
const User = require('../../Auth-service/models/user');

// Route pour ajouter une réservation
router.post('/reservations', async (req, res) => {
  try {
    const { utilisateur_id, chambre_id } = req.body;

    // Vérification de l'existence de l'utilisateur
    const utilisateurExiste = await User.exists({ _id: utilisateur_id });
    if (!utilisateurExiste) {
      return res.status(400).json({ message: "L'utilisateur n'existe pas." });
    }

    // Vérification de l'existence de la chambre et de sa disponibilité
    const chambreDisponible = await Chambre.findOne({ _id: chambre_id, disponibilite: true });
    if (!chambreDisponible) {
      return res.status(400).json({ message: "La chambre n'est pas disponible." });
    }

    // Création de la réservation
    const nouvelleReservation = new Reservation({ utilisateur_id, chambre_id });
    await nouvelleReservation.save();

    // Mise à jour de la disponibilité de la chambre
    chambreDisponible.disponibilite = false;
    await chambreDisponible.save();

    res.status(201).json({ message: "Réservation ajoutée avec succès." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
