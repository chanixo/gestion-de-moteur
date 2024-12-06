const mongoose = require('mongoose');

const poseSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  installation: { type: String, required: true },
  matricule: { type: String, required: true },
  puissance: { type: String, required: true },
  vitesse: { type: String, required: true },
  marque: { type: String, required: true },
  voltage: { type: String, required: true },
  isolementStat: { type: String, required: true },
  isolementRot: { type: String, required: true },
  observation: { type: String }
});

module.exports = mongoose.model('Pose', poseSchema);
