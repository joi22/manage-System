const express = require("express");
const router = express.Router();
const Nutrition_Controller = require("../Controller/Nutrition_Controller.js");

router.post("/", Nutrition_Controller.create_entry);
router.get("/:userId", Nutrition_Controller.get_entries);
router.put("/:id", Nutrition_Controller.update_entry);
router.delete("/:id", Nutrition_Controller.delete_entry);

module.exports = router;
