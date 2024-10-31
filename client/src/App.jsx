// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import MealLog from "./pages/MealLog";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "setup",
        element: <Setup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "meal-log",
        element: <MealLog />,
      },
    ],
    errorElement: <PageNotFound />,
  },
]);

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider> {/* Wrap with AuthProvider */}
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}
