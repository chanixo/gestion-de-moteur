const express = require('express');
const router = express.Router();
const Entree = require('../models/Entree'); // Import the Entree model or schema

// POST route to add a new entry
router.post('/', async (req, res) => {
    const entree = new Entree(req.body);
    try {
      const savedEntree = await entree.save(); // Save new entry
      res.status(201).json(savedEntree);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
router.get('/', async (req, res) => {
    try {
      const entries = await Entree.find();
      res.json(entries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

module.exports = router;
