const Goal = require("../Model/Goal");

let UserGoal = {
  getUserGoal: async (req, res) => {
    try {
      const { userId } = req.params;
      const goal = await Goal.findOne({ userId }).sort({ createdAt: -1 });
      res.json(goal);
    } catch (err) {
      res.status(500).json({ message: "Error fetching goal" });
    }
  },
  createGoal: async (req, res) => {
    try {
      const { userId, goal } = req.body;

      const newGoal = new Goal({ userId, goal });
      await newGoal.save();

      res.status(201).json({ message: "Goal saved", goal: newGoal });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to save goal" });
    }
  },
};

module.exports = UserGoal