import { useState, useContext } from "react";
import axios from "../api/axios";
import { UserContext } from "../context/UserContextProvider";
import { toast } from "sonner";

const WorkoutForm = ({ onWorkoutAdded }) => {
  const { user, token } = useContext(UserContext);

  const [form, setForm] = useState({
    title: "",
    category: "Strength",
    exercises: [{ name: "", sets: 0, reps: 0, weight: 0, notes: "" }],
  });

  const handleChange = (e, i, field) => {
    const updated = [...form.exercises];
    updated[i][field] = e.target.value;
    setForm({ ...form, exercises: updated });
  };

  const addExercise = () => {
    setForm({
      ...form,
      exercises: [...form.exercises, { name: "", sets: 0, reps: 0, weight: 0, notes: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add workout");
      }

      toast.success("Workout added!");
      onWorkoutAdded?.();
      setForm({
        title: "",
        category: "Strength",
        exercises: [{ name: "", sets: 0, reps: 0, weight: 0, notes: "" }],
      });
    } catch (error) {
      toast.error(error.message || "Error saving workout.");
    }
  };

  const EXERCISE_OPTIONS = [
    "Bench Press", "Squat", "Deadlift", "Push-ups", "Pull-ups",
    "Running", "Cycling", "Plank", "Shoulder Press", "Bicep Curls"
  ];

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-[#222230] rounded-lg shadow-md space-y-6">
      <div>
        <label className="block font-semibold mb-1">Workout Title</label>
        <input
          type="text"
          placeholder="e.g., Upper Body Day"
          className="input input-bordered w-full"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block  font-semibold mb-1">Category</label>
        <select
          className=" bg-[#222230] w-50 border-2 border-solid input  "
          value={form.category || "Strength"}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="Strength">Strength</option>
          <option value="Cardio">Cardio</option>
          <option value="Flexibility">Flexibility</option>
          <option value="HIIT">HIIT</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {form.exercises.map((ex, i) => (
        <div key={i} className="bg-[#222230] p-4 rounded-md shadow-inner space-y-3">
          <h4 className="font-semibold text-gray-700">Exercise {i + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Exercise Name</label>
              <select
                className="bg-[#222230] w-50 border-2 border-solid input"
                value={ex.name}
                onChange={(e) => handleChange(e, i, "name")}
                required
              >
                <option value="">-- Select --</option>
                {EXERCISE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Sets</label>
              <input
                type="number"
                min={0}
                placeholder="e.g., 3"
                className="input input-bordered w-full"
                value={ex.sets}
                onChange={(e) => handleChange(e, i, "sets")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Reps</label>
              <input
                type="number"
                min={0}
                placeholder="e.g., 10"
                className="input input-bordered w-full"
                value={ex.reps}
                onChange={(e) => handleChange(e, i, "reps")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Weight (kg)</label>
              <input
                type="number"
                min={0}
                placeholder="e.g., 50"
                className="input input-bordered w-full"
                value={ex.weight}
                onChange={(e) => handleChange(e, i, "weight")}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Notes</label>
              <input
                type="text"
                placeholder="Optional notes (e.g., form tip)"
                className="input input-bordered w-full"
                value={ex.notes}
                onChange={(e) => handleChange(e, i, "notes")}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={addExercise}
          className="btn btn-outline btn-info"
        >
          + Add Exercise
        </button>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Save Workout
        </button>
      </div>
    </form>
  );
};

export default WorkoutForm;
