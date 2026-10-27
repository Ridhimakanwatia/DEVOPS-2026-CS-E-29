const express = require("express");
const Laptop = require("../models/Laptop");
const Recommendation = require("../models/Recommendation");
const requireAuth = require("../middleware/auth");
const { getRecommendations } = require("../services/recommendationService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { budget, use, ram, storage, portability } = req.body;
    if (!budget || Number(budget) < 1) return res.status(400).json({ message: "Enter a valid budget." });
    const preferences = {
      budget: Number(budget),
      use: String(use || "college"),
      ram: Number(ram) || 8,
      storage: Number(storage) || 256,
      portability: String(portability || "balanced")
    };
    const laptops = await Laptop.find();
    const results = getRecommendations(laptops, preferences);
    res.json({ preferences, results });
    // Save history only for signed-in users. Guests can still get recommendations.
    if (req.headers.authorization?.startsWith("Bearer ")) {
      try {
        const jwt = require("jsonwebtoken");
        const token = req.headers.authorization.slice(7);
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        await Recommendation.create({
          user: payload.userId,
          preferences,
          results: results.map((item) => ({ laptop: item.laptop._id, score: item.score, reasons: item.reasons }))
        });
      } catch {
        // An expired optional token must not break public recommendations.
      }
    }
  } catch {
    res.status(500).json({ message: "Unable to generate recommendations right now." });
  }
});

router.get("/history", requireAuth, async (req, res) => {
  const history = await Recommendation.find({ user: req.user._id })
    .populate("results.laptop")
    .sort({ createdAt: -1 })
    .limit(20);
  res.json({ history });
});

module.exports = router;
