import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/workout', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setWorkouts(data.workouts || []);
        } else {
          console.error('Error fetching workouts:', data.message);
        }

      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user, token]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul className="space-y-4">
          {workouts.map((workout) => (
            <li key={workout._id} className="p-4 border rounded-md shadow-md bg-white">
              <h3 className="text-lg font-semibold">{workout.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Category: {workout.category}</p>

              <div className="space-y-1">
                {workout.exercises.map((ex, index) => (
                  <div key={index} className="text-sm text-gray-700">
                    • {ex.name} — {ex.sets} sets x {ex.reps} reps @ {ex.weight}kg
                    {ex.notes && <span className="text-gray-500"> ({ex.notes})</span>}
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Date: {new Date(workout.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
