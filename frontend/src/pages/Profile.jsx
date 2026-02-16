import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";

function Profile() {
  const navigate = useNavigate();

  // Optional: If you saved user info in localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen bg-[#F7F8F9] flex flex-col items-center p-6 pt-10">
      <div className="w-full max-w-80 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-[22px] font-medium text-[#1D2226] mb-4">
          Account Settings
        </h2>

        <div className="space-y-3 text-[14px] text-[#1D2226]">
          <p>
            <strong>Name:</strong> {user?.name || "User Name"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "user@email.com"}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone || "Not Provided"}
          </p>
          <p>
            <strong>Company:</strong> {user?.company || "Not Provided"}
          </p>
        </div>

        <div className="mt-6">
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
