// src/App.jsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import Setup from "./pages/Setup";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import MealLog from "./pages/MealLog";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import RedirectToSetup from "./components/RedirectToSetup";
import ProfileUpdate from "./components/UserProfile/UpdateProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/setup",
    element: (
      <ProtectedRoute>
        <Setup />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <RedirectToSetup>
          <Layout />
        </RedirectToSetup>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "meal-log",
        element: <MealLog />,
      },
      {
        path: "update",
        element: <ProfileUpdate />,
      }
    ],
    errorElement: <PageNotFound />,
  },
]);

export default function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ChakraProvider>
  );
}
