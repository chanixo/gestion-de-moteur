const express = require('express');
const Maintenance = require('../models/Maintenance');
const multer = require('multer');

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// @route GET /api/maintenances
// @desc Get all maintenance records
router.get('/', async (req, res) => {
  try {
    const maintenances = await Maintenance.find();
    res.json(maintenances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/maintenances
// @desc Create a new maintenance record
router.post('/', upload.single('pieceJointe'), async (req, res) => {
  const { date, zone, installation, typePanne, lieuReparation, observation } = req.body;
  const pieceJointe = req.file ? req.file.path : null;

  const newMaintenance = new Maintenance({
    date,
    zone,
    installation,
    typePanne,
    lieuReparation,
    observation,
    pieceJointe
  });

  try {
    const savedMaintenance = await newMaintenance.save();
    res.status(201).json(savedMaintenance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
