const express = require('express');
const router = express.Router();
const contractorCategoryController = require('../controllers/contractorCategoryController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, contractorCategoryController.createContractorCategory);
router.get('/', authenticateToken, contractorCategoryController.getAllContractorCategories);
router.get('/:id', authenticateToken, contractorCategoryController.getContractorCategoryById);
router.put('/:id', authenticateToken, contractorCategoryController.updateContractorCategory);
router.delete('/:id', authenticateToken, contractorCategoryController.deleteContractorCategory);

module.exports = router;
