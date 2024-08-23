const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const wareHouseController = require('../controllers/wareHouseController');


router.get('/', authenticateToken, wareHouseController.getAllWareHouses);
router.get('/material-issue-warehouse', authenticateToken, wareHouseController.getWarehusesFromMaterialIssue);

 
module.exports = router;
