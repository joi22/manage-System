import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import AppLayout from "./AppLayout.jsx";
import Login from "./Dashbord/AuthPages/SignIn.jsx";
import Register from "./Dashbord/AuthPages/SignUp.jsx";
import { UserContext, UserContextProvider } from "./context/UserContextProvider.jsx";
import Home from "./Site/Home.jsx";
import { useContext } from "react";
import Blog from "./Site/Blog.jsx";
import WorkoutPage from "./Site/WorkoutPage.jsx";
import Dashboard from "./Dashbord/Dashboard.jsx";
import WorkoutList from "./Site/WorkoutList.jsx";
import OnboardingStepper from "./Site/OnboardingStepper.jsx";
import Profile from "./Site/Profile.jsx";
import Analytics from "./Dashbord/Analytics.jsx";
// import Dashboard_Layout from "./Pages/Components/Dashborad/Dashboard_Layout.jsx";
// import Profile from "./Pages/Profile.jsx";


function App() {
  const { user } = useContext(UserContext)
  const router = createBrowserRouter([
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },

    {
      path: "/",
      element: user ? <AppLayout /> : <Navigate to="/login" />,
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

            <Profile />
          ),
        },
        {
          path: '/blog',
          element: (

            <Analytics />
          ),
        },
        {
          path: '/workouts',
          element: (
            <OnboardingStepper />

          ),
        },
        {
          path: '/dashboard',
          element: (
            <Dashboard />

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
