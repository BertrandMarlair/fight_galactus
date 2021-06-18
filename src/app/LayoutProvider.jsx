/* eslint-disable no-case-declarations */
import React, {useMemo, useEffect, lazy} from "react";

import {withRouter, Redirect, Switch} from "react-router-dom";
import {useSnackbar} from "notistack";

import "../core/style/style.css";
import {SNACKBAR_EVENT} from "../core/constants";

import globalRoute from "../context/global/config/router";
import {defaultRoute as globalDefaultRoute} from "../context/global/config/router";

import publicRoute from "../context/public/config/router";
import {defaultRoute as publicDefaultRoute} from "../context/public/config/router";

import disconnectedRoute from "../context/disconnected/config/router";
import {defaultRoute as disconnectedDefaultRoute} from "../context/disconnected/config/router";

import NotFound from "../context/public/notFound/NotFound";

import {EventEmitter} from "../core/events/events";

import {withStyles} from "@material-ui/core";
import style from "./Style";
import {compose} from "redux";

const LayoutProvider = ({location, classes}) => {
    const layoutContainerTarget = useMemo(() => location.pathname.replace("/", "").split("/")[0], [location.pathname]);

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();

    useEffect(() => {
        EventEmitter.subscribe(SNACKBAR_EVENT, (notify) => {
            const {text, params} = notify;

            enqueueSnackbar(text, {...params, action: (key) => params.action(closeSnackbar, key)});
        });

        return () => {
            EventEmitter.remove(SNACKBAR_EVENT);
        };
        // eslint-disable-next-line
    }, [enqueueSnackbar]);

    // ./ckeditor

    const renderLayout = useMemo(() => {
        if (layoutContainerTarget === "app") {
            const Layout = lazy(() => import("../context/global/config/Layout"));
            const Provider = lazy(() => import("../context/global/config/Provider"));

            return (
                <Layout>
                    <Switch>
                        {globalRoute.map((params, index) => (
                            <Provider {...params} key={`dynamicRoute${index}`} />
                        ))}
                        <Redirect to={globalDefaultRoute} />
                    </Switch>
                </Layout>
            );
        } else if (layoutContainerTarget === "connect") {
            const Layout = lazy(() => import("../context/disconnected/config/Layout"));
            const Provider = lazy(() => import("../context/disconnected/config/Provider"));

            return (
                <Layout>
                    <Switch>
                        {disconnectedRoute.map((params, index) => (
                            <Provider {...params} key={`dynamicRoute${index}`} />
                        ))}
                        <Redirect to={disconnectedDefaultRoute} />
                    </Switch>
                </Layout>
            );
        } else if (layoutContainerTarget === "home") {
            const Layout = lazy(() => import("../context/public/config/Layout"));
            const Provider = lazy(() => import("../context/public/config/Provider"));

            return (
                <Layout>
                    <Switch>
                        {publicRoute.map((params, index) => (
                            <Provider {...params} key={`dynamicRoute${index}`} />
                        ))}
                        <Redirect to={publicDefaultRoute} />
                    </Switch>
                </Layout>
            );
        }
        return <NotFound />;
    }, [layoutContainerTarget]);

    return <main className={classes.root}>{renderLayout}</main>;
};

export default compose(withStyles(style), withRouter)(LayoutProvider);
