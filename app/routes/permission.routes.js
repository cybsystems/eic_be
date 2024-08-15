const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permission');
const authenticateToken=require('../middleware/auth')
router.use(authenticateToken)
// Define a route to get all permissions
router.get('/all', permissionController.getAllPermissions);

module.exports = router;
