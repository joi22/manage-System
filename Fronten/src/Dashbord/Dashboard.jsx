import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";
import ProgressSummary from "./comp/ProgressSummary";
import NutritionSummary from "./comp/NutritionSummary";
import WeightProgressChart from "./comp/WeightProgressChart";
import WorkoutCard from "./comp/WorkoutCard";
import WorkoutCategoryChart from "./comp/WorkoutCategoryChart";
import ProgressChart from "./comp/ProgressChart";
import NutritionMacrosChart from "./comp/NutritionMacrosChart";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [nutritionLatest, setNutritionLatest] = useState(null);
  const [nutritionLogs, setNutritionLogs] = useState([]); // For nutrition charts
  const [progressLatest, setProgressLatest] = useState(null);
  const [progressLogs, setProgressLogs] = useState([]); // For progress charts

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          workoutRes,
          nutritionLatestRes,
          nutritionLogsRes,
          progressLatestRes,
          progressLogsRes,
        ] = await Promise.all([
          axios.get(`/api/workout/${user._id}/recent`),
          axios.get(`/api/nutrition/${user._id}/latest`),
          axios.get(`/api/nutrition/${user._id}`), // all nutrition logs
          axios.get(`/api/progress/${user._id}/latest`),
          axios.get(`/api/progress/${user._id}`), // all progress logs
        ]);

        setWorkouts(workoutRes.data.data);
        setNutritionLatest(nutritionLatestRes.data.data);
        setNutritionLogs(nutritionLogsRes.data.logs);
        setProgressLatest(progressLatestRes.data.data);
        setProgressLogs(progressLogsRes.data.logs);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [user._id]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <WorkoutCard workouts={workouts || []} />
      <NutritionSummary data={nutritionLatest} />
      <NutritionMacrosChart data={nutritionLogs} />
      <ProgressSummary data={progressLatest} />
      <ProgressChart data={progressLogs} />
      <WorkoutCategoryChart workouts={workouts} />
      <WeightProgressChart data={progressLogs} />

    </div>
  );
};
export default Dashboard