import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import GlobalStyle from "./styles/GlobalStyle";
import CreateArticle from "./pages/CreateArticle";
import {ThemeProvider} from "styled-components";
import { Provider} from "react-redux";
import store from "./redux/store";

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

    const values = {
        dashboard_menu_desktop_width: '14',
        formSectionWidth:'45'
    }
    const styleTheming = {
        responsiveValue: `${parseInt(values.formSectionWidth)+parseInt(values.dashboard_menu_desktop_width)}rem`,
        mainColor: '#24242e',
        secondaryColor: '#f2f2f0',
        dashboard_menu_desktop_width: `${values.dashboard_menu_desktop_width}rem`,
        formSectionWidth: `${values.formSectionWidth}rem`
    }

    return (
        <ThemeProvider theme={styleTheming}>
            <GlobalStyle />
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </ThemeProvider>
    );
}

export default App;
