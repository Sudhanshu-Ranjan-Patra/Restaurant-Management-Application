import React, { useState } from "react";

function RadioButton() {
    const [choice, setChoice] = useState("");
    const radioInputClass = "w-5.5 h-5.5 appearance-none rounded-full border border-[#919191] checked:border-[#6C25FF] relative focus:outline-none checked:before:content-[''] checked:before:w-3.5 checked:before:h-3.5 checked:before:bg-[#6C25FF] checked:before:rounded-full checked:before:absolute checked:before:top-1/2 checked:before:left-1/2 checked:before:-translate-x-1/2 checked:before:-translate-y-1/2";

    return (
        <div className="flex flex-row gap-5 mt-4">
            <label className="flex flex-row gap-2 items-center">
                <input
                    type="radio"
                    name="choice"
                    value="yes"
                    checked={choice === "yes"}
                    onChange={(e) => setChoice(e.target.value)}
                    className={radioInputClass}
                />
                Yes
            </label>

            <label className="flex flex-row gap-2 items-center">
                <input
                    type="radio"
                    name="choice"
                    value="no"
                    checked={choice === "no"}
                    onChange={(e) => setChoice(e.target.value)}
                    className={radioInputClass}
                />
                No
            </label>
        </div>
    );
}

export default RadioButton;