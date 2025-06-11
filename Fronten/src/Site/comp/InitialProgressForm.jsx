import axios from "axios";
import { useState } from "react";

export default function InitialProgressForm({ userId, onNext, onSkip }) {
  const [weightValue, setWeightValue] = useState("");
  const [unit, setUnit] = useState("kg");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/progress",
        {
          userId,
          weight: `${weightValue}`,
          notes,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onNext(); // Move to the next step
    } catch (err) {
      console.error("Error submitting progress", err);
    }
  };

  return (
    <div className="p-6 rounded-lg  shadow  max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Initial Progress</h2>

      {/* Weight input */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Weight</label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Enter weight"
            value={weightValue}
            onChange={(e) => setWeightValue(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border rounded p-2"
          >
            <option value="kg">kg</option>
            <option value="gm">gm</option>
            <option value="lb">lb</option>
          </select>
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Notes</label>
        <textarea
          placeholder="Write notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded p-2 w-full h-24"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4">
        <button
          onClick={onSkip}
          className="px-4 py-2 rounded border border-gray-400 text-gray-600 hover:bg-gray-100"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          style={{ background: "#e60076" }}
          className="px-4 py-2 rounded text-white hover:bg-pink-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
