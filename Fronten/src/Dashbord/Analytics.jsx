import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";
import NutritionMacrosChart from "./comp/NutritionMacrosChart";
import ProgressChart from "./comp/ProgressChart";
import WorkoutCategoryChart from "./comp/WorkoutCategoryChart";

const Analytics = () => {
  const { user } = useContext(UserContext);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [progressLogs, setProgressLogs] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchData = async () => {
      try {
        const [nutRes, progRes, workRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/nutrition/latest/${user._id}`),
          axios.get(`http://localhost:3000/api/progress/${user._id}`),
          axios.get(`http://localhost:3000/api/workout/${user._id}`),
        ]);

        const nutLogs = nutRes?.data;
        const progLogs = progRes.data.logs;
        const workoutData = workRes?.data?.workouts;
        console.log(progLogs)
        console.log(workoutData)
        setNutritionLogs(Array.isArray(nutLogs) ? nutLogs : []);
        setProgressLogs(Array.isArray(progLogs) ? progLogs : []);
        setWorkouts(Array.isArray(workoutData) ? workoutData : []);
      } catch (err) {
        console.error("Analytics data fetch failed:", err);
      }
    };



    fetchData();
  }, [user]);
  // Transform nutrition logs to chart-friendly data
  const nutritionChartData = nutritionLogs.map((log) => ({
    date: log.date,
    calories: log.calories,
    protein: log.protein,
    carbs: log.carbs,
    fat: log.fat,
  }));

  // Transform progress logs to chart-friendly data
  const progressChartData = progressLogs.map((log) => ({
    date: log.date,
    weight: log.weight,
    muscleMass: log.muscleMass,
    bodyFat: log.bodyFat,
  }));

  // Aggregate workouts by category for pie/bar chart
  const workoutCategoryCount = workouts.reduce((acc, workout) => {
    acc[workout.category] = (acc[workout.category] || 0) + 1;
    return acc;
  }, {});

  // Convert category counts to array for charts
  const workoutCategoryData = Object.entries(workoutCategoryCount).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-4">Fitness Analytics</h2>

      <NutritionMacrosChart data={nutritionChartData} />
      <ProgressChart data={progressChartData} />
      <WorkoutCategoryChart data={workoutCategoryData} />

      {/* Add any additional analytics or summary here */}
    </div>
  );
};

export default Analytics;
