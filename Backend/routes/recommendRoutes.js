const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { recommend, dashboardSummary } = require('../controllers/recommendController');

router.post('/recommend', authMiddleware, recommend);
router.get('/dashboard', authMiddleware, dashboardSummary);

module.exports = router;