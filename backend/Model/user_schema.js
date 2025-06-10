const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_img: {
      type: String,
      default: "default-avatar.png",
    },
    role: {
      type: String,
      enum: ["admin", "user", "employee"],
      default: "user",
    },
    onboardingComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
