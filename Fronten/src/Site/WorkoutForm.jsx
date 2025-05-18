import { useState } from "react";
import axios from "../api/axios";

const WorkoutForm = ({ onWorkoutAdded }) => {
  const [form, setForm] = useState({
    userId: "", // Should come from auth/user context
    title: "",
    category: "strength",
    tags: [],
    exercises: [{ name: "", sets: 0, reps: 0, weight: 0, notes: "" }]
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
      await axios.post("/workouts", form);
      onWorkoutAdded();
      setForm({ ...form, title: "", exercises: [] });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" p-6 rounded shadow space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="input"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      {form.exercises.map((ex, i) => (
        <div key={i} className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <input
            placeholder="Exercise"
            className="input"
            value={ex.name}
            onChange={(e) => handleChange(e, i, "name")}
          />
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
      <button type="button" onClick={addExercise} className="bg-blue-500 text-white px-3 py-1 rounded">
        + Add Exercise
      </button>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Save Workout
      </button>
    </form>
  );
};

export default WorkoutForm;
