const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true },
  brand: { type: String, required: true }, // matched against laptop name, e.g. "ASUS"
  discountDescription: { type: String, required: true },
  validUntil: Date,
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);