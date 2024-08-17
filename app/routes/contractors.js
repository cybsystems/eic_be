const express = require('express');
const router = express.Router();
const contractorController = require('../controllers/contractorController');

router.post('/', contractorController.createContractor);
router.get('/', contractorController.getAllContractors);
router.get('/:id', contractorController.getContractorById);
router.put('/:id', contractorController.updateContractor);
router.delete('/:id', contractorController.deleteContractor);

module.exports = router;
