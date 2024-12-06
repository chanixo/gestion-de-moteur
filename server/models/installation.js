const mongoose = require('mongoose');

const installationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },zones: {
    type: [String],
    required: true,
  }
});

module.exports = mongoose.model('Installation', installationSchema);
