const mongoose = require('mongoose');

const chambreSchema = new mongoose.Schema({
  type: String,
  capacite: Number,
  prix: {
    type: Number,
    required: true,
  },
  disponibilite: Boolean,
  hotel: String, // Supposons que l'identifiant de l'hôtel soit une simple chaîne de caractères
});

module.exports = mongoose.model('Chambre', chambreSchema);
