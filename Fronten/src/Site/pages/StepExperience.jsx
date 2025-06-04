import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const options = [
    "None",
    "Beginner (0-6 months)",
    "Intermediate (6-12 months)",
    "Advanced (1+ years)"
];

export default function StepExperience() {
    const userId = "12345";
    const [selected, setSelected] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/api/experience", {
                userId,
                experience: selected
            });
            navigate("/onboarding/routine");
        } catch (err) {
            alert("Failed to save experience");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-white">
            <h2 className="text-xl font-bold mb-4">How much strength training experience do you have?</h2>
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
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
                Next
            </button>
        </div>
    );
}
