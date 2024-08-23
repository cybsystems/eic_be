const express = require('express');
const router = express.Router();
const materialIssueController = require('../controllers/materialIssueController');
const authenticateToken = require('../middleware/auth')


router.post('/', authenticateToken, materialIssueController.createMaterialIssue);
 
 
module.exports = router;
