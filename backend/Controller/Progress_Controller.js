const Progress = require("../Model/progress");

const progressController = {
  // Create a new progress log
  addProgress: async (req, res) => {
    try {
      const log = new Progress({
        ...req.body,
        userId: req.user.id,
      });
      await log.save();
      res.status(201).json({ message: "Progress log added", status: true, log });
    } catch (error) {
      res.status(500).json({ message: "Error adding progress", error });
    }
  },

  // Get all progress logs for the current user
  getProgress: async (req, res) => {
    try {
      const logs = await Progress.find({ userId: req.user.id }).sort({ date: -1 });
      res.status(200).json({ status: true, logs });
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress logs", error });
    }
  },

  // Update a progress log by ID
  updateProgress: async (req, res) => {
    try {
      const updated = await Progress.findOneAndUpdate(
        { _id: req.params.id, userId: req.user.id },
        req.body,
        { new: true }
      );
      res.status(200).json({ message: "Progress updated", status: true, log: updated });
    } catch (error) {
      res.status(500).json({ message: "Error updating progress", error });
    }
  },

  // Delete a progress log by ID
  deleteProgress: async (req, res) => {
    try {
      await Progress.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
      res.status(200).json({ message: "Progress log deleted", status: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting progress", error });
    }
  },
  getLatestProgress: async (req, res) => {
  try {
    const log = await Progress.findOne({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json({ status: true, log });
  } catch (error) {
    res.status(500).json({ message: "Error fetching latest progress", error });
  }
},
};

module.exports = progressController;
