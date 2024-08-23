const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/auth')


router.post('/', authenticateToken, userController.createUserTable);
router.get('/', authenticateToken, userController.getAllUserTable);
router.get('/userinfo',authenticateToken,userController.getUserInfo)
router.get('/:id', authenticateToken, userController.getUserTableById);
router.put('/:id', authenticateToken, userController.updateUserTable);
router.delete('/:id', authenticateToken, userController.deleteUserTable);
router.post('/register', userController.register);
router.post('/login', userController.login);
 
module.exports = router;
