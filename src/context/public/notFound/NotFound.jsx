import React from "react";

import isAuthenticated from "../../../core/auth/isAuthenticated";
import {Redirect} from "react-router-dom";

const NoMatch = () => {
    const redirect = () => {
        if (isAuthenticated()) {
            return <Redirect to={"/app/dashboard"} />;
        }
        return <Redirect to={"/connect/login"} />;
    };

    return redirect();
};

export default NoMatch;
