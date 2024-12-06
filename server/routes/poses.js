const express = require('express');
const Pose = require('../models/Pose');

const router = express.Router();

// Get all poses
router.get('/', async (req, res) => {
  try {
    const poses = await Pose.find();
    res.json(poses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new pose
router.post('/', async (req, res) => {
  const pose = new Pose({
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
    const newPose = await pose.save();
    res.status(201).json(newPose);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
