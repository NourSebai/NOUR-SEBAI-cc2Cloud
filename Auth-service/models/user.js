const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nom: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  login: {
    type: String,
    unique: true,
    required: true,
  },
  mdp: String,
});

module.exports = mongoose.model('User', userSchema);
