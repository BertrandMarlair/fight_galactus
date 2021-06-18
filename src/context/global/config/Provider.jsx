import React from "react";
import {Route} from "react-router-dom";
import {Redirect} from "react-router-dom";

import isAuthenticated from "../../../core/auth/isAuthenticated";

const Provider = ({component: Component, ...rest}) => {
    const checkAuth = () => {
        if (isAuthenticated()) {
            return <Route {...rest} render={(props) => <Component {...props} />} />;
        }
        return <Redirect to="/" />;
    };

    return checkAuth();
};

export default Provider;
