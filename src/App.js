import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from "../src/components/Home/Home"
import Details from './components/Details/Details';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>
    },
    {
      path: "contact/:id",
      element:<Details></Details>,
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}>

      </RouterProvider>    
    </div>
  );
}

export default App;
