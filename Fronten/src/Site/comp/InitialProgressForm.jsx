import axios from "axios";
import { useState } from "react";

export default function InitialProgressForm({ userId, onNext, onSkip }) {
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");

const handleSubmit = async () => {
  try {

    await axios.post(
      "http://localhost:3000/api/progress",
      {
        userId,
        weight: Number(weight),
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
    <div className="p-4  rounded shadow-md">
      <h2 className="text-xl mb-4">Initial Progress</h2>
      <input
        type="number"
        placeholder="Weight"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="input mb-2"
      />
      <textarea
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="textarea mb-4"
      />
      <div className="flex justify-between">
        {/* <button onClick={onSkip} className="btn-secondary">Skip</button> */}
        <button onClick={handleSubmit} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
