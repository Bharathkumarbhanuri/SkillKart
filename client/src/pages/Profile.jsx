import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setShowLoginModal(true);
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // If profilePic exists, prepend server URL
        if (res.data.profilePic) {
          res.data.profilePic = `${API_BASE_URL}/uploads/profilePics/${res.data.profilePic}`;
        }

        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        setShowLoginModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, profilePic: file }));
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("education", user.education);
      if (user.profilePic instanceof File) {
        formData.append("profilePic", user.profilePic);
      }

      const res = await axios.put(`${API_BASE_URL}/api/users/profile`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");

      // Refetch user after update to get server image URL
      const refreshed = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (refreshed.data.profilePic) {
        refreshed.data.profilePic = `${API_BASE_URL}/uploads/profilePics/${refreshed.data.profilePic}`;
      }

      setUser(refreshed.data);
      setEditMode(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Try again.");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  }

  if (showLoginModal) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'
        onClick={(e) => { if (e.target === e.currentTarget) setShowLoginModal(false); }}>
        <div className='bg-white p-8 rounded-lg text-center'>
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="mb-4">You need to log in to view your profile.</p>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => navigate("/")}
              className="bg-gray-300 py-2 px-3 rounded-lg hover:bg-gray-400 transition"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate("/login", { state: { from: location.pathname } })}
              className="bg-blue-600 text-white py-2 px-10 rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={user.profilePic ? (user.profilePic instanceof File ? URL.createObjectURL(user.profilePic) : user.profilePic) : "https://via.placeholder.com/150?text=Profile"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {editMode && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="mt-2 text-sm"
              />
            )}
          </div>

          <div className="flex-1 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {editMode ? "Cancel" : "Edit"}
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block font-medium text-gray-700">Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="mt-1">{user.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block font-medium text-gray-700">Email</label>
                {editMode ? (
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="mt-1">{user.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block font-medium text-gray-700">Phone</label>
                {editMode ? (
                  <input
                    type="text"
                    name="phone"
                    value={user.phone || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="mt-1">{user.phone || "-"}</p>
                )}
              </div>

              {/* Education */}
              <div>
                <label className="block font-medium text-gray-700">Education</label>
                {editMode ? (
                  <input
                    type="text"
                    name="education"
                    value={user.education || ""}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                ) : (
                  <p className="mt-1">{user.education || "-"}</p>
                )}
              </div>
            </div>

            {editMode && (
              <button
                onClick={handleSave}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
