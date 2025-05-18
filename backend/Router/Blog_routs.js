const express = require("express");
const router = express.Router();
const getExercises  = require("../Controller/workours_Blogs");

router.get("/exercises", getExercises.getExercises);

module.exports = router;
