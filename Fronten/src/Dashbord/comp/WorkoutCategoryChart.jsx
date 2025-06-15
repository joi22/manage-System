import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const WorkoutCategoryChart = ({ workouts }) => {
  if (!workouts || workouts.length === 0) return <div className="bg-black p-4 rounded shadow">No workout data</div>;

  // Count categories
  const categoryCounts = workouts.reduce((acc, workout) => {
    const category = workout.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(categoryCounts).map((category) => ({
    name: category,
    count: categoryCounts[category],
  }));

  return (
  <div className="bg-black shadow-md border border-black-500 rounded-xl p-5">
  <h3 className="text-lg font-semibold text-gray-700 mb-4">Workout Categories</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WorkoutCategoryChart;
