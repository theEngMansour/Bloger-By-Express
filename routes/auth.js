/**
 * Express Module
 */
var express = require('express');

/**
 * Express Router
 */
var router = express.Router();

/**
 * Auth Controller
 */
const controller = require('../controllers/authController');

/**
 * Auth Middleware
 */
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/',authMiddleware.guest, controller.login);
router.get('/me', authMiddleware.authenticated, controller.me);



module.exports = router;