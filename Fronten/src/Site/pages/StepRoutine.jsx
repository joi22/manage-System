import { useState } from "react";
import axios from "axios";

const options = [
    "I do full body workouts 2–3 times per week",
    "I train upper and lower body separately 3–5 times per week",
    "I train individual muscle groups (e.g., back, chest, arms) 4–6 times per week",
    "I’m just starting out",
    "Other"
];

export default function StepRoutine() {
    const userId = "12345";
    const [selected, setSelected] = useState("");
    const [custom, setCustom] = useState("");

    const handleSubmit = async () => {
        const finalRoutine = selected === "Other" ? custom : selected;

        try {
            await axios.post("http://localhost:3000/api/routine", {
                userId,
                routine: finalRoutine
            });
            alert("Onboarding complete!");
            // Optionally redirect to dashboard or summary page
        } catch (err) {
            alert("Failed to save routine");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-white">
            <h2 className="text-xl font-bold mb-4">Which best describes your current strength training routine?</h2>
            <div className="space-y-3">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => setSelected(option)}
                        className={`w-full text-left p-4 rounded-lg border ${selected === option
                            ? "bg-blue-600 border-blue-400"
                            : "bg-gray-800 border-gray-700"
                            }`}
                    >
                        {option}
                    </button>
                ))}

                {selected === "Other" && (
                    <input
                        type="text"
                        placeholder="Enter your custom routine"
                        value={custom}
                        onChange={(e) => setCustom(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white"
                    />
                )}
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
                Finish
            </button>
        </div>
    );
}
