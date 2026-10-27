const Laptop = require("../models/Laptop");

exports.list = async (req, res) => {
  const { search, brand, type, ram, maxPrice, sort } = req.query;
  const filter = {};
  if (brand) filter.brand = brand;
  if (type) filter.type = type;
  if (ram) filter.ram = { $gte: Number(ram) };
  if (maxPrice && Number.isFinite(Number(maxPrice))) filter.price = { $lte: Number(maxPrice) };
  if (search) {
    const escaped = String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    filter.$or = [{ brand: new RegExp(escaped, "i") }, { model: new RegExp(escaped, "i") }, { processor: new RegExp(escaped, "i") }];
  }

  const sortMap = {
    priceAsc: { price: 1 },
    priceDesc: { price: -1 },
    rating: { rating: -1 },
    newest: { createdAt: -1 }
  };
  const laptops = await Laptop.find(filter).sort(sortMap[sort] || { rating: -1 });
  res.json({ count: laptops.length, laptops });
};

exports.details = async (req, res) => {
  const laptop = await Laptop.findById(req.params.id);
  if (!laptop) return res.status(404).json({ message: "Laptop not found." });
  res.json({ laptop });
};
