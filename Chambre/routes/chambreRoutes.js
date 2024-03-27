const express = require('express');
const router = express.Router();
const Chambre = require('../models/chambre');

// Route pour ajouter une chambre
router.post('/chambres', async (req, res) => {
  try {
    const nouvelleChambre = new Chambre(req.body);
    await nouvelleChambre.save();
    res.status(201).json({ message: "Chambre ajoutée avec succès." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour récupérer le détail d'une chambre
router.get('/chambres/:id', async (req, res) => {
  try {
    const chambre = await Chambre.findById(req.params.id);
    if (!chambre) {
      return res.status(404).json({ message: "Chambre introuvable." });
    }
    res.status(200).json(chambre);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
