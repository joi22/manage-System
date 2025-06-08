const Progress = require("../Model/progress");

const progressController = {
  addProgress: async (req, res) => {
    try {
      const { userId } = req.body; // get userId from body
      if (!userId) return res.status(400).json({ message: "User ID is required" });

      const log = new Progress({
        ...req.body,
        userId,  // set userId explicitly
      });
      await log.save();
      res.status(201).json({ message: "Progress log added", status: true, log });
    } catch (error) {
      res.status(500).json({ message: "Error adding progress", error });
    }
  },

  getProgress: async (req, res) => {
    try {
      const userId = req.query.userId; // get userId from query string
      if (!userId) return res.status(400).json({ message: "User ID is required" });

      const logs = await Progress.find({ userId }).sort({ date: -1 });
      res.status(200).json({ status: true, logs });
    } catch (error) {
      res.status(500).json({ message: "Error fetching progress logs", error });
    }
  },

  updateProgress: async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) return res.status(400).json({ message: "User ID is required" });

      const updated = await Progress.findOneAndUpdate(
        { _id: req.params.id, userId },
        req.body,
        { new: true }
      );
      res.status(200).json({ message: "Progress updated", status: true, log: updated });
    } catch (error) {
      res.status(500).json({ message: "Error updating progress", error });
    }
  },

  deleteProgress: async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) return res.status(400).json({ message: "User ID is required" });

      await Progress.findOneAndDelete({ _id: req.params.id, userId });
      res.status(200).json({ message: "Progress log deleted", status: true });
    } catch (error) {
      res.status(500).json({ message: "Error deleting progress", error });
    }
  },

  getLatestProgress: async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) return res.status(400).json({ message: "User ID is required" });

      const log = await Progress.findOne({ userId }).sort({ date: -1 });
      res.status(200).json({ status: true, log });
    } catch (error) {
      res.status(500).json({ message: "Error fetching latest progress", error });
    }
  },
};


module.exports = progressController;
