import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/_layout";
import Dashboard from "../pages/dashboard/dashboard";
import SignIn from "../pages/sign-in/sign-in";



export const router = createBrowserRouter([
    {
        path: '/sign-in',
        element: <SignIn />,

    },
    {
        path: '',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Dashboard />
            }
        ]
    }
])