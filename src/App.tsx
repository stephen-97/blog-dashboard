import React from 'react'
import {routesItem} from "./utils/config";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "*",
        element: <Home/>
    },
])
const App = () => {


  return (
    <>
        <GlobalStyle />
        <div>
            <RouterProvider router={router} />
        </div>
    </>
  );
}

export default App;
