// src/main.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Setup from "./pages/Setup.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; 
import './index.css';
import Profile from "./pages/Profile.jsx";
import MealLog from "./pages/MealLog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/setup",
    element: (
      <ProtectedRoute>
        <Setup />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
  }
  ,
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
  }
  ,
  {
    path: "/meal-log",
    element: (
      <ProtectedRoute>
        <MealLog />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
  }
  ]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
