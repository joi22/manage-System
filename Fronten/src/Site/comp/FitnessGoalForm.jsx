import { useState, useEffect } from "react";
import axios from "axios";

const goals = [
    "Get Strongers",
    "Build Muscle Mass",
    "Get lean and defined",
    "Reduce bodyweight",
    "Improve health and wellness",
    "Improve sports performance",
    "Other"
];

export default function FitnessGoalForm({ userId, onNext }) {
    const [selected, setSelected] = useState("");
    const [customGoal, setCustomGoal] = useState("");

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/onboarding/goals/${userId}`);
                console.log(res)
                if (res.data?.goal) {
                    setSelected(res.data.goal);
                }
            } catch (err) {
                console.error("Error fetching saved goal");
            }
        };

        fetchGoal();
    }, [userId]);

    const handleSubmit = async () => {
        const finalGoal = selected === "Other" ? customGoal : selected;

        try {
            await axios.post("http://localhost:3000/api/onboarding/goals", {
                userId,
                goal: finalGoal,
            });
            onNext(); // Move to next step
        } catch (err) {
            console.error(err);
            alert("Error saving goal");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-white">
            <h2 className="text-xl font-bold mb-4">What is your top fitness goal?</h2>
            <div className="space-y-3">
                {goals.map((goal) => (
                    <button
                        key={goal}
                        onClick={() => setSelected(goal)}
                        className={`w-full text-left p-4 rounded-lg border ${selected === goal
                            ? "bg-blue-600 border-blue-400"
                            : "bg-gray-800 border-gray-700"
                            }`}
                    >
                        {goal}
                    </button>
                ))}

                {selected === "Other" && (
                    <input
                        type="text"
                        placeholder="Enter your custom goal"
                        value={customGoal}
                        onChange={(e) => setCustomGoal(e.target.value)}
                        className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white"
                    />
                )}
            </div>

            <button
                onClick={handleSubmit}
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg"
            >
                Save Goal
            </button>
        </div>
    );
}
