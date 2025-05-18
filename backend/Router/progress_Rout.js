const express = require("express");
const router = express.Router();
const Progress_Controller = require("../Controller/Progress_Controller.js");

router.post("/", Progress_Controller.create_progress);
router.get("/:userId", Progress_Controller.get_progress);
router.put("/:id", Progress_Controller.update_progress);
router.delete("/:id", Progress_Controller.delete_progress);

module.exports = router;
