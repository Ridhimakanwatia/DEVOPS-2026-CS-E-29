const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Match = require('../models/Match');

// Returns every past match for the logged-in user, flattened into
// a list of individual laptop results — exactly the shape MatchCard expects.
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const matches = await Match.find({ userId: req.userId }).sort({ createdAt: -1 });
    const flattened = matches.flatMap((m) => m.results);
    res.json({ matches: flattened });
  } catch (err) {
    res.status(500).json({ message: 'Could not load match history.' });
  }
});

module.exports = router;