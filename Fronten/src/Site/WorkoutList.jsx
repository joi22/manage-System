import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";

const WorkoutList = ({ refresh }) => {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useContext(UserContext);

  const fetchWorkouts = async () => {
    try {
      const res = await axios.get(`http://localhost:5173/workouts/${user._id}`);
      setWorkouts(res.data.data || []);
    } catch (err) {
      console.error("Error fetching workouts:", err.message);
    }
  };

  useEffect(() => {
    if (user?._id) fetchWorkouts();
  }, [refresh, user]);

  return (
    <div className="mt-8 space-y-4">
      {workouts.map((w) => (
        <div key={w._id} className=" p-4 rounded shadow">
          <h3 className="font-bold text-lg">{w.title}</h3>
          <p className="text-sm text-gray-500">Category: {w.category}</p>
          <ul className="mt-2 space-y-1">
            {w.exercises.map((ex, i) => (
              <li key={i} className="text-sm">
                {ex.name} - {ex.sets}x{ex.reps} @ {ex.weight}kg
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutList;
