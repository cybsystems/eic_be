const express = require('express');
const router = express.Router();
const itemCategoryController = require('../controllers/itemCategoryController');
const authenticateToken = require('../middleware/auth')

router.post('/', authenticateToken, itemCategoryController.createItemCategory);
router.get('/', authenticateToken, itemCategoryController.getAllItemCategories);
router.get('/:id', authenticateToken, itemCategoryController.getItemCategoryById);
router.put('/:id', authenticateToken, itemCategoryController.updateItemCategory);
router.delete('/:id', authenticateToken, itemCategoryController.deleteItemCategory);

module.exports = router;
