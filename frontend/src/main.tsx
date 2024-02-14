import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./scss/style.scss";
import ErrorPage from "./error-page.tsx";
import QueryMember from "./query-member.tsx";
import RegistrationLogin from "./registration-login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/query-member",
    element: <QueryMember />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/registration-login",
    element: <RegistrationLogin />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
