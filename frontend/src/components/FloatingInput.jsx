import { useState } from "react";

function FloatingInput({ label, type = "text", name }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="relative w-screen max-w-[335px] mb-3">
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "" ? true : false)}
        placeholder=""
        className="w-full px-3 py-3 border border-gray-300 rounded-md bg-[#F7F8F9] focus:outline-none focus:border-purple-600"
      />
      <label
        htmlFor="name"
        className={`absolute left-3 transition-all duration-200 pointer-events-none
        ${
          focused
            ? "text-xs -top-2 text-[#6C25FF] bg-[#F7F8F9] px-1"
            : "text-gray-500 top-3"
        }`}>
        {" "}
        {label}
      </label>
    </div>
  );
}

export default FloatingInput;