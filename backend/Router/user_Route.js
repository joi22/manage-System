// routes/user_route.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const usercontroller = require("../Controller/user_controller");
const upload = require('../Config/multer_config'); 
const router = express.Router();




// Routes
router.post("/register", usercontroller.register);
router.post("/login", usercontroller.Login);
router.put('/update/:id', upload.single('profile_img'), usercontroller.updateUsers);

module.exports = router;
