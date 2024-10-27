import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import Home from "./pages/Home.jsx"
import { PageNotFound } from "./components/index.js";
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
