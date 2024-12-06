const mongoose = require('mongoose');

const entretienSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  installation: { type: String, required: true },
  isolementStat: { type: String, required: true },
  isolementRot: { type: String, required: true },
  isolementRes: { type: String, required: true },
  demarrageRot: { type: String, required: true },
  observation: { type: String, required: true },
});

module.exports = mongoose.model('Entretiens', entretienSchema);
