const Workout = require("../Model/workout.js");

const Workout_Controller = {
  create_workouts: async (req, res) => {
    try {
      const workout = await Workout.create(req.body);
      res.status(201).json({ status: true, workout });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  },
  
  Get_Workouts: async (req, res) => {
    const workouts = await Workout.find({ userId: req.params.userId });
    res.json(workouts);
  },

  update_workout: async (req, res) => {
    const updated = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  },

  del_workouts: async (req, res) => {
    await Workout.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  }


  // You can add more functions here (get, update, delete)
};

module.exports = Workout_Controller;
