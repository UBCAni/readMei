import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./scss/style.scss";
import ErrorPage from "./error-page.tsx";
import GetMemberContainer from "./tool-pages/user-search/index/container.tsx";
import { getMemberApiCall } from "./tool-pages/user-search/index/api.ts";
import TemplatedTool from "./tool-pages/tool-template/index.tsx";
import EventManageMentView from "./tool-pages/events-management/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/member-search",
    element: <GetMemberContainer getMember={getMemberApiCall}/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/events-manage",
    element: <EventManageMentView></EventManageMentView>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tool-template",
    element: <TemplatedTool></TemplatedTool>,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
