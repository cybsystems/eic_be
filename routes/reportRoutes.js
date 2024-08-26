const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/reportsController');
const authenticateToken = require('../middleware/auth')


router.get('/inward', authenticateToken, reportsController.getInwardReport);
router.get('/stock', authenticateToken, reportsController.getStockReport);
router.get('/dispatch', authenticateToken, reportsController.getDispatchReport);



 
module.exports = router;
