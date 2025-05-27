const WorkoutCard = ({ workouts = [] }) => {
  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-2">Recent Workouts</h3>
      {workouts.length === 0 ? (
        <p>No recent workouts</p>
      ) : (
        workouts.slice(0, 3).map((workout) => (
          <div key={workout._id} className="border-b py-2">
            <div className="font-medium">{workout.title}</div>
            <div className="text-sm text-gray-600">{workout.category}</div>
            <div className="text-xs">{new Date(workout.createdAt).toLocaleDateString()}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default WorkoutCard;
