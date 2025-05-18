const express = require("express");
const Workout_Controller = require("../Controller/workout_controller");

const workout_router = express.Router();

workout_router.post("/create", Workout_Controller.create_workouts);
workout_router.get("/:userId",Workout_Controller.Get_Workouts);
workout_router.put("/:id", Workout_Controller.update_workout);
workout_router.delete("/:id", Workout_Controller.del_workouts);

module.exports = workout_router;
