/* eslint-disable no-unused-vars */
import React, {Fragment, useState, useEffect} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";

import LayoutProvider from "./LayoutProvider";
import NoInternetConnection from "../components/noInternetConnection/NoInternetConnection";

const RouteProvider = (props) => {
    const layoutContainerTarget = window.location.pathname.replace("/", "").split("/")[0];

    useEffect(() => {
        console.log(layoutContainerTarget);
        if (!["connect"].includes(layoutContainerTarget)) {
            console.log("check authentication");
        }
    }, [layoutContainerTarget]);

    return (
        <Fragment>
            <NoInternetConnection />
            <Router basename={process.env.PUBLIC_URL}>
                <Switch>
                    <LayoutProvider {...props} />
                </Switch>
            </Router>
        </Fragment>
    );
};

export default RouteProvider;
