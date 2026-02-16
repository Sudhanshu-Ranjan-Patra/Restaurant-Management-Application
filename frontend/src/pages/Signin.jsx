import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import CustomButton from "../components/CustomButton";

function Signin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:4000/api/v1/auth/login",
                formData
            );

            if (res.data.success) {
                console.log("Login Successful ✅");

                // Save token
                localStorage.setItem("token", res.data.token);

                // Navigate to profile/dashboard
                navigate("/profile");
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            console.log(error.response?.data);
            alert("Login Failed: "+ error.response?.data.message);
        }
    };

    return (
        <div className="w-screen max-h-screen">
            <div className="w-screen h-screen flex flex-col justify-start items-start md:items-center bg-[#F7F8F9] p-6 pt-10">
                <h1 className="text-left text-[28px] leading-9 font-medium font-[Rubik] text-[#1D2226] w-47 h-17.25">
                    Signin to your RedX account
                </h1>

                <p className="text-left text-[18px] leading-6.5 font-normal font-[Rubik] text-[#1D2226] opacity-60 w-58 h-12 pt-4">
                    Just enjoy your moment & take your taste to the next level
                </p>

                <form
                    className="mt-12 w-full md:w-80"
                    onSubmit={e => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    autoComplete="on"
                >
                    <FloatingInput
                        label="Email Address"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <div className="hidden text-sm text-red-600 pb-2" >User Not Found!</div>
                    <FloatingInput
                        label="Password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <div className="w-full md:w-80 mt-6">
                        <CustomButton
                            text="Login"
                            bgColor="bg-[#6C25FF]"
                            textColor="text-white"
                            // onClick={handleLogin}  // Not needed, handled by form submit
                            type="submit"
                        />
                    </div>

                    <div className="mt-4 text-sm text-[#1D2226]">
                        Don’t have an account?{" "}
                        <span
                            onClick={() => navigate("/signup")}
                            className="text-[#6C25FF] font-medium cursor-pointer hover:underline"
                        >
                            Signup
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signin;
