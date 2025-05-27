const express = require("express");
const router = express.Router();
const auth = require("../auth/auth");
const workoutController = require("../Controller/workout_controller");

router.post("/", auth, workoutController.createWorkout);
router.get("/", auth, workoutController.getUserWorkouts);
router.put("/:id", auth, workoutController.updateWorkout);
router.delete("/:id", auth, workoutController.deleteWorkout);
router.get('/:userId/recent', auth, workoutController.getlong);

module.exports = router;
