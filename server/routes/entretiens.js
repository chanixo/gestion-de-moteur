// src/routes/entretiens.js
const express = require('express');
const router = express.Router();
const Entretiens = require('../models/entretien'); // Make sure this model is defined

// Get all entretiens
router.get('/', async (req, res) => {
  try {
    const entretiens = await Entretiens.find();
    res.json(entretiens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new entretien
router.post('/', async (req, res) => {
  const entretien = new Entretiens({
    date: req.body.date,
    installation: req.body.installation,
    isolementStat: req.body.isolementStat,
    isolementRot: req.body.isolementRot,
    isolementRes: req.body.isolementRes,
    demarrageRot: req.body.demarrageRot,
    observation: req.body.observation,
  });

  try {
    const newEntretien = await entretien.save();
    res.status(201).json(newEntretien);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
