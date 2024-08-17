const express = require('express');
const router = express.Router();
const projectContractorUnitAssignmentController = require('../controllers/projectContractorUnitAssignmentController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, projectContractorUnitAssignmentController.createProjectContractorUnitAssignment);
router.get('/', authenticateToken, projectContractorUnitAssignmentController.getAllProjectContractorUnitAssignments);
router.get('/:id', authenticateToken, projectContractorUnitAssignmentController.getProjectContractorUnitAssignmentById);
router.put('/:id', authenticateToken, projectContractorUnitAssignmentController.updateProjectContractorUnitAssignment);
router.delete('/:id', authenticateToken, projectContractorUnitAssignmentController.deleteProjectContractorUnitAssignment);

module.exports = router;
