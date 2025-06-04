const express = require("express");
const onboard = require("../Controller/onboardingController");
const router = express.Router();


router.post("/goals", onboard.getGoal);
router.post("/experience", onboard.saveExperience);
router.post("/routine", onboard.saveRoutine);
router.get("/goals/:userId", onboard.getGoal);

module.exports = router;
