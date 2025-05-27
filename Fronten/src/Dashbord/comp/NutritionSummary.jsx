import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]; // You can tweak these

const NutritionSummary = ({ data }) => {
  if (!data) return <div className="bg-white p-4 rounded shadow">No nutrition data</div>;

  const macroTotals = data.meals?.reduce(
    (acc, meal) => {
      acc.protein += meal.protein || 0;
      acc.carbs += meal.carbs || 0;
      acc.fat += meal.fat || 0;
      return acc;
    },
    { protein: 0, carbs: 0, fat: 0 }
  );

  const chartData = [
    { name: "Protein", value: macroTotals.protein },
    { name: "Carbs", value: macroTotals.carbs },
    { name: "Fat", value: macroTotals.fat }
  ];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Nutrition Summary</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionSummary;
