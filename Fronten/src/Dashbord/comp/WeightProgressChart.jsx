import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const WeightProgressChart = ({ data }) => {
    if (!data || data.length === 0) return <p>No weight progress data available.</p>;

    // Data should be sorted by date ascending
    const chartData = data.slice().sort((a, b) => new Date(a.date) - new Date(b.date)).map((entry) => ({
        date: new Date(entry.date).toLocaleDateString(),
        weight: entry.weight,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} unit=" kg" />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default WeightProgressChart;
