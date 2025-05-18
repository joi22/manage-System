import { useEffect, useState } from "react";
import axios from "axios";

export default function ExerciseList() {
  const [exercises, setExercises] = useState([]);
  const [type, setType] = useState("cardio");
  const [loading, setLoading] = useState(true);

  const fetchExercises = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3000/api/exercises?type=${type}`);
      console.log(res.data)
      setExercises(res.data);
    } catch (err) {
      console.error("Failed to fetch exercises", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [type]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-center sm:justify-start">
        <label htmlFor="type" className="font-semibold">Filter by Type:</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border  rounded px-3 py-2"
        >
          <option value="cardio">Cardio</option>
          <option value="strength">Strength</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="stretching">Stretching</option>
          <option value="plyometrics">Plyometrics</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading exercises...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exercises.map((ex, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow border border-gray-200">
              <h2 className="text-lg font-semibold mb-2 capitalize">{ex.name}</h2>
              <p className="text-sm text-gray-600"><strong>Muscle:</strong> {ex.muscle}</p>
              <p className="text-sm text-gray-600"><strong>Equipment:</strong> {ex.equipment}</p>
              <p className="text-sm text-gray-600"><strong>Difficulty:</strong> {ex.difficulty}</p>
              <p className="mt-2 text-sm text-gray-800">{ex.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
