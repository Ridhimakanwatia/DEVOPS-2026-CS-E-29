require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const recommendRoutes = require('./routes/recommendRoutes');
const historyRoutes = require('./routes/historyRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

connectDB();

app.use(cors()); // allows your React frontend (different port) to call this API
app.use(express.json()); // lets us read JSON bodies like req.body.email

// Simple test route — confirms the server is alive
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

app.use('/api', authRoutes);
app.use('/api', recommendRoutes);
app.use('/api', historyRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});