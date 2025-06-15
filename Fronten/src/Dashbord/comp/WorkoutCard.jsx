const WorkoutCard = ({ workouts = [] }) => {
  return (
 <div className="bg-black shadow-md border rounded-xl p-6">
  <h3 className="text-lg font-semibold mb-4">Recent Workouts</h3>
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
