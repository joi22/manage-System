const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const nutritionController = require("../Controller/Nutrition_Controller");

router.post("/", auth, nutritionController.addLog);
router.get("/", auth, nutritionController.getLogs);
router.put("/:id", auth, nutritionController.updateLog);
router.delete("/:id", auth, nutritionController.deleteLog);
router.get("/latest", auth, nutritionController.getLatestLog);

module.exports = router;
