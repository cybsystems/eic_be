const express = require('express');
const users = require("../controllers/users/index");
const router = express.Router();



router.get("/", users.getUsers);

router.post("/register", users.createUser);


module.exports = router;

