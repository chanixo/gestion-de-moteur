// src/routes/installations.js

const express = require('express');
const router = express.Router();
const Installation = require('../models/installation'); // Ensure this model is defined

// Get installations by zone
router.get('/', async (req, res) => {
  const { zone } = req.query;
  try {
    const query = zone ? { zone } : {};
    const installations = await Installation.find(query);
    res.json(installations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new installation
router.post('/', async (req, res) => {
  const installation = new Installation({
    name: req.body.name,
    zone: req.body.zone, // Ensure the installation schema has a zone field
  });

  try {
    const newInstallation = await installation.save();
    res.status(201).json(newInstallation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
