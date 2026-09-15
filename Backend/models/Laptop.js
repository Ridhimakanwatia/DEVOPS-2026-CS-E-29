const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['laptop', 'desktop'], required: true },
  price: { type: Number, required: true },
  condition: { type: String, enum: ['new', 'used', 'refurbished'], default: 'new' },
  useTags: [{ type: String }], // e.g. ['coding', 'heavy']
  portability: { type: String, enum: ['high', 'medium', 'low'], required: true },
  os: { type: String, enum: ['windows', 'macos'], required: true },
  specs: {
    cpu: String,
    ram: String,
    storage: String,
    graphics: String,
    display: String,
  },
  blurb: String,
}, { timestamps: true });

module.exports = mongoose.model('Laptop', laptopSchema);