const mongoose = require('mongoose');

const VibrationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  zones: {
    type: [String],
    required: true,
  },
  installation: {
    type: String,
    required: true,
  },
  etatVisual: {
    presenceProduit: String,
    huileGraisse: String,
    ailettes: String,
    boulonneries: String,
    cable: String,
    plaqueABorne: String,
    graisseur: String,
  },
  mesures: {
    temperatureAvant: {
      type: Number,
      required: true,
    },
    temperatureArriere: Number,
  },
  vibration: {
    axial: Number,
    vertical: Number,
    horizontal: Number,
  },
  observation: {
    type: String,
    default: '',
  },
  piecePointe: {
    type: String,
    default: null,
  },
  
});

module.exports = mongoose.model('Vibration', VibrationSchema);
