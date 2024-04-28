import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import MailVerify from "./Component/MailVerify";
import Admin from "./Component/Admin";
import ProtectedRoute from "./Component/ProtectedRoutes";

const AppLayout = () => (
  <>
    <Outlet />
  </>
);

const AppProvider = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/verify/:token",
        element: <MailVerify />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home/admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={AppProvider} />);
