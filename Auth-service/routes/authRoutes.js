const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Route pour ajouter un utilisateur
router.post('/utilisateurs', async (req, res) => {
  try {
    const utilisateurExistant = await User.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] });
    if (utilisateurExistant) {
      return res.status(400).json({ message: "L'email ou le login est déjà utilisé." });
    }
    
    const nouvelUtilisateur = new User(req.body);
    await nouvelUtilisateur.save();
    res.status(201).json({ message: "Utilisateur ajouté avec succès." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route pour connecter un utilisateur
router.post('/login', async (req, res) => {
  try {
    const utilisateur = await User.findOne({ login: req.body.login });
    if (!utilisateur) {
      return res.status(400).json({ message: "Nom d'utilisateur incorrect." });
    }
    
    const motDePasseValide = await bcrypt.compare(req.body.mdp, utilisateur.mdp);
    if (!motDePasseValide) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }
    
    const token = jwt.sign({ userId: utilisateur._id }, 'votre_clé_secrète');
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
