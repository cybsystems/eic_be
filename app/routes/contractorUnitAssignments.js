const express = require('express');
const router = express.Router();
const contractorUnitAssignmentController = require('../controllers/contractorUnitAssignmentController');

router.post('/', contractorUnitAssignmentController.createContractorUnitAssignment);
router.get('/', contractorUnitAssignmentController.getAllContractorUnitAssignments);
router.get('/:id', contractorUnitAssignmentController.getContractorUnitAssignmentById);
router.put('/:id', contractorUnitAssignmentController.updateContractorUnitAssignment);
router.delete('/:id', contractorUnitAssignmentController.deleteContractorUnitAssignment);

module.exports = router;
