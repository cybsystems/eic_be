const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, vendorController.createVendor);
router.get('/', authenticateToken, vendorController.getAllVendors);
router.get('/:id', authenticateToken, vendorController.getVendorById);
router.put('/:id', authenticateToken, vendorController.updateVendor);
router.delete('/:id', authenticateToken, vendorController.deleteVendor);

module.exports = router;
