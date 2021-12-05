/**
 * Express Module
 */
var express = require('express');

/**
 * Express Router
 */
var router = express.Router();

/**
 * User Controller
*/
var controller = require('../controllers/postController');

/**
 * Auth Middleware
 */
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Create Post
 */
router.post('/', authMiddleware.authenticated, controller.create);

/**
 * Posts List
 */
router.get('/', controller.list);

/**
 * View Post
 */
router.get('/:id', controller.details);

/**
 * Update Post
 */
router.put('/:id', authMiddleware.authenticated, controller.update);

/**
 * Delete Post
 */
router.delete('/:id', authMiddleware.authenticated, controller.delete);

module.exports = router; 