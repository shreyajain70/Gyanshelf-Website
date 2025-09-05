import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../../api";
import { SpinnerButton } from "../../SpinnerButton";

export const UpdateProfile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // For SpinnerButton
  const [passwordLoading, setPasswordLoading] = useState(false); // For SpinnerButton (password)
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userId = localStorage.getItem("userId");

  // ✅ Fetch user details
  useEffect(() => {
    if (!userId) {
      setMessage("⚠️ User not logged in");
      setLoading(false);
      return;
    }
    api.get(`/UpdateProfile/${userId}`)
      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setMessage("❌ Failed to fetch user details");
        setLoading(false);
      });
  }, [userId]);

  // Handlers
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handlePasswordChange = (e) =>
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleUpdate = () => {
    setSaving(true); // Start spinner
    api.put(`/UpdateProfile/${userId}`, formData)
      .then((res) => {
        setUser(res.data.user);
        setMessage("✅ Profile updated successfully!");
      })
      .catch(() => setMessage("❌ Failed to update profile"))
      .finally(() => setSaving(false)); // Stop spinner
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("❌ New password & confirm password do not match!");
      return;
    }
    setPasswordLoading(true); // Start spinner
    api.put(`/UpdateProfile/${userId}/password`, { newPassword: passwordData.newPassword })
      .then(() => {
        setMessage("✅ Password updated successfully!");
        setPasswordData({ newPassword: "", confirmPassword: "" });
      })
      .catch(() => setMessage("❌ Failed to update password"))
      .finally(() => setPasswordLoading(false)); // Stop spinner
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {/* Tabs */}
      <div className="tab-buttons">
        <button
          className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          ✏️ Edit Profile
        </button>
        <button
          className={`tab-btn ${activeTab === "password" ? "active" : ""}`}
          onClick={() => setActiveTab("password")}
        >
          🔒 Change Password
        </button>
      </div>
      {/* Profile Form */}
      {activeTab === "profile" && (
        <div className="profile-form fade-in">
          {[{ label: "First Name", name: "FirstName", type: "text" },
            { label: "Last Name", name: "LastName", type: "text" },
            { label: "Date of Birth", name: "DOB", type: "date" },
            { label: "Mobile Number", name: "MobileNumber", type: "number" },
            { label: "Email ID", name: "EmailID", type: "email" },
            { label: "Village/Town", name: "VillageTown", type: "text" },
            { label: "Post Office", name: "PostOffice", type: "text" },
            { label: "Tehsil", name: "Tehsil", type: "text" },
            { label: "District", name: "Distt", type: "text" },
            { label: "State", name: "State", type: "text" },
            { label: "Pin Code", name: "PinCode", type: "number" }].map((field, i) => (
            <div key={i} className="form-group">
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="form-group">
            <label>Gender</label>
            <select name="Gender" value={formData.Gender || ""} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <SpinnerButton
            className="save-btn"
            loading={saving}
            onClick={handleUpdate}
            text="Save Changes"
          >Submit</SpinnerButton>
          {message && activeTab === "profile" && (
            <p className="profile-message">{message}</p>
          )}
        </div>
      )}
      {/* Password Form */}
      {activeTab === "password" && (
        <div className="profile-form fade-in">
          <div className="form-group password-field">
            <label>New Password</label>
            <div className="input-wrapper">
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword
                  ? <AiOutlineEyeInvisible size={20} />
                  : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>
          <div className="form-group password-field">
            <label>Confirm New Password</label>
            <div className="input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword
                  ? <AiOutlineEyeInvisible size={20} />
                  : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>
          <SpinnerButton
            className="save-btn"
            loading={passwordLoading}
            onClick={handlePasswordUpdate}
            text="Update Password"
          >Submit</SpinnerButton>
          {message && activeTab === "password" && (
            <p className="profile-message">{message}</p>
          )}
        </div>
      )}
    </div>
  );
};
