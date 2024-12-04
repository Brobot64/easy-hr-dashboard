const express = require('express');
const { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',  createEmployee);//authMiddleware(['admin']),
router.get('/', authMiddleware(['admin']), getAllEmployees);
router.put('/:id', authMiddleware(['admin']), updateEmployee);
router.delete('/:id', authMiddleware(['admin']), deleteEmployee);

module.exports = router;