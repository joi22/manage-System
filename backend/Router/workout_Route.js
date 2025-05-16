const express = require("express");
const Workout_Controller = require("../Controller/workout_controller");

const workout_router = express.Router();

workout_router.post("/create", Workout_Controller.create_workout);

// router.get("/:userId", async (req, res) => {
//   try {
//     const workouts = await workouts.find({ userId: req.params.userId });
//     res.json({ status: true, workouts });
//   } catch (err) {
//     res.status(500).json({ status: false, message: err.message });
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updated = await workouts.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     res.json({ status: true, updated });
//   } catch (err) {
//     res.status(400).json({ status: false, message: err.message });
//   }
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     await workouts.findByIdAndDelete(req.params.id);
//     res.json({ status: true, message: "Workout deleted" });
//   } catch (err) {
//     res.status(500).json({ status: false, message: err.message });
//   }
// });

module.exports = workout_router;
