const express = require('express');
const connectDB = require('./Config/db');
const cors = require('cors');
const dotenv = require('dotenv').config();

const userRouter = require('./Router/user_Route');
const workoutRouter = require('./Router/workout_Route');
const nutritionRouter = require('./Router/nutrition_Rout');
const progressRouter = require('./Router/progress_Rout');
const Blog_routs = require('./Router/Blog_routs');

const onboardingRoutes = require('./Router/onboarding_Route.js');
const dashboard_Route = require('./Router/dashboard_Route');
const notificationRoutes  = require('./Router/Notification_Route.js');
const reportRoutes = require('./Router/reportRoutes.js')
const Support = require('./Router/supportRoutes.js')




const app = express();
const PORT = process.env.PORTS || 5000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

connectDB();

app.use("/api/user", userRouter);
app.use("/api/workout", workoutRouter);
app.use("/api/nutrition", nutritionRouter);
app.use("/api/progress", progressRouter);
app.use("/api", Blog_routs);
app.use('/api/onboarding', onboardingRoutes);
app.use("/api/", dashboard_Route);
app.use('/api/notifications',notificationRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/support', Support);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});



app.use(express.static(path.join(__dirname, '../Fronten/dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Fronten/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
