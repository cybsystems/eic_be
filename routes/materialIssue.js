const express = require('express');
const router = express.Router();
const materialIssueController = require('../controllers/materialIssueController');
const authenticateToken = require('../middleware/auth')


router.post('/', authenticateToken, materialIssueController.createMaterialIssue);
router.get('/material-issue-items-for-warehouse/:id', authenticateToken, materialIssueController.getMaterialIssueItemsForWarehouse);

 
module.exports = router;
