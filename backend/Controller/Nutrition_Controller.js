const Nutrition = require("../Model/Nutrition");

const nutritionController = {
  // Add a new nutrition log
  addLog: async (req, res) => {
    console.log(req.body.userId)
    try {
      const log = new Nutrition({
        ...req.body,
        userId: req.body.userId,
      });
      await log.save();
      res.status(201).json({ message: "Nutrition log created", status: true, log });
    } catch (error) {
      res.status(500).json({ message: "Failed to create log", error });
    }
  },

  // Get all logs for the current user
  getLogs: async (req, res) => {
    try {
      const logs = await Nutrition.find({ userId: req.user.id }).sort({ date: -1 });
      res.status(200).json({ status: true, logs });
    } catch (error) {
      res.status(500).json({ message: "Error fetching logs", error });
    }
  },

  // Update a specific log
  updateLog: async (req, res) => {
    try {
      const updated = await Nutrition.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
      );
      res.status(200).json({ message: "Log updated", status: true, log: updated });
    } catch (error) {
      res.status(500).json({ message: "Error updating log", error });
    }
  },

  // Delete a log
  deleteLog: async (req, res) => {
    try {
      await Nutrition.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      res.status(200).json({ message: "Log deleted", status: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting log", error });
    }
  },
  getLatestLog: async (req, res) => {
    console.log( req.params.id)
    try {
      const log = await Nutrition.findOne({ userId: req.params.id }).sort({ date: -1 }); // ✅ using req.user.id
      res.status(200).json({ status: true, log });
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest nutrition log", error });
    }
  },
};

module.exports = nutritionController;
