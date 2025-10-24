import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Home from "./features/pages/Home";
import Shop from "./features/pages/Shop";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/shop",
                element: <Shop />,
            },


        ],

    },
]);