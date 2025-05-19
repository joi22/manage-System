const express = require("express");
const UserGoal = require("../Controller/goalController");
const router = express.Router();

router.get("/:userId", UserGoal.getUserGoal);
router.post("/", UserGoal.createGoal);

module.exports = router;