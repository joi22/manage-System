import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FitnessGoalForm from "./comp/FitnessGoalForm";
import { UserContext } from "../context/UserContextProvider";
import ProgressSummary from "../Dashbord/comp/ProgressSummary";
import WorkoutCard from "../Dashbord/comp/WorkoutCard";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [onboardingData, setOnboardingData] = useState(null);
  const [progressLogs, setProgressLogs] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/onboarding/goals/${user?._id}`);
        setOnboardingData(res.data); // assumes { goal: ... }

        const [progRes, workRes] = await Promise.all([
          axios.get(`http://localhost:3000/api/progress/${user?._id}`),
          axios.get(`http://localhost:3000/api/workout/${user?._id}`),
        ]);

        setProgressLogs(Array.isArray(progRes.data?.logs) ? progRes.data.logs : []);
        setWorkouts(Array.isArray(workRes?.data?.workouts) ? workRes.data.workouts : []);
      } catch (err) {
        console.error("Error fetching onboarding data", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchOnboarding();
    }
  }, [user?._id]);

  const progressChartData = progressLogs.map(log => ({
    date: log?.date || "",
    weight: log?.weight || 0,
    bodyFat: log?.bodyFat || 0,
  }));

  if (loading) {
    return <div className="min-h-screen bg-gray-900 text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-white p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-10">
          <img
            src={user?.profile_img ? `/uploads/${user.profile_img}` : "/default-profile.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-600"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/default-profile.png";
            }}
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user?.firstname || "User"} {user?.lastname || ""}
            </h1>
            <p className="text-gray-400">{user?.email || ""}</p>
            {user?.role && (
              <span className="text-sm bg-blue-800 px-2 py-1 rounded mt-1 inline-block">
                {user.role}
              </span>
            )}
          </div>
        </div>

        {/* Onboarding Data */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Onboarding Summary</h2>
          {onboardingData ? (
            <ul className="space-y-2">
              <li><strong>Goal:</strong> {onboardingData.goal || "Not specified"}</li>
              {/* Add more fields here if you store experience/routine */}
            </ul>
          ) : (
            <p className="text-gray-500">No onboarding data found.</p>
          )}
        </div>

        {/* Progress Summary */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8 text-black">
          <h2 className="text-xl font-semibold mb-4 text-white">Progress Summary</h2>
          {progressLogs.length > 0 ? (
            <ProgressSummary data={progressLogs[progressLogs.length - 1]} />
          ) : (
            <p className="text-gray-500">No progress data available.</p>
          )}
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8 text-black">
          <h2 className="text-xl font-semibold mb-4 text-white">Workout Summary</h2>
          {progressLogs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4 ">
              <WorkoutCard workouts={workouts} />
            </div>
          ) : (
            <p className="text-gray-500">No progress data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;