const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: Number, // in kg or lbs
  measurements: {
    chest: Number,
    waist: Number,
    hips: Number,
    arms: Number,
    legs: Number
  },
  performance: {
    runTime: String, // e.g., "5:30" for 5 mins 30 sec
    liftWeight: Number, // max lifting weight
    other: String
  },
  notes: String
});

module.exports = mongoose.model('Progress', ProgressSchema);
