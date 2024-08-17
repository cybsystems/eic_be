const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissionController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, permissionsController.createPermission);
router.get('/', authenticateToken, permissionsController.getAllPermissions);

module.exports = router;
