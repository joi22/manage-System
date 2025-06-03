import { useState, useContext } from "react";
import axios from "../api/axios";
import { UserContext } from "../context/UserContextProvider";
import { toast } from "sonner";

const WorkoutForm = ({ onWorkoutAdded }) => {
  const { user } = useContext(UserContext);

  const [form, setForm] = useState({
    title: "",
    category: "Strength",
    exercises: [{ name: "", sets: 0, reps: 0, weight: 0, notes: "" }],
  });

  const handleChange = (e, i, field) => {
    const newExercises = [...form.exercises];
    newExercises[i][field] = e.target.value;
    setForm({ ...form, exercises: newExercises });
  };

  const addExercise = () => {
    setForm({
      ...form,
      exercises: [...form.exercises, { name: "", sets: 0, reps: 0, weight: 0, notes: "" }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const workoutData = { ...form };
      const token = localStorage.getItem("resultToken"); // ✅

      const response = await fetch("http://localhost:3000/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ include token
        },
        body: JSON.stringify(workoutData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to add workout");
      }
      onWorkoutAdded();
      setForm({
        title: "",
        category: "strength",
        exercises: [{ name: "", sets: 0, reps: 0, weight: 0, notes: "" }]
      });
    } catch (err) {
      console.error("Error submitting workout:", err);
    }
  };


  const EXERCISE_OPTIONS = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Push-ups",
    "Pull-ups",
    "Running",
    "Cycling",
    "Plank",
    "Shoulder Press",
    "Bicep Curls",
  ];


  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded shadow space-y-4">
      <input
        type="text"
        placeholder="Workout Title"
        className="input"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      {form.exercises.map((ex, i) => (
        <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <select
            className="input"
            value={ex.name}
            onChange={(e) => handleChange(e, i, "name")}
            required
          >
            <option value="">Select Exercise</option>
            {EXERCISE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Sets"
            className="input"
            value={ex.sets}
            onChange={(e) => handleChange(e, i, "sets")}
          />
          <input
            type="number"
            placeholder="Reps"
            className="input"
            value={ex.reps}
            onChange={(e) => handleChange(e, i, "reps")}
          />
          <input
            type="number"
            placeholder="Weight"
            className="input"
            value={ex.weight}
            onChange={(e) => handleChange(e, i, "weight")}
          />
          <input
            placeholder="Notes"
            className="input"
            value={ex.notes}
            onChange={(e) => handleChange(e, i, "notes")}
          />
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" onClick={addExercise} className="bg-blue-500 text-white px-3 py-1 rounded">
          + Add Exercise
        </button>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save Workout
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
