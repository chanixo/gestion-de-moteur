const express = require('express');
const router = express.Router();
const multer = require('multer');
const Vibration = require('../models/Vibration');
const Installation = require('../models/installation');
const fs = require('fs');
const User = require('../models/User'); // Assuming you have a User model


// Ensure the uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Add new vibration record
router.post('/add', upload.single('piecePointe'), async (req, res) => {
  try {
    const { date, zones, installation, etatVisual, mesures, vibration, observation } = req.body;
    const piecePointe = req.file ? req.file.filename : null;

    // Log incoming data for debugging
    console.log("Received Data:", req.body);
    console.log("File:", piecePointe);

    // Validate required fields
    if (!date || !zones || !installation || !etatVisual || !mesures || !vibration) {
      console.log("Validation Error: Missing required fields.");
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Parse JSON fields safely
    let parsedZones, parsedEtatVisual, parsedMesures, parsedVibration;
    try {
      parsedZones = JSON.parse(zones);
      parsedEtatVisual = JSON.parse(etatVisual);
      parsedMesures = JSON.parse(mesures);
      parsedVibration = JSON.parse(vibration);
    } catch (error) {
      console.log("JSON Parsing Error:", error.message);
      return res.status(400).json({ error: 'Invalid JSON format for one of the fields' });
    }

    // Create new vibration record
    const newVibration = new Vibration({
      date,
      zones: parsedZones,
      installation,
      etatVisual: parsedEtatVisual,
      mesures: parsedMesures,
      vibration: parsedVibration,
      observation,
      piecePointe,
    });

    // Save the new vibration record
    await newVibration.save();
    res.status(201).json(newVibration);
  } catch (error) {
    console.error('Error creating vibration:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Fetch all vibrations
router.get('/', async (req, res) => {
  try {
    const vibrations = await Vibration.find();
    res.json(vibrations);
  } catch (error) {
    console.error('Error fetching vibrations:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fetch installations based on selected zones
router.get('/installations', async (req, res) => {
  try {
    const { zone } = req.query;
    const zonesArray = zone.split(',');
    const installations = await Installation.find({ zone: { $in: zonesArray } });
    res.json(installations);
  } catch (error) {
    console.error('Error fetching installations:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
