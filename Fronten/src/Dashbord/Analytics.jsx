import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContextProvider";

// Updated components
import NutritionMacrosChart from "./comp/NutritionMacrosChart";
import NutritionSummary from "./comp/NutritionSummary";
import WorkoutCategoryChart from "./comp/WorkoutCategoryChart";
import WorkoutCard from "./comp/WorkoutCard";
import ProgressChart from "./comp/ProgressChart";
import WeightProgressChart from "./comp/WeightProgressChart";
import ProgressSummary from "./comp/ProgressSummary";

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

        // Assuming nutRes.data.log is a single log object (not array)
        const logs = Array.isArray(nutRes.data.log)
          ? nutRes.data.log
          : nutRes.data.log
          ? [nutRes.data.log]
          : [];

        setNutritionLogs(logs);
        setProgressLogs(Array.isArray(progRes.data.logs) ? progRes.data.logs : []);
        setWorkouts(Array.isArray(workRes?.data?.workouts) ? workRes.data.workouts : []);

        console.log("Nutrition Logs:", nutRes.data
  );
      } catch (err) {
        console.error("Analytics data fetch failed:", err);
      }
    };

    fetchData();
  }, [user]);

    // Chart-friendly progress data
    const progressChartData = progressLogs.map(log => ({
      date: log.date,
      weight: log.weight,
      bodyFat: log.bodyFat,
    }));
  const nurtionChartData = nutritionLogs.map(log => ({
    date: log.date,
    meals: log.meals,
    userId : log.userId,


  }));
  console.log(nurtionChartData, "this ")

  return (
    <div className="p-6 space-y-6 " style={{color:"black"}}>
      <h2 className="text-2xl font-bold mb-4">Fitness Analytics</h2>

      {/* Nutrition Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <NutritionMacrosChart data={nutritionLogs} />
        <NutritionSummary data={nutritionLogs[0]} />
      </div>

      {/* Progress Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <ProgressChart data={progressChartData} />
        <WeightProgressChart data={progressLogs} />
      </div>
      {progressLogs.length > 0 && <ProgressSummary data={progressLogs[progressLogs.length - 1]} />}

      {/* Workout Section */}
      <div className="grid md:grid-cols-2 gap-4">
        <WorkoutCategoryChart workouts={workouts} />
        <WorkoutCard workouts={workouts} />
      </div>
    </div>
  );
};

export default Analytics;
