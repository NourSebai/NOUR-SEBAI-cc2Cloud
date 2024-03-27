const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  utilisateur_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  chambre_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chambre',
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
