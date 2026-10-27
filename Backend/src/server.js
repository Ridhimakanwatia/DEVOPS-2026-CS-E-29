const dns = require("dns");
// Use Google and Cloudflare DNS instead of the network's default
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const seedLaptops = require("./data/seedLaptops");

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => res.json({ status: "ok", app: "LaptopWise API" }));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/laptops", require("./routes/laptopRoutes"));
app.use("/api/recommendations", require("./routes/recommendationRoutes"));

app.use((req, res) => res.status(404).json({ message: "API route not found." }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server." });
});

const PORT = process.env.PORT || 5000;
connectDB()
  .then(seedLaptops)
  .then(() => app.listen(PORT, () => console.log(`LaptopWise API running at http://localhost:${PORT}`)))
  .catch((error) => {
    console.error("Startup failed:", error.message);
    process.exit(1);
  });