import {lazy} from "react";

const Login = lazy(() => import("../login/Login"));

export const defaultRoute = "/connect/login";
export const name = "Disconnected";
export const slug = "disconnected";

const connectRoutes = [
    {
        path: "/connect/login",
        name: "Login",
        component: Login,
        exact: true,
        breadCrumbs: [{name: "Login", url: "/connect/login"}],
    },
];

export default connectRoutes;
