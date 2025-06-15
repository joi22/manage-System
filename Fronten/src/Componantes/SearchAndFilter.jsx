import { useState } from "react";

const SearchAndFilter = ({ onSearchAndFilter, availableCategories }) => {
  const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("All");

  const handleFilter = () => {
    onSearchAndFilter(searchText, filterBy);
  };

  return (
    <div className="flex items-center gap-4 flex-wrap bg-white p-4 rounded shadow">
      <input
        type="text"
        placeholder="Search workouts..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/2"
      />

      <select
        value={filterBy}
        onChange={(e) => setFilterBy(e.target.value)}
        className="border p-2 rounded"
      >
        {availableCategories.map((cat, idx) => (
          <option key={idx} value={cat}>{cat}</option>
        ))}
      </select>

      <button
        onClick={handleFilter}
        className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Apply
      </button>
    </div>
  );
};

export default SearchAndFilter;
