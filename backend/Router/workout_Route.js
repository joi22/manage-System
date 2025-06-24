const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const workoutController = require("../Controller/workout_controller");

router.post("/", workoutController.createWorkout);
router.get("/:id",  workoutController.getUserWorkouts);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.deleteWorkout);
router.get('/:userId/recent', workoutController.getlong);

module.exports = router;
