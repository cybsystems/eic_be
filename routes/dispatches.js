const express = require('express');
const router = express.Router();
const dispatchController = require('../controllers/dispatchController');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, dispatchController.createDispatch);
router.get('/', authenticateToken, dispatchController.getAllDispatches);
router.get('/:id', authenticateToken, dispatchController.getDispatchById);
router.put('/:id', authenticateToken, dispatchController.updateDispatch);
router.delete('/:id', authenticateToken, dispatchController.deleteDispatch);

module.exports = router;
