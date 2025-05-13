import React, { useContext, useState } from "react";
import { UserContext } from "../UserContext/UserContextProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Username: user?.Username || "",
    profile_imag: user?.profile_imag || "", // URL or base64
    Password: "",
  });
  const [imagePreview, setImagePreview] = useState(user?.profile_imag || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_imag: reader.result, // base64 string
        }));
        setImagePreview(reader.result); // update preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(user._id,".>>>>>>>>>>")

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          
        },
        body: JSON.stringify(formData),
      });

      const resp_data = res.json();
      console.log(resp_data)
      // Check if response has content
      const contentType = res.headers.get("content-type");
      let data = {};


      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      window.location.reload(); // Or use context
    } catch (err) {
      console.error("Update failed", err.message);
      alert(err.message);
    }
  };
  


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 flex justify-center items-start sm:py-10">
      <div className="w-full max-w-md border border-[#9A282B] rounded-2xl shadow-md p-6 space-y-6 bg-white">
        <div className="flex flex-col items-center space-y-4 text-center">
          <img
            src={imagePreview || "default-avatar.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-[#9A282B] object-cover"
          />
          <h2 className="text-2xl font-bold text-[#9A282B]">User Profile</h2>
          <p className="text-sm text-[#9A282B] bg-[#fdf2f3] px-3 py-1 rounded-full uppercase tracking-wide">
            {user?.Role}
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <label className="block text-sm font-medium text-[#9A282B] mb-1">
              Username
            </label>
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9A282B] mb-1">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#9A282B] mb-1">
              New Password
            </label>
            <input
              type="password"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#9A282B] text-white py-2 rounded-md hover:bg-[#801d21] transition"
          >
            Update Profile
          </button>
        </form>

        <button
          onClick={handleLogout}
          className="w-full mt-2 border border-[#9A282B] text-[#9A282B] py-2 rounded-md hover:bg-red-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </div>

  );
};

export default Profile;
