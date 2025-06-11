import { useState } from "react";
import axios from "axios";

import { useRef } from "react";

const ProfileEditForm = ({ user, onUpdate }) => {
    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();

    const [profileImg, setProfileImg] = useState(null);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(); // ✅ CORRECTLY initialize FormData first

        formData.append("firstname", firstnameRef.current.value);
        formData.append("lastname", lastnameRef.current.value);
        formData.append("email", emailRef.current.value);

        if (profileImg) {
            formData.append("profile_img", profileImg); // ✅ Correct field name
        }

        try {
            const res = await axios.put(
                `http://localhost:3000/api/user/update/${user._id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            onUpdate(res.data.updatedUser);
            setSuccess("Profile updated successfully!");
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to update profile.");
        }
    };

    return (
        <form onSubmit={handleSubmit} method="post" className="space-y-4 bg-white p-6 rounded-lg text-black shadow">
            <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
            {success && <p className="text-green-600">{success}</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div>
                <label className="block font-semibold">First Name</label>
                <input
                    type="text"
                    defaultValue={user.firstname}
                    ref={firstnameRef}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div>
                <label className="block font-semibold">Last Name</label>
                <input
                    type="text"
                    defaultValue={user.lastname}
                    ref={lastnameRef}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div>
                <label className="block font-semibold">Email</label>
                <input
                    type="email"
                    defaultValue={user.email}
                    ref={emailRef}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div>
                <label className="block font-semibold">Profile Image</label>
                <input
                    type="file"
                    name="profile_img" // optional but matches your backend
                    onChange={(e) => setProfileImg(e.target.files[0])}
                    className="block"
                />
            </div>
            <button
                type="submit"
                className="bg-[#e60076] text-white py-2 px-6 rounded hover:bg-[#cc005f]"
            >
                Update Profile
            </button>
        </form>
    );
};


export default ProfileEditForm;
