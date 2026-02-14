import React from "react";
import { Link } from "react-router-dom";

function CustomButton({ text, bgColor = "bg-blue-500", textColor = "text-white" ,to="/"}) {
  return (
    <>
    <div className="flex flex-col items-start justify-start gap-4 w-full max-w-[335px] mb-3">
      <Link
        to={to}
        className={`w-full h-[46px] ${bgColor} rounded-[6px] flex justify-center items-center text-[16px] leading-[17px] font-medium font-[Rubik] ${textColor} cursor-pointer`}>
        {text}
      </Link>
    </div>
    </>
  );
}

export default CustomButton;