const mongoose = require("mongoose");

const OnboardingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    goal: { type: String },
    experience: { type: String },
    routine: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Onboarding", OnboardingSchema);
