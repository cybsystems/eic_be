const express = require('express');
const router = express.Router();
const materialInwardController = require('../controllers/materialInwardController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, materialInwardController.createMaterialInward);
router.get('/', authenticateToken, materialInwardController.getAllMaterialInwards);
router.get('/:id', authenticateToken, materialInwardController.getMaterialInwardById);
router.put('/:id', authenticateToken, materialInwardController.updateMaterialInward);
router.delete('/:id', authenticateToken, materialInwardController.deleteMaterialInward);

module.exports = router;
