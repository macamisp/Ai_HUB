const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

// All user routes require authentication
router.use(authenticate);

// Profile routes
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

// History routes
router.get('/history', userController.getHistory);
router.delete('/history/:id', userController.deleteHistory);

// Stats route
router.get('/stats', userController.getStats);

module.exports = router;
