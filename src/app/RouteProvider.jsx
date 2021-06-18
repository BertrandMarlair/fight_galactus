/* eslint-disable no-unused-vars */
import React, {Fragment, useState, useEffect} from "react";
import {BrowserRouter as Router, Switch} from "react-router-dom";

import LayoutProvider from "./LayoutProvider";
import NoInternetConnection from "../components/noInternetConnection/NoInternetConnection";
import {useDispatch} from "react-redux";
import LoaderScreen from "../components/loading/LoaderScreen";
import {useHistory} from "react-router-dom";

const RouteProvider = (props) => {
    // const dispatch = useDispatch();
    // const logout = () => dispatch({type: "LOGOUT"});
    // const [loaded, setLoaded] = useState(false);

    // const history = useHistory();

    const layoutContainerTarget = window.location.pathname.replace("/", "").split("/")[0];

    useEffect(() => {
        console.log(layoutContainerTarget);
        if (!["connect"].includes(layoutContainerTarget)) {
            console.log("check authentication");
        }
    }, [layoutContainerTarget]);

    // useEffect(() => {
    //     if (data?.checkAuthUser?.id) {
    //         console.log(data.checkAuthUser);
    //         setLoaded(true);
    //     }
    //     if (error) {
    //         console.log(error);
    //         logout();
    //         window.location = "/connect/login";
    //     }
    // }, [data, error, history]);

    return (
        <Fragment>
            {/* {loading && <LoaderScreen />}
            {!loaded && <LoaderScreen />} */}
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
