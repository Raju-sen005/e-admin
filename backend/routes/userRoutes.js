const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// ✅ GET single user by ID (View)
// GET /api/users/:id
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});


// ✅ PUT (Edit) a user by ID
router.put('/:id', async (req, res) => {
  const { firstName, lastName, email } = req.body;
  const updated = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email }, { new: true });
  res.json(updated);
});


// ✅ DELETE a user by ID
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
