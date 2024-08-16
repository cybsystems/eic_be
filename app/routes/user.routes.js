const express = require('express');
const user = require("../controllers/user/index");
const authenticateToken=require("../middleware/auth")
const router = express.Router();



router.get("/",authenticateToken, user.getUsers);

router.get('/:id',authenticateToken,user.getUserById);

router.post("/register", user.createUser);

router.post("/login", user.signInUser);

router.post("/delete_user",authenticateToken, user.deleteUser);


router.patch("/:id",authenticateToken,user.updateUser)

module.exports = router;

