const Workout = require("../Model/workout");

const workoutController = {
  // ✅ Create new workout
  createWorkout: async (req, res) => {
    try {
      const { userId, title, category, exercises, tags } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "Missing userId" });
      }

      const workout = new Workout({
        userId,
        title,
        category,
        exercises,
        tags,
      });

      console.log("Creating workout for user:", userId);
      await workout.save();

      res.status(201).json({
        message: "Workout created successfully",
        status: true,
        workout,
      });
    } catch (error) {
      console.error("Error creating workout:", error);
      res.status(500).json({ message: "Error creating workout", error });
    }
  },

  // ✅ Get all workouts for a user
  getUserWorkouts: async (req, res) => {
    try {
      const workouts = await Workout.find({ userId: req.params.id });
      res.status(200).json({ status: true, workouts });
    } catch (error) {
      res.status(500).json({ message: "Error fetching workouts", error });
    }
  },

  // ✅ Update a workout by ID
  updateWorkout: async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "Missing userId" });
      }

      const updated = await Workout.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Workout not found" });
      }

      res.status(200).json({
        message: "Workout updated successfully",
        status: true,
        workout: updated,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating workout", error });
    }
  },

  // ✅ Delete a workout
  deleteWorkout: async (req, res) => {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "Missing userId" });
      }

      const deleted = await Workout.findOneAndDelete({
        _id: req.params.id,
        userId,
      });

      if (!deleted) {
        return res.status(404).json({ message: "Workout not found" });
      }

      res.status(200).json({ message: "Workout deleted", status: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting workout", error });
    }
  },

  // ✅ Get recent 3 workouts for user
  getlong: async (req, res) => {
    try {
      const workouts = await Workout.find({ userId: req.params.userId })
        .sort({ createdAt: -1 })
        .limit(3);
      res.json({ success: true, data: workouts });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch workouts",
        error,
      });
    }
  },
};

module.exports = workoutController;
