const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/AuthMiddleware');
const { recommend, dashboardSummary } = require('../controllers/RecommendController');

router.post('/recommend', authMiddleware, recommend);
router.get('/dashboard', authMiddleware, dashboardSummary);

module.exports = router;