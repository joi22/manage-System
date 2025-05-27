// src/components/comp/ProgressChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ProgressChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No progress data to display.</p>;
  }

  // Sort and format data by date
  const chartData = data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      weight: item.weight,
      bodyFat: item.bodyFat || null, // Optional if available
    }));

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Progress Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#4f46e5" name="Weight (kg)" />
          {chartData.some(d => d.bodyFat) && (
            <Line type="monotone" dataKey="bodyFat" stroke="#f97316" name="Body Fat (%)" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;
