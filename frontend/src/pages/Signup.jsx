import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import FloatingInputHalf from "../components/FloatingInputHalf";
import CustomButton from "../components/CustomButton";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    usertype: "client",
    address: {
      country: "",
      state: "",
      district: "",
      pincode: "",
    }
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/auth/register",
        formData
      );

      if (res.data.success) {
        setSuccess("Account created successfully ");

        localStorage.setItem("token", res.data.token);

        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="w-screen max-h-screen">
      <div className="w-screen h-screen flex flex-col justify-start items-start md:items-center bg-[#F7F8F9] p-6 pt-10">
        <h1 className="text-left text-[28px] leading-9 font-medium font-[Rubik] text-[#1D2226]">
          Create your RedX account
        </h1>

        <form onSubmit={handleSignup} className="mt-8 w-full md:w-80">

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-md">
              {success}
            </div>
          )}

          <FloatingInput
            label="Full Name*"
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />

          <FloatingInput
            label="Phone Number*"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <FloatingInput
            label="Email Address*"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <FloatingInput
            label="Password*"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="pb-2">Address:*</div>
          <div className="grid grid-cols-2 gap-x-4">
            <FloatingInputHalf  label="Country" name="country" value={formData.address.country} onChange={handleAddressChange} />
            <FloatingInputHalf  label="State" name="state" value={formData.address.state} onChange={handleAddressChange} />
            <FloatingInputHalf  label="District" name="district" value={formData.address.district} onChange={handleAddressChange} />
            <FloatingInputHalf  label="Pincode" name="pincode" value={formData.address.pincode} onChange={handleAddressChange} />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-[#1D2226] mb-1">
              User Type*
            </label>
            <select
              name="usertype"
              value={formData.usertype}
              onChange={handleChange}
              className="w-full px-3 py-3 border border-gray-300 rounded-md bg-[#F7F8F9] focus:outline-none focus:border-purple-600"
            >
              <option value="client">Client</option>
              <option value="vendor">Vendor</option>
              <option value="delivery-boy">Delivery Boy</option>
            </select>
          </div>

          <div className="mt-6">
            <CustomButton
              text={loading ? "Creating..." : "Create Account"}
              bgColor="bg-[#6C25FF]"
              textColor="text-white"
              type="submit"
              disabled={loading}
            />
          </div>

          <div className="mt-4 text-sm text-[#1D2226]">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#6C25FF] font-medium cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
