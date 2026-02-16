import { useState } from "react";

function FloatingInputHalf({ label, type = "text", name, value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-screen max-w-[335px] mb-3">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "" ? true : false)}
        placeholder=""
        className="w-1/2 px-3 py-3 border border-gray-300 rounded-md bg-[#F7F8F9] focus:outline-none focus:border-purple-600"
        autoComplete={type === "password" ? "current-password" : undefined}
      />
      <label
        htmlFor={name}
        className={`absolute left-3 transition-all duration-200 pointer-events-none
        ${
          focused
            ? "text-xs -top-2 text-[#6C25FF] bg-[#F7F8F9] px-1"
            : "text-gray-500 top-3"
        }`}>
        {label}
      </label>
    </div>
  );
}

export default FloatingInputHalf;