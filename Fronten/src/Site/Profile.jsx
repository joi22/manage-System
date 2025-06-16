import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import FitnessGoalForm from "./comp/FitnessGoalForm";
import { UserContext } from "../context/UserContextProvider";
import ProgressSummary from "../Dashbord/comp/ProgressSummary";
import WorkoutCard from "../Dashbord/comp/WorkoutCard";
import ExportButtons from "../Componantes/ExportButtons";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const [onboardingData, setOnboardingData] = useState(null);
  const [progressLogs, setProgressLogs] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/api/onboarding/goals/${user?._id}`);
        setOnboardingData(res.data);

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
console.log(user)
    if (user?._id) {
      fetchOnboarding();
    }
  }, [user?._id]);

  if (loading) {
    return <div className="min-h-screen text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#e60076] text-white p-6">{error}</div>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Profile Header */}
          <div className="flex items-center space-x-6 mb-10">
            <img
              src={user?.profile_img ? `/upload/${user.profile_img}` : "/default-profile.png"}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-white"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-profile.png";
              }}
            />

            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstname || "User"} {user?.lastname || ""}
              </h1>
              <p className="text-white/80">{user?.email || ""}</p>
              {user?.role && (
                <span className="text-sm text-black bg-white px-2 py-1 rounded mt-1 inline-block font-semibold">
                  {user.role}
                </span>
              )}
              <Link to={`/update-profile/${user?._id}`}>
                <button className="mt-2 px-4 py-1 bg-[#e60076] text-white rounded hover:bg-[#c90064] transition">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>

          <div className="space-x-2">
            <Link to="/login">
              <button
                onClick={() => {
                  logout();
                  navigate("/login"); // or "/"
                }}
                className="px-4 py-2 bg-white text-[#e60076] rounded font-semibold hover:bg-gray-200 transition"
              >
                Logout
              </button>
            </Link>
            <Link to="/dashboard">
              <button className="px-4 py-2 bg-white text-[#e60076] rounded font-semibold hover:bg-gray-200 transition">
                Go to Dashboard
              </button>
            </Link>
            <ExportButtons/>
          </div>
        </div>

        {/* Onboarding Data */}
        <div className="bg-white text-black rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Onboarding Summary</h2>
          {onboardingData ? (
            <ul className="space-y-2">
              <li><strong>Goal:</strong> {onboardingData.goal || "Not specified"}</li>
              {/* Add more onboarding fields here if needed */}
            </ul>
          ) : (
            <p className="text-[#e60076]/60">No onboarding data found.</p>
          )}
        </div>

        {/* Progress Summary */}
        <div className="bg-white text-black rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Progress Summary</h2>
          {progressLogs.length > 0 ? (
            <ProgressSummary data={progressLogs[progressLogs.length - 1]} />
          ) : (
            <p className="text-[#e60076]/60">No progress data available.</p>
          )}
        </div>

        {/* Workout Summary */}
        <div className="bg-white text-[#000000] rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Workout Summary</h2>
          {workouts.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              <WorkoutCard workouts={workouts} />
            </div>
          ) : (
            <p className="text-[#000000]">No workout data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
