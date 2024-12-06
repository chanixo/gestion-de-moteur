const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  zone: { type: String, required: true },
  installation: { type: String, required: true },
  typePanne: { type: String, required: true },
  lieuReparation: { type: String, required: true },
  observation: { type: String, required: true },
  pieceJointe: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Maintenance', MaintenanceSchema);
