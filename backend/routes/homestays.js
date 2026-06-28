const express = require('express');
const router = express.Router();
const {
  getHomestays,
  getHomestayById,
  searchHomestays,
  createHomestay,
  updateHomestay,
  deleteHomestay
} = require('../controllers/homestayController');

// Search route must come before /:id to avoid "search" being treated as an id
router.get('/search', searchHomestays);

router.route('/')
  .get(getHomestays)
  .post(createHomestay);

router.route('/:id')
  .get(getHomestayById)
  .put(updateHomestay)
  .delete(deleteHomestay);

module.exports = router;