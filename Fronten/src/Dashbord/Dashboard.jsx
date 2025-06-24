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
          axios.get(`http://localhost:3000/api/workout/${user._id}/recent`),
          axios.get(`http://localhost:3000/api/nutrition/latest/${user._id}`),
          axios.get(`http://localhost:3000/api/nutrition/${user._id}`),
          axios.get(`http://localhost:3000/api/progress/${user._id}/latest`),
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
   <div className="p-6 space-y-8 text-black bg-gray-50 min-h-screen">
  <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}</h2>

  {/* Top Cards: Notifications + Search */}
  <div className="grid md:grid-cols-2 gap-6">
    <NotificationFeed notifications={notifications} />
    <SearchAndFilter
      onSearchAndFilter={handleSearchAndFilter}
      availableCategories={["All", "Strength", "Cardio", "Mobility", "Other"]}
    />
  </div>

  {/* Workout Section */}
  <section>
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Workouts</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <WorkoutCard workouts={filteredWorkouts || []} />
      <WorkoutCategoryChart workouts={workouts} />
    </div>
  </section>

  {/* Nutrition Section */}
  <section>
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Nutrition</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <NutritionSummary data={nutritionLatest} />
      <NutritionMacrosChart data={nutritionLogs} />
    </div>
  </section>

  {/* Progress Section */}
  <section>
    <h3 className="text-xl font-semibold text-gray-700 mb-4">Progress</h3>
    <div className="grid md:grid-cols-2 gap-6">
      <ProgressSummary data={progressLatest} />
      <WeightProgressChart data={progressLogs} />
    </div>
    <div className="mt-6">
      <ProgressChart data={progressLogs} />
    </div>
  </section>
</div>
  );
};

export default Dashboard;
