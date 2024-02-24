import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./scss/style.scss";
import ErrorPage from "./error-page.tsx";
import QueryMembers from "./query-member.tsx";
import RegistrationLogin from "./registration-login.tsx";
import HomePage from "./home-page.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/query-members",
    element: <QueryMembers />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration-login",
    element: <RegistrationLogin />,
    errorElement: <ErrorPage />
  },
  {
    path: "/home-page",
    element: <HomePage />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
