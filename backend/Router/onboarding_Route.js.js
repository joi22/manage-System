const express = require("express");
const onboard = require("../Controller/onboardingController");
const router = express.Router();


router.post("/goals", onboard.onboardingStep1);
router.post("/experience", onboard.onboardingStep2);
router.post("/routine", onboard.onboardingStep3);
router.get("/goals/:userId", onboard.getGoal);

module.exports = router;
