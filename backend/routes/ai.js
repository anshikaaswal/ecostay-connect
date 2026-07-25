const express = require('express');
const router = express.Router();
const { generateTravelPlan } = require('../controllers/aiController');
router.post('/planner', generateTravelPlan);
module.exports = router;