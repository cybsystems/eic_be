const express = require('express');
const router = express.Router();
const contractorController = require('../controllers/contractorController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, contractorController.createContractor);
router.get('/', authenticateToken, contractorController.getAllContractors);
router.get('/:id', authenticateToken, contractorController.getContractorById);
router.put('/:id', authenticateToken, contractorController.updateContractor);
router.delete('/:id', authenticateToken, contractorController.deleteContractor);

module.exports = router;
