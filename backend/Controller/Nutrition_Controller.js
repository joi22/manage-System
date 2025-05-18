const Nutrition = require("../Model/Nutrition");

const Nutrition_Controller = {
  create_entry: async (req, res) => {
    try {
      const entry = await Nutrition.create(req.body);
      res.status(201).json({ status: true, entry });
    } catch (err) {
      res.status(400).json({ status: false, message: err.message });
    }
  },

  get_entries: async (req, res) => {
    try {
      const entries = await Nutrition.find({ userId: req.params.userId });
      res.json(entries);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  update_entry: async (req, res) => {
    try {
      const updated = await Nutrition.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updated);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  delete_entry: async (req, res) => {
    try {
      await Nutrition.findByIdAndDelete(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = Nutrition_Controller;
