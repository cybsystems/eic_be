const express = require('express');
const router = express.Router();
const contractorUnitController = require('../controllers/contractorUnitController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, contractorUnitController.createContractorUnit);
router.get('/', authenticateToken, contractorUnitController.getAllContractorUnits);
router.get('/:id', authenticateToken, contractorUnitController.getContractorUnitById);
router.put('/:id', authenticateToken, contractorUnitController.updateContractorUnit);
router.delete('/:id', authenticateToken, contractorUnitController.deleteContractorUnit);

module.exports = router;
