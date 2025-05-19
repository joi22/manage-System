import React, { useContext } from 'react'
import FitnessGoalForm from './comp/FitnessGoalForm'
import { UserContext } from "../context/UserContextProvider";

const Profile = () => {
    const { user } = useContext(UserContext);
  return (
   <div className="min-h-screen bg-gray-900 text-white p-6">
      <FitnessGoalForm userId={user._id} />
    </div>
  )
}

export default Profile