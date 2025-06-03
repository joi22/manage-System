import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Login from "./Dashbord/AuthPages/SignIn.jsx";
import Register from "./Dashbord/AuthPages/SignUp.jsx";
import { UserContext, UserContextProvider } from "./context/UserContextProvider.jsx";
import ProtectedRoute from "./context/ProtectedRoute.jsx";
import Home from "./Site/Home.jsx";
import Profile from "./Site/Profile.jsx";
import { useContext } from "react";
import Blog from "./Site/Blog.jsx";
import WorkoutPage from "./Site/WorkoutPage.jsx";
import Dashboard from "./Dashbord/Dashboard.jsx";
import WorkoutList from "./Site/WorkoutList.jsx";
// import Dashboard_Layout from "./Pages/Components/Dashborad/Dashboard_Layout.jsx";
// import Profile from "./Pages/Profile.jsx";

function App() {
  const { user } = useContext(UserContext)
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    {
      path: "/",
      element:user? <AppLayout />:<Navigate to="/login"/>,
      children: [
        {
          index: true,
          element: (

            <Home />

          ),
        },
        {
          path: '/profile',
          element: (

            <WorkoutList />
          ),
        },
        {
          path: '/blog',
          element: (

            <Blog />
          ),
        },
        {
          path: '/workouts',
          element: (
            <WorkoutPage/>
          ),
        },
        {
          path: '/dashboard',
          element: (
            <Dashboard/>
          ),
        },
      ],
    },

    // {
    //   path: "/dashboard",
    //   element: <Dashboard_Layout />,
    //   children: [
    //     {
    //       index: true,
    //       element: (
    //         <ProtectedRoute requiredRole="admin">
    //           <Dashboard />
    //         </ProtectedRoute>
    //       ),
    //     },
    //     {
    //       path:'',
    //       element: (
    //         <ProtectedRoute requiredRole="admin">

    //         </ProtectedRoute>
    //       ),
    //     },
    //   ],
    // },
  ]);

  return (
    // ✅ Wrap RouterProvider with UserContextProvider
    <UserContextProvider>
      <RouterProvider router={router} />

    </UserContextProvider>
  );
}

export default App;
