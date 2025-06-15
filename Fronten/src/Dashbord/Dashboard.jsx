import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import axios from "axios";

// Component imports
import ProgressSummary from "./comp/ProgressSummary";
import NutritionSummary from "./comp/NutritionSummary";
import WeightProgressChart from "./comp/WeightProgressChart";
import WorkoutCard from "./comp/WorkoutCard";
import WorkoutCategoryChart from "./comp/WorkoutCategoryChart";
import ProgressChart from "./comp/ProgressChart";
import NutritionMacrosChart from "./comp/NutritionMacrosChart";
import NotificationFeed from "../Componantes/NotificationsPage";
import SearchAndFilter from "../Componantes/SearchAndFilter";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const [nutritionLatest, setNutritionLatest] = useState(null);
  const [nutritionLogs, setNutritionLogs] = useState([]);
  const [progressLatest, setProgressLatest] = useState(null);
  const [progressLogs, setProgressLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          workoutRes,
          nutritionLatestRes,
          nutritionLogsRes,
          progressLatestRes,
          progressLogsRes,
          notificationsRes,
        ] = await Promise.all([
          axios.get(`/api/workout/${user._id}/recent`),
          axios.get(`/api/nutrition/latest/${user._id}`),
          axios.get(`/api/nutrition/${user._id}`),
          axios.get(`/api/progress/${user._id}/latest`),
          axios.get(`/api/progress/${user._id}`),
          axios.get(`/api/notifications/${user._id}`),
        ]);

        setWorkouts(workoutRes.data.data);
        setFilteredWorkouts(workoutRes.data.data);
        setNutritionLatest(nutritionLatestRes.data.data);
        setNutritionLogs(nutritionLogsRes.data.logs);
        setProgressLatest(progressLatestRes.data.data);
        setProgressLogs(progressLogsRes.data.logs);
        setNotifications(notificationsRes.data.notifications);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    if (user._id) fetchDashboardData();
  }, [user._id]);

  // Search/Filter Handler
  const handleSearchAndFilter = (searchText, filterBy) => {
    let filtered = workouts;

    if (searchText) {
      filtered = filtered.filter(w =>
        w.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter(w => w.category === filterBy);
    }

    setFilteredWorkouts(filtered);
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Welcome back, {user.name}</h2>

      {/* Notifications */}
      <NotificationFeed notifications={notifications} />

      {/* Search + Filter */}
      <SearchAndFilter
        onSearchAndFilter={handleSearchAndFilter}
        availableCategories={["All", "Strength", "Cardio", "Mobility", "Other"]}
      />

      {/* Workouts */}
      <WorkoutCard workouts={filteredWorkouts || []} />
      <WorkoutCategoryChart workouts={workouts} />

      {/* Nutrition */}
      <NutritionSummary data={nutritionLatest} />
      <NutritionMacrosChart data={nutritionLogs} />

      {/* Progress */}
      <ProgressSummary data={progressLatest} />
      <ProgressChart data={progressLogs} />
      <WeightProgressChart data={progressLogs} />
    </div>
  );
};

export default Dashboard;
