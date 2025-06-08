import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FitnessGoalForm from "./comp/FitnessGoalForm";
import { UserContext } from "../context/UserContextProvider";

const Profile = () => {
  const { user } = useContext(UserContext);
  const [onboardingData, setOnboardingData] = useState(null);

  useEffect(() => {
    const fetchOnboarding = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/onboarding/goals/${user._id}`);
        setOnboardingData(res.data); // assumes { goal: ... }
      } catch (err) {
        console.error("Error fetching onboarding data", err);
      }
    };

    fetchOnboarding();
  }, [user._id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex items-center space-x-6 mb-10">
          <img
            src={`/uploads/${user.profile_img}`}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-600"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.firstname} {user.lastname}</h1>
            <p className="text-gray-400">{user.email}</p>
            <span className="text-sm bg-blue-800 px-2 py-1 rounded mt-1 inline-block">{user.role}</span>
          </div>
        </div>

        {/* Onboarding Data */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Onboarding Summary</h2>
          {onboardingData ? (
            <ul className="space-y-2">
              <li><strong>Goal:</strong> {onboardingData.goal}</li>
              {/* Add more fields here if you store experience/routine */}
            </ul>
          ) : (
            <p className="text-gray-500">No onboarding data found.</p>
          )}
        </div>

        {/* Fitness Goal Form */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <FitnessGoalForm userId={user._id} onNext={() => window.location.reload()} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
