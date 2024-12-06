const mongoose = require('mongoose');

const EntreeSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  installation: { type: String, required: true },
  matricule: { type: String, required: true },
  puissance: { type: String, required: true },
  vitesse: { type: String, required: true },
  marque: { type: String, required: true },
  voltage: { type: String, required: true },
  isolement_Stat: { type: Boolean, required: true },
  isolement_Rot: { type: Boolean, required: true },
  observation: { type: String, required: true }
});

module.exports = mongoose.model('Entree', EntreeSchema);
