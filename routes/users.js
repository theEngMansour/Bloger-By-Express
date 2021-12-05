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
var controller = require('../controllers/userController');

/**
 * Create User
 */
router.post('/', controller.create);

/**
 * Users List
 */
router.get('/', controller.list);

/**
 * Show User
 */
router.get('/:id', controller.show);

/**
 * Update User
 */
router.put('/:id', controller.update);

/**
 * Delete User
 */
router.delete('/:id', controller.delete);

module.exports = router;