// src/pages/WorkoutList.jsx
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/UserContextProvider';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workout', {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error('Failed to fetch workouts:', error);
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <ul className="space-y-4">
          {workouts.map((workout) => (
            <li
              key={workout._id}
              className="p-4 border rounded-md shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{workout.title}</h3>
              <p>Category: {workout.category}</p>
              <p>Sets: {workout.sets}</p>
              <p>Reps: {workout.reps}</p>
              <p className="text-sm text-gray-500">
                Date: {new Date(workout.date).toLocaleDateString()}
              </p>
              {/* 🗑️ Delete/Edit buttons can go here */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkoutList;
