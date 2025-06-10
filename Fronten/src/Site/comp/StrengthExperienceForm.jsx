import axios from "axios";
import { useState } from "react";

export default function StrengthExperienceForm({ userId, onNext, onBack }) {
    const [experience, setExperience] = useState("");

    const options = [
        "No experience",
        "Less than 6 months",
        "6–12 months",
        "1–2 years",
        "2+ years"
    ];

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/api/onboarding/experience", { userId, experience });
            onNext();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-white">
            <h2 className="text-xl font-bold mb-4">How much strength training experience do you have?</h2>
            <div className="space-y-3">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setExperience(opt)}
                        className={`w-full text-left p-4 rounded-lg border ${experience === opt
                            ? "bg-blue-600 border-blue-400"
                            : "bg-gray-800 border-gray-700"
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
            <div className="mt-6 flex justify-between">
                <button onClick={onBack} className="bg-gray-600 px-4 py-2 rounded-lg">Back</button>
                <button onClick={handleSubmit} style={{background:"#1B1C2B"}} className=" px-4 py-2 rounded-lg">Next</button>
            </div>
        </div>
    );
}
