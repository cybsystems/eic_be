const express = require('express');
const router = express.Router();
const contractorUnitController = require('../controllers/contractorUnitController');

router.post('/', contractorUnitController.createContractorUnit);
router.get('/', contractorUnitController.getAllContractorUnits);
router.get('/:id', contractorUnitController.getContractorUnitById);
router.put('/:id', contractorUnitController.updateContractorUnit);
router.delete('/:id', contractorUnitController.deleteContractorUnit);

module.exports = router;
