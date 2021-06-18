import {lazy} from "react";

const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Scanner = lazy(() => import("../scanner/Scanner"));
const Details = lazy(() => import("../details/Details"));

export const defaultRoute = "/app/dashboard";
export const name = "App";
export const slug = "app";

const dashboardRoutes = [
    {
        path: "/app/dashboard",
        name: "Dashboard",
        component: Dashboard,
        exact: true,
    },
    {
        path: "/app/scanner",
        name: "Scanner",
        component: Scanner,
        exact: true,
    },
    {
        path: "/app/details",
        name: "Details",
        component: Details,
        exact: true,
    },
];

export default dashboardRoutes;
