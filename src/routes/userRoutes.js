const express = require('express');
const { 
  createUser, 
  getAllUsers, 
  updateUser, 
  deleteUser, 
  toggleUserStatus 
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Admin-only routes authMiddleware(['admin']),
router.post('/', 
  createUser
);

router.get('/', 
  authMiddleware(['admin']), 
  getAllUsers
);

router.put('/:id', 
  authMiddleware(['admin']), 
  updateUser
);

router.delete('/:id', 
  authMiddleware(['admin']), 
  deleteUser
);

router.patch('/:id/status', 
  authMiddleware(['admin']), 
  toggleUserStatus
);

module.exports = router;