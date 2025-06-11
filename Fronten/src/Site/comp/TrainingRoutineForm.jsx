import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ FIXED: Correct import

export default function TrainingRoutineForm({ userId, onBack, onNext }) {
    const [routine, setRoutine] = useState("");
    const navigate = useNavigate(); // ✅ FIXED: Add parentheses to invoke the hook

    const options = [
        "No routine",
        "1–2 days/week",
        "3–4 days/week",
        "5+ days/week"
    ];

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/api/onboarding/routine", { userId, routine });
            onNext()
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-white">
            <h2 className="text-xl font-bold mb-4">Which best describes your current strength training routine?</h2>
            <div className="space-y-3">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => setRoutine(opt)}
                        className={`w-full text-left p-4 rounded-lg border ${routine === opt
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
                <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded-lg">Next</button>
            </div>
        </div>
    );
}
