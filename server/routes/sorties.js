// routes/sorties.js
const express = require('express');
const Sortie = require('../models/Sortie');

const router = express.Router();

// Get all sorties
router.get('/', async (req, res) => {
  try {
    const sorties = await Sortie.find();
    res.json(sorties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single sortie by ID
router.get('/:id', async (req, res) => {
  try {
    const sortie = await Sortie.findById(req.params.id);
    if (!sortie) return res.status(404).json({ message: 'Sortie not found' });
    res.json(sortie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new sortie
router.post('/', async (req, res) => {
  const { date, matricule, observation } = req.body;

  const newSortie = new Sortie({
    date,
    matricule,
    observation
  });

  try {
    const savedSortie = await newSortie.save();
    res.status(201).json(savedSortie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a sortie by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSortie = await Sortie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSortie) return res.status(404).json({ message: 'Sortie not found' });
    res.json(updatedSortie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete (soft delete) a sortie by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSortie = await Sortie.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!deletedSortie) return res.status(404).json({ message: 'Sortie not found' });
    res.json(deletedSortie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Restore a sortie by ID (undo soft delete)
router.put('/:id/restore', async (req, res) => {
  try {
    const restoredSortie = await Sortie.findByIdAndUpdate(
      req.params.id,
      { deleted: false },
      { new: true }
    );
    if (!restoredSortie) return res.status(404).json({ message: 'Sortie not found' });
    res.json(restoredSortie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
