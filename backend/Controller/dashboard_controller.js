// Controller (dashboard_controller.js)
const Workout = require('../Model/workout');
const Nutrition = require('../Model/Nutrition');
const progress = require('../Model/progress');

exports.getDashboardData = async (req, res) => {
  try {
    const { userId } = req.params;

    const recentWorkouts = await Workout.find({ userId }).sort({ createdAt: -1 }).limit(5);
    const recentNutrition = await Nutrition.find({ userId }).sort({ date: -1 }).limit(3);
    const latestprogress = await progress.findOne({ userId }).sort({ date: -1 });

    res.status(200).json({
      message: "Dashboard data fetched successfully",
      status: true,
      data: {
        recentWorkouts,
        recentNutrition,
        latestprogress,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", status: false });
  }
};
