const ProgressSummary = ({ data }) => {
  if (!data) return <p>No progress logs found.</p>;

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-2">Latest Progress</h2>
      <p className="text-sm text-gray-600 mb-1">
        <strong>Date:</strong> {new Date(data.date).toLocaleDateString()}
      </p>

      <div className="mb-2">
        <strong>Weight:</strong> {data.weight} kg
      </div>

      {/* <div className="mb-2">
        <strong>Measurements:</strong>
        <ul className="list-disc pl-5 text-sm">
          {console.log(data,"this")}
          {data.measurements && Object.entries(data.measurements).map(([key, value]) => (
            <li key={key}>{key}: {value} cm</li>
          ))}
        </ul>
      </div>

      <div className="mb-2">
        <strong>Performance:</strong>
        <ul className="list-disc pl-5 text-sm">
          <li>Run Time: {data.performance?.runTime || 'N/A'}</li>
          <li>Lift Weight: {data.performance?.liftWeight || 'N/A'} kg</li>
          <li>Other: {data.performance?.other || 'N/A'}</li>
        </ul>
      </div> */}

      <p className="text-sm text-gray-700 mt-2"><strong>Notes:</strong> {data.notes || 'None'}</p>
    </div>
  );
};

export default ProgressSummary;
