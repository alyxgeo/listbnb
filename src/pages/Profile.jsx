import React, { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phone: "",
    location: "",
    photo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await api.get("/api/profile");
        setProfile(res.data); // Assuming API returns user data
      } catch (error) {
        setError("Failed to load profile.");
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);


  function handleChange(e) {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  }


  async function updateProfile(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/api/profile", profile);
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-full p-6 rounded-xl" style={{ boxShadow: "0px 1px 80px 12px #1A28440F" }}>
      <div className="w-[544px] m-auto pt-[60px] flex flex-col gap-[22px]">

        {error && <p className="text-red-500">{error}</p>}
        {loading && <p className="text-gray-500">Loading...</p>}

        <form onSubmit={updateProfile} className="flex flex-col gap-4">
          <InputField label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} required />
          <InputField label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} required />
          <InputField label="Email" name="email" type="email" value={profile.email} onChange={handleChange} required />
          <InputField label="Username" name="username" value={profile.username} onChange={handleChange} required />
          <InputField label="Photo" name="photo" value={profile.photo} onChange={handleChange} />
          <InputField label="Location" name="location" value={profile.location} onChange={handleChange} />
          <InputField label="Contact Number" name="phone" value={profile.phone} onChange={handleChange} />

          <button
            type="submit"
            className="w-full px-4 py-2 rounded-3xl h-[50px] bg-[#F50963] text-white font-semibold text-sm"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};


const InputField = ({ label, name, type = "text", value, onChange, required }) => (
  <div className="flex flex-col w-full">
    <label className="text-gray-700 font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={`Enter ${label}`}
      className="pl-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      required={required}
    />
  </div>
);

export default Profile;
