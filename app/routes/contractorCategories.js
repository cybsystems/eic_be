const express = require('express');
const router = express.Router();
const contractorCategoryController = require('../controllers/contractorCategoryController');

router.post('/', contractorCategoryController.createContractorCategory);
router.get('/', contractorCategoryController.getAllContractorCategories);
router.get('/:id', contractorCategoryController.getContractorCategoryById);
router.put('/:id', contractorCategoryController.updateContractorCategory);
router.delete('/:id', contractorCategoryController.deleteContractorCategory);

module.exports = router;
