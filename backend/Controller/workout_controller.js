const Workout = require("../Model/workout.js");

const Workout_Controller = {
  create_workout: async (req, res) => {
    try {
      const workout = await Workout.create(req.body);
      res.status(201).json({ status: true, workout });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  },

  // You can add more functions here (get, update, delete)
};

module.exports= Workout_Controller;
