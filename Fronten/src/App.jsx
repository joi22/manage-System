import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from './AppLayout.jsx';
import Home from './Pages/Home';
import Login from './Pages/Auth/Login.jsx';
import Register from './Pages/Auth/Register.jsx';
function App() {
const router = createBrowserRouter([
  {
    path:"/auth",
    children: [
      {path:'login', element:<Login/>},
      {path:'register', element:<Register/>},
    ]
  }
  ,{
  path:"/",
  element:<AppLayout />,
  children: [
    {path:'/', element:<Home/>, index:true},
  ]
}])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
