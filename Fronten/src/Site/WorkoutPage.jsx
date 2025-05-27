import { useState } from "react";
import WorkoutForm from "./WorkoutForm";
import WorkoutList from "./WorkoutList";

const WorkoutPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Workout Tracker</h1>
      <WorkoutForm onWorkoutAdded={() => setRefresh(!refresh)} />
      <WorkoutList refresh={refresh} />
    </div>
  );
};

export default WorkoutPage;
