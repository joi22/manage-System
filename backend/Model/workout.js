// models/Workout.js
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["Strength", "Cardio", "Flexibility", "HIIT", "Other"],
    required: true,
  },
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number },
      reps: { type: Number },
      weight: { type: Number },
      notes: { type: String },
    },
  ],
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Workout", workoutSchema);
