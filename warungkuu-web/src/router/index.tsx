import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import HealthDashboard from "../pages/monitor";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                index: true,
                element: <Navigate to="/dashboard" replace />
            },
            {
                path: "/dashboard",
                element: <Dashboard />
            },
            {
                path: "/health",
                element: <HealthDashboard />
            },
        ]
    }
]);