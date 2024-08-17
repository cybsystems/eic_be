const express = require('express');
const router = express.Router();
const contractorUnitAssignmentController = require('../controllers/contractorUnitAssignmentController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, contractorUnitAssignmentController.createContractorUnitAssignment);
router.get('/', authenticateToken, contractorUnitAssignmentController.getAllContractorUnitAssignments);
router.get('/:id', authenticateToken, contractorUnitAssignmentController.getContractorUnitAssignmentById);
router.put('/:id', authenticateToken, contractorUnitAssignmentController.updateContractorUnitAssignment);
router.delete('/:id', authenticateToken, contractorUnitAssignmentController.deleteContractorUnitAssignment);

module.exports = router;
