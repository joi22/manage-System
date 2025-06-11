// src/pages/ProfileEditPage.jsx
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/UserContextProvider";
import ProfileEditForm from "./pages/ProfileEditForm";

const ProfileEditPage = () => {
  const { id } = useParams();
  const { user, login } = useContext(UserContext);

  const handleUpdate = (updatedUser) => {
    login({ result: updatedUser, resultToken: localStorage.getItem("token") });
  };

  if (!user || user._id !== id) {
    return <div className="text-white p-6">Unauthorized or user not found.</div>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-xl mx-auto">
        <ProfileEditForm user={user} onUpdate={handleUpdate} />
      </div>
    </div>
  );
};

export default ProfileEditPage;
