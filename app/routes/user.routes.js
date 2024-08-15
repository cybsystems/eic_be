const express = require('express');
const user = require("../controllers/user/index");
const authenticateToken=require("../middleware/auth")
const router = express.Router();



router.post("/register", user.createUser);

router.post("/login", user.signInUser);

router.post("/delete_user",authenticateToken, user.deleteUser);


module.exports = router;

