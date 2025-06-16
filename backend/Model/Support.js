const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  email: String,
  status: { type: String, default: 'Open' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Support', supportSchema);
