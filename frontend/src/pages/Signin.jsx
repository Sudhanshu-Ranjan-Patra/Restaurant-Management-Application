import React from "react";
import FloatingInput from "../components/FloatingInput";
import CustomButton from "../components/CustomButton";

function Signin() {
  return (
    <div className="w-screen max-h-screen">
      <div className="w-screen h-screen flex flex-col justify-start items-start md:items-center bg-[#F7F8F9] p-6 pt-10">
        <h1 className="text-left text-[28px] leading-9 font-medium font-[Rubik] text-[#1D2226] w-47 h-17.25">
          Signin to your RedX account
        </h1>

        <p className="text-left text-[18px] leading-6.5 font-normal font-[Rubik] text-[#1D2226] opacity-60 w-58 h-12 pt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        </p>
        <div className="mt-12">
          <FloatingInput label="Email Address" type="email" name="name" />
          <FloatingInput label="Password" type="email" name="name" />
        </div>

        <CustomButton text=" Login" bgColor="bg-[#CBCBCB]" textColor="text-white" to="/profile" />
      </div>
    </div>
  );
}

export default Signin;