const express = require('express');
const router = express.Router();
const { generateTravelPlan } = require('../controllers/aiController');

// POST /api/ai/planner - Generate AI travel plan
router.post('/planner', generateTravelPlan);

module.exports = router;