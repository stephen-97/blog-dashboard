import React from 'react'
import {routesItem} from "./utils/config";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";
import CreateArticle from "./pages/CreateArticle";
import {ThemeProvider} from "styled-components";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "*",
        element: <Home/>
    },
    {
        path: "/create",
        element: <CreateArticle/>
    },
])


const App = () => {

  const styleTheming = {
      responsiveValue: '700px',
      bgColor: 'black'
  }

  return (
    <>
        <GlobalStyle />
        <div>
            <ThemeProvider theme={styleTheming}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    </>
  );
}

export default App;
