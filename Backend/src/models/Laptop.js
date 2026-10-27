const mongoose = require("mongoose");

const laptopSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, default: "" },
    processor: { type: String, required: true },
    processorTier: { type: Number, default: 2, min: 1, max: 5 },
    ram: { type: Number, required: true },
    storage: { type: Number, required: true },
    storageType: { type: String, default: "SSD" },
    gpu: { type: String, default: "Integrated" },
    gpuTier: { type: Number, default: 1, min: 1, max: 5 },
    weight: { type: Number, default: 1.8 },
    type: { type: String, enum: ["Student", "Gaming", "Creator", "Business", "Everyday"], default: "Everyday" },
    rating: { type: Number, default: 4.0, min: 0, max: 5 },
    description: { type: String, default: "" },
    pros: [{ type: String }],
    cons: [{ type: String }],
    useCases: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Laptop", laptopSchema);
