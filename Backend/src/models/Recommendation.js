const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    preferences: { type: Object, required: true },
    results: [{
      laptop: { type: mongoose.Schema.Types.ObjectId, ref: "Laptop" },
      score: Number,
      reasons: [String]
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);
