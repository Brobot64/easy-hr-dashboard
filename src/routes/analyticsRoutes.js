const express = require('express');
const { getTotalEmployees, getDepartmentHeadcount } = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/total', authMiddleware(['admin']), getTotalEmployees);
router.get('/headcount', authMiddleware(['admin']), getDepartmentHeadcount);

module.exports = router;