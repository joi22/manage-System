const express = require('express');
const connectDB = require('./Config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRouter = require('./Router/user_Route');
const workoutRouter = require('./Router/workout_Route');
const nutritionRouter = require('./Router/nutrition_Rout');
const progressRouter = require('./Router/progress_Rout');
const Blog_routs = require('./Router/Blog_routs');
const goalsRoutes = require("./Router/goalRoutes");

const app = express();
const PORT = process.env.PORTS || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/user", userRouter);
app.use("/api/workout", workoutRouter);
app.use("/api/nutrition", nutritionRouter);
app.use("/api/progress", progressRouter);
app.use("/api", Blog_routs);
app.use("/api/goals", require("./Router/Goal2_routes"));
app.use("/api", goalsRoutes);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
