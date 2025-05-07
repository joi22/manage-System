export default function TopNavbar({ toggleSidebar }) {
    return (
      <div className="bg-white shadow p-4 flex items-center justify-between z-30 relative">
        <button onClick={toggleSidebar} className="text-gray-700 text-xl font-bold">
          ☰
        </button>
        <h1 className="text-xl font-bold text-gray-800">Event Management</h1>
      </div>
    );
  }
  