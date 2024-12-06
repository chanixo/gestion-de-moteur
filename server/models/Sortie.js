// models/Sortie.js
const mongoose = require('mongoose');

const sortieSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  matricule: { type: String, required: true },
  observation: { type: String },
  deleted: { type: Boolean, default: false }
}, { timestamps: true });

const Sortie = mongoose.model('Sortie', sortieSchema);

module.exports = Sortie;
