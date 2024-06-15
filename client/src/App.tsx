import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AppLayout from "./pages/AppLayout";
import Statistics from "./pages/Statistics";
import ContextPool from "./components/general.tsx/ContextPool";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <ContextPool />,
    children: [
      {
        path: "/",
        element: <Navigate to="/app/dashboard" />,
      },
      {
        path: "/app",
        element: <AppLayout />,
        children: [
          {
            path: "dashboard/:filters?",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/statistics",
        element: <Statistics />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
