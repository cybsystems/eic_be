const express = require('express');
const router = express.Router();
const workOrderController = require('../controllers/workOrderController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, workOrderController.createWorkOrder);
router.get('/', authenticateToken, workOrderController.getAllWorkOrders);

module.exports = router;
