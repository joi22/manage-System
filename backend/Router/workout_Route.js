// routes/workout.js
import express from "express";
import Workout from "../Model/workout";

const router = express.Router();

// Create workout
router.post("/", async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.status(201).json({ status: true, workout });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Get all workouts for a user
router.get("/:userId", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json({ status: true, workouts });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

// Update a workout
router.put("/:id", async (req, res) => {
  try {
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: true, updated });
  } catch (err) {
    res.status(400).json({ status: false, message: err.message });
  }
});

// Delete a workout
router.delete("/:id", async (req, res) => {
  try {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: "Workout deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
});

module.exports=router