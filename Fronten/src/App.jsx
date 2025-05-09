import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import { UserContextProvider } from "./UserContext/UserContextProvider"; // ✅ updated path
import ProtectedRoute from "./UserContext/ProtectedRoute"; // ✅ you missed this earlier
import Dashboard from "./Pages/Components/Dashborad/Dashbord.jsx";
import Dashboard_Layout from "./Pages/Components/Dashborad/Dashboard_Layout.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute requiredRole={["admin", "user"]}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path:'/profile',
          element: (
            <ProtectedRoute requiredRole={["admin", "user"]}>
              <Profile />
            </ProtectedRoute>
          ),
        },
      ],
    },

    {
      path: "/dashboard",
      element: <Dashboard_Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path:'',
          element: (
            <ProtectedRoute requiredRole="admin">
              
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    // ✅ Wrap RouterProvider with UserContextProvider
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
