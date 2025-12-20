import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaUserCircle } from "react-icons/fa";

const MyProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
      setProfileImage(loggedInUser.profileImage || "");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const updatedUser = { ...user, profileImage };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert("✅ Profile updated successfully!");
  };

  const handleDelete = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const filteredUsers = users.filter((u) => u.email !== user.email);
    localStorage.setItem("users", JSON.stringify(filteredUsers));
    localStorage.removeItem("loggedInUser");
    alert("❌ Profile deleted successfully!");
    navigate("/register");
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex justify-center items-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-4">
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-xs opacity-80 mt-1">Manage your information</p>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-5">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover shadow-md border-4 border-white -mt-12 bg-gray-100"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-[90px] -mt-12 bg-white rounded-full border-4 border-white" />
              )}

              <label
                htmlFor="fileInput"
                className="mt-2 text-blue-600 hover:text-blue-800 text-sm cursor-pointer font-medium"
              >
                Change Picture
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Mobile Number
                </label>
                <input
                  name="mobile"
                  value={user.mobile}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">
                  Email
                </label>
                <input
                  name="email"
                  value={user.email}
                  readOnly
                  className="border border-gray-200 rounded-lg w-full px-3 py-2 bg-gray-100 text-gray-600 text-sm"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform duration-300"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-semibold hover:scale-[1.02] transition-transform duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
