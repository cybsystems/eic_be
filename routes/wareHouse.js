const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const wareHouseController = require('../controllers/wareHouseController');


router.get('/', authenticateToken, wareHouseController.getAllWareHouses);

 
module.exports = router;
