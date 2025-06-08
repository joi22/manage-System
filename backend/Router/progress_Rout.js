const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const progressController = require("../Controller/Progress_Controller");

router.post("/",  progressController.addProgress);
router.get("/", auth, progressController.getProgress);
router.put("/:id", auth, progressController.updateProgress);
router.delete("/:id", auth, progressController.deleteProgress);
router.get("/latest", auth, progressController.getLatestProgress);

module.exports = router;
