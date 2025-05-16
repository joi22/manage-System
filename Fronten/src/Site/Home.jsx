import React from 'react'
import { useState } from "react";

const categories = ["Strength", "Cardio", "Flexibility", "HIIT", "Other"];

const Home = ({userId}) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [exercises, setExercises] = useState([{ name: "", sets: 0, reps: 0, weight: 0, notes: "" }]);
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
    const payload = {
      userId,
      title,
      category,
      exercises,
      tags: tags.split(",").map(tag => tag.trim()),
    };

    const res = await fetch("http://localhost:3000/api/workout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    console.log(result);
  };

 return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input placeholder="Workout Title" value={title} onChange={e => setTitle(e.target.value)} required />
      
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {categories.map(cat => (
          <option key={cat}>{cat}</option>
        ))}
      </select>

      {exercises.map((ex, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          <input placeholder="Name" value={ex.name} onChange={e => handleChange(i, "name", e.target.value)} required />
          <input type="number" placeholder="Sets" value={ex.sets} onChange={e => handleChange(i, "sets", e.target.value)} />
          <input type="number" placeholder="Reps" value={ex.reps} onChange={e => handleChange(i, "reps", e.target.value)} />
          <input type="number" placeholder="Weight" value={ex.weight} onChange={e => handleChange(i, "weight", e.target.value)} />
          <input placeholder="Notes" value={ex.notes} onChange={e => handleChange(i, "notes", e.target.value)} />
        </div>
      ))}

      <button type="button" onClick={handleAddExercise}>Add Exercise</button>
      <input placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
      <button type="submit">Save Workout</button>
    </form>
  );
}

export default Home