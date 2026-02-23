import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import API from "../api/axios";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const { data } = await API.get("/user/getUser");
        if (data.success) {
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: {
          ...(prev.address || {}),
          [key]: value,
        },
      }));
    } else {
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const payload = {
        userName: user.userName,
        phone: user.phone,
        address: user.address,
      };
      const { data } = await API.put("/user/updateUser", payload);
      if (data.success) {
        setSuccess("Profile updated successfully");
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      console.log(err);
      setError("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F8F9]">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-[#F7F8F9]">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-4">Unable to load profile. Please login again.</p>
          <CustomButton
            text="Go to Login"
            bgColor="bg-[#6C25FF]"
            textColor="text-white"
            onClick={() => navigate("/login")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen bg-[#F7F8F9] flex flex-col items-center p-6 pt-10">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6">
        <h2 className="text-[22px] font-medium text-[#1D2226] mb-4">
          Account Settings
        </h2>

        {error && (
          <div className="mb-3 p-2 text-sm text-red-700 bg-red-100 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-3 p-2 text-sm text-green-700 bg-green-100 rounded">
            {success}
          </div>
        )}

        <div className="space-y-4 text-[14px] text-[#1D2226]">
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              name="userName"
              value={user.userName || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-3 py-2 border rounded-md bg-gray-100 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Address</label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="address.country"
                placeholder="Country"
                value={user.address?.country || ""}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                value={user.address?.state || ""}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="address.district"
                placeholder="District"
                value={user.address?.district || ""}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              />
              <input
                type="text"
                name="address.pincode"
                placeholder="Pincode"
                value={user.address?.pincode || ""}
                onChange={handleChange}
                className="px-3 py-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <CustomButton
            text={saving ? "Saving..." : "Save Changes"}
            bgColor="bg-[#6C25FF]"
            textColor="text-white"
            onClick={handleSave}
            disabled={saving}
          />
          <CustomButton
            text="Logout"
            bgColor="bg-red-500"
            textColor="text-white"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

