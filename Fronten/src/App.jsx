import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Auth/Login.jsx";
import Register from "./Pages/Auth/Register.jsx";
import ProtectedRoute from "./UserContext/ProtectedRoute.jsx";
import Dashboard from "./Pages/Components/Dashborad/Dashbord.jsx";
import Dashboard_Layout from "./Pages/Components/Dashborad/Dashboard_Layout.jsx";

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
            <ProtectedRoute requiredRole="admin">
              <Home />
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
            <ProtectedRoute requiredRole="admin" >
              <Dashboard />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  


  return <RouterProvider router={router} />;
}

export default App;
