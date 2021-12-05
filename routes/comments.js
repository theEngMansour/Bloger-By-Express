/**
 * Express Module
 */
const express = require('express');

/**
 * Express Router
 */
const router = express.Router();

/**
 * Comment Controller
 */
const controller = require('../controllers/commentController');

/**
 * Authentication Middleware
 */
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Create Comment
 */
router.post('/:postId', authMiddleware.authenticated, controller.create);

/**
 * Delete Comment
 */
router.delete('/:postId/:commentId', authMiddleware.authenticated, controller.delete);

module.exports = router;