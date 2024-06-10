import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AdminDashboardPage from "../Pages/AdminDashboardPage";
import NotFoundPage from "../Pages/NotFoundPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <NotFoundPage></NotFoundPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/adminDashboard',
                element: <AdminDashboardPage></AdminDashboardPage>
            }
        ]
    },
]);
export default router