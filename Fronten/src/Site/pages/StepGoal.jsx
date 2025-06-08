import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const goals = [
    "Get Stronger",
    "Build Muscle Mass",
    "Get lean and defined",
    "Reduce bodyweight",
    "Improve health and wellness",
    "Improve sports performance",
    "Other"
];

export default function StepGoal() {
    const userId = "12345"; // Replace with real userId from auth
    const [selected, setSelected] = useState("");
    const [customGoal, setCustomGoal] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const finalGoal = selected === "Other" ? customGoal : selected;
        console.log(finalGoal,"====")
        try {
            await axios.post("http://localhost:3000/api/goals", {
                userId,
                goal: JSON.stringify(finalGoal),    
            });
            navigate("/onboarding/experience");
        } catch (err) {
            console.error(err);
            alert("Failed to save goal");
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/api/onboarding/goals/${userId}`)
            .then(res => {
                if (res.data?.goal) setSelected(res.data.goal);
            })
            .catch(() => console.log("No previous goal"));
    }, []);

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
                Next
            </button>
        </div>
    );
}
