import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ThemeProvider } from "./contexts/theme-context";
import Layout from "./routes/layout";
import NotFound from "./pages/NotFound";
import { useEffect, useState } from "react";
import axios from "./utils/axiosConfig";
import UserSignUp from "../posts/User_SignUp";
import UserLogin from "../posts/User_Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import QuizCatalog from "./components/QuizCatalog";
import CategoryQuizzes from "./pages/Dashboard/CategoryQuizzes";
import QuizSetup from "./components/QuizSetup";


const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Set up response interceptor for this component
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 500) {
          return Promise.reject(error);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      // Clean up interceptor
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // You might want to verify the token with your backend here
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Don't dispatch setUser here - let redux-persist handle it
    }
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/signup",
      element: <UserSignUp />,
    },
    {
      path: "/login",
      element: <UserLogin />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "quiz", 
          element: <QuizCatalog />,
        },
        {
          path: "categories/:categoryId",
          element: <CategoryQuizzes />,
        },
        {
          path: "quiz/setup/:quizId", 
          element: <QuizSetup />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
