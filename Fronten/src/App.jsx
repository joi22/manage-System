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
import WorkoutForm from "./Site/WorkoutForm.jsx";
import StepGoal from "./Site/pages/StepGoal.jsx";
import StepExperience from "./Site/pages/StepExperience.jsx";
import StepRoutine from "./Site/pages/StepRoutine.jsx";
import OnboardingStepper from "./Site/OnboardingStepper.jsx";
import Dashboard_Layout from "./Dashbord/Dashboard_Layout.jsx";
import Dashboard from "./Dashbord/Dashboard_Layout.jsx";
import Analytics from "./Dashbord/Analytics.jsx";


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

            <Blog />
          ),
        },
        {
          path: '/workouts',
          element: (
            <WorkoutForm />
          ),
        },
        {
          path: '/onboarding/goal',
          element: (
            <StepGoal />
          ),
        },
        {
          path: '/onboarding/experience',
          element: (
            <StepExperience />
          ),
        },
        {
          path: '/onboarding/routine',
          element: (
            <StepRoutine />
          ),
        },
        {
          path: '/onboarding/main',
          element: (
            <OnboardingStepper />
          ),
        },
      ],
    },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute requiredRole="admin">
          <Dashboard_Layout />
        </ProtectedRoute>
      ),
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
          path: "analytics", // example of a nested dashboard route
          element: (
            <ProtectedRoute requiredRole="admin">
              <Analytics />
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
