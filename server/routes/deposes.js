const express = require('express');
const Depose = require('../models/Depose');

const router = express.Router();

// Get all deposes
router.get('/', async (req, res) => {
  try {
    const deposes = await Depose.find();
    res.json(deposes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new depose
router.post('/', async (req, res) => {
  const depose = new Depose({
    date: req.body.date,
    installation: req.body.installation,
    matricule: req.body.matricule,
    puissance: req.body.puissance,
    vitesse: req.body.vitesse,
    marque: req.body.marque,
    voltage: req.body.voltage,
    isolementStat: req.body.isolementStat,
    isolementRot: req.body.isolementRot,
    observation: req.body.observation
  });

  try {
    const newDepose = await depose.save();
    res.status(201).json(newDepose);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
