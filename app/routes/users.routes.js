const express = require('express');
const users = require("../controllers/users/index");
const authenticateToken=require("../middleware/auth")
const router = express.Router();


router.get("/",authenticateToken,users.getUsers)

router.post("/register", users.createUser);

router.post("/login", users.signInUser);

router.post("/delete_user",authenticateToken, users.deleteUser);


module.exports = router;

