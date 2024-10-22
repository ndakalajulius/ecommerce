const express = require('express');
const { registerUser, authUser, getAllUsers } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.get('/', protect, admin, getAllUsers); // Admin only

module.exports = router;
