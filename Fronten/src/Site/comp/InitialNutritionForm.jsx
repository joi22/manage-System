import axios from "axios";
import { useState } from "react";

export default function InitialNutritionForm({ userId, onNext, onSkip }) {
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/nutrition", {
        userId,
        calories: Number(calories),
        protein: Number(protein),
        notes,
      });
      onNext();
    } catch (error) {
      console.error("Error submitting nutrition log:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h2 className="text-xl mb-4">Initial Nutrition Log</h2>
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
        className="input mb-2 w-full border p-2 rounded"
      />
      <input
        type="number"
        placeholder="Protein (g)"
        value={protein}
        onChange={(e) => setProtein(e.target.value)}
        className="input mb-2 w-full border p-2 rounded"
      />
      <textarea
        placeholder="Notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="textarea mb-4 w-full border p-2 rounded"
      />
      <div className="flex justify-between">
        <button onClick={onSkip} className="bg-gray-500 px-4 py-2 rounded text-white">
          Skip
        </button>
        <button onClick={handleSubmit} className="bg-green-600 px-4 py-2 rounded text-white">
          Save & Continue
        </button>
      </div>
    </div>
  );
}
