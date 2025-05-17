import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import Counter from "./comp/Counter";

const categories = ["Strength", "Cardio", "Flexibility", "HIIT", "Other"];

const Home = () => {
  const { user } = useContext(UserContext);
  const userId = user?._id;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [exercises, setExercises] = useState([
    { name: "", sets: 0, reps: 0, weight: 0, notes: "" },
  ]);
  const [tags, setTags] = useState("");

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", sets: 0, reps: 0, weight: 0, notes: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please log in to save workouts.");

    const payload = {
      userId,
      title,
      category,
      exercises,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch("http://localhost:3000/api/workout/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
  };

  return (
    <>
    <Counter/>
    {/* <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 space-y-6 mt-8"
    >
      <h2 className="text-2xl font-bold text-center">Create Workout</h2>

      <div>
        <label className="block mb-1 font-medium">Workout Title</label>
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="e.g. Monday Leg Day"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="w-full border rounded px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <label className="block font-medium">Exercises</label>
        {exercises.map((ex, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-gray-50 p-3 rounded-md border"
          >
            <input
              className="border rounded px-3 py-1"
              placeholder="Name"
              value={ex.name}
              onChange={(e) => handleChange(i, "name", e.target.value)}
              required
            />
            <input
              type="number"
              className="border rounded px-3 py-1"
              placeholder="Sets"
              value={ex.sets}
              onChange={(e) => handleChange(i, "sets", e.target.value)}
            />
            <input
              type="number"
              className="border rounded px-3 py-1"
              placeholder="Reps"
              value={ex.reps}
              onChange={(e) => handleChange(i, "reps", e.target.value)}
            />
            <input
              type="number"
              className="border rounded px-3 py-1"
              placeholder="Weight"
              value={ex.weight}
              onChange={(e) => handleChange(i, "weight", e.target.value)}
            />
            <input
              className="border rounded px-3 py-1"
              placeholder="Notes"
              value={ex.notes}
              onChange={(e) => handleChange(i, "notes", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddExercise}
          className="px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded hover:bg-blue-200"
        >
          + Add Exercise
        </button>
      </div>

      <div>
        <label className="block mb-1 font-medium">Tags (comma-separated)</label>
        <input
          className="w-full border rounded px-4 py-2"
          placeholder="e.g. legs, core, HIIT"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save Workout
      </button>
    </form> */}

    </>
  );
};

export default Home;
