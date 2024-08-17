const express = require('express');
const router = express.Router();
const itemFeatureController = require('../controllers/itemFeatureController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, itemFeatureController.createItemFeature);
router.get('/', authenticateToken, itemFeatureController.getAllItemFeatures);
router.get('/:id', authenticateToken, itemFeatureController.getItemFeatureById);
router.put('/:id', authenticateToken, itemFeatureController.updateItemFeature);
router.delete('/:id', authenticateToken, itemFeatureController.deleteItemFeature);

module.exports = router;
