const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticate } = require('../middleware/authMiddleware');
const { aiToolLimiter } = require('../middleware/rateLimiter');

// All AI routes require authentication and rate limiting
router.use(authenticate);
router.use(aiToolLimiter);

// AI Chat Assistant
router.post('/chat', aiController.chat);

// AI Image Generator
router.post('/image', aiController.generateImage);

// AI Resume Builder
router.post('/resume', aiController.buildResume);

// AI Code Generator
router.post('/code', aiController.generateCode);

// AI Study Assistant
router.post('/study', aiController.studyAssistant);

// AI Content Generator
router.post('/content', aiController.generateContent);

module.exports = router;
