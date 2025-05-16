const express = require('express');
const connectDB = require('./Config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRouter = require('./Router/user_Route');
const workoutRouter = require('./Router/workout_Route');

const app = express();
const PORT = process.env.PORTS || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/user", userRouter);
app.use("/api/workout", workoutRouter);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
