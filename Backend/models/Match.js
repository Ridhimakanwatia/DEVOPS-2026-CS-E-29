const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: {
    budget: Number,
    use: String,
    form: String,
    portability: String,
    os: String,
    condition: String,
  },
  results: [
    {
      laptopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Laptop' },
      name: String,
      price: Number,
      condition: String,
      matchScore: Number,
      priceVsAverage: Number,
      coupon: String,
      specs: mongoose.Schema.Types.Mixed,
      blurb: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Match', matchSchema);