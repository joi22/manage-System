const mongoose = require('mongoose');

const NutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  meals: [
    {
      type: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        required: true,
      },
      items: [
        {
          name: { type: String, required: true },
          quantity: String,
          calories: Number,
          macros: {
            protein: { type: Number, default: 0 },
            carbs: { type: Number, default: 0 },
            fat: { type: Number, default: 0 }
          }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Nutrition', NutritionSchema);
