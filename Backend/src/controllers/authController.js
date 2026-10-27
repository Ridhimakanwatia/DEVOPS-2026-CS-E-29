const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

function createToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, favourites: user.favourites || [] };
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Name, email and password are required." });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Use a password with at least 8 characters." });
    }
    const normalizedEmail = email.toLowerCase().trim();
    if (await User.findOne({ email: normalizedEmail })) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, passwordHash });
    res.status(201).json({ token: createToken(user._id), user: publicUser(user) });
  } catch (error) {
    res.status(500).json({ message: "Could not create your account." });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase().trim() });
    if (!user || !(await bcrypt.compare(password || "", user.passwordHash))) {
      return res.status(401).json({ message: "Email or password is incorrect." });
    }
    res.json({ token: createToken(user._id), user: publicUser(user) });
  } catch {
    res.status(500).json({ message: "Could not log in right now." });
  }
};

exports.me = async (req, res) => res.json({ user: publicUser(req.user) });

exports.favourites = async (req, res) => {
  const user = await User.findById(req.user._id).populate("favourites");
  res.json({ favourites: user.favourites });
};

exports.addFavourite = async (req, res) => {
  const Laptop = require("../models/Laptop");
  if (!(await Laptop.exists({ _id: req.params.laptopId }))) {
    return res.status(404).json({ message: "Laptop not found." });
  }
  await User.findByIdAndUpdate(req.user._id, { $addToSet: { favourites: req.params.laptopId } });
  res.json({ message: "Laptop saved to favourites." });
};

exports.removeFavourite = async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $pull: { favourites: req.params.laptopId } });
  res.json({ message: "Laptop removed from favourites." });
};
