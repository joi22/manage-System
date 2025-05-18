const Progress = require("../Model/Progress");

const Progress_Controller = {
  create_progress: async (req, res) => {
    try {
      const progress = await Progress.create(req.body);
      res.status(201).json({ status: true, progress });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  },

  get_progress: async (req, res) => {
    try {
      const progress = await Progress.find({ userId: req.params.userId });
      res.json(progress);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  update_progress: async (req, res) => {
    try {
      const updated = await Progress.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete_progress: async (req, res) => {
    try {
      await Progress.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = Progress_Controller;
