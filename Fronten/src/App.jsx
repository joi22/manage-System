import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './AppLayout.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Auth/Login.jsx';
import Register from './Pages/Auth/Register.jsx';
function App() {
  const router = createBrowserRouter([
    { path: 'login', element: <Login /> },
    { path: 'register', element: <Register /> },
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: '/', element: <Home /> },
      ]
    }
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
