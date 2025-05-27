// src/components/comp/NutritionMacrosChart.jsx
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Carbs, Protein, Fat

const NutritionMacrosChart = ({ data }) => {
  if (!data || data.length === 0) return <p>No nutrition data available</p>;

  // Aggregate macros
  const totals = data.reduce(
    (acc, log) => {
      acc.carbs += log.carbs || 0;
      acc.protein += log.protein || 0;
      acc.fat += log.fat || 0;
      return acc;
    },
    { carbs: 0, protein: 0, fat: 0 }
  );

  const chartData = [
    { name: "Carbs", value: totals.carbs },
    { name: "Protein", value: totals.protein },
    { name: "Fat", value: totals.fat },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Nutrition Macros</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionMacrosChart;
