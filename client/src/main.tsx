import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import App from "./App.tsx";
import "./index.css";
import LoadingSpinner from "./components/ui/LoadingSpinner.tsx";
import AuthPage from "./pages/auth/AuthPage.tsx";
import Profile from "./pages/profile/Profile.tsx";
import Protected from "./components/protected/Protected.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Protected>
            <h1 className="text-3xl font-semibold text-center mt-20">Home</h1>
          </Protected>
        ),
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/profile",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="flex items-center justify-center h-screen text-3xl font-semibold">
        Not Found
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback=<LoadingSpinner />>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
