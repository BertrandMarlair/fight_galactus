import React from "react";
import {withStyles, CircularProgress, makeStyles} from "@material-ui/core";
import style from "./LoadingStyle";
import classNames from "classnames";
import {useTheme} from "@material-ui/styles";

const Loading = ({classes, small, color, smallColor, absolute, smallCircular}) => {
    const theme = useTheme();

    const loadingClasses = classNames({
        [classes.inner]: true,
        [classes[color]]: color,
    });

    const loadingLoaderClasses = classNames({
        [classes.loader]: true,
        [classes[color]]: color,
    });

    const loadingContainer = classNames({
        [classes.container]: true,
        [classes.absolute]: absolute,
    });

    const useStylesFacebook = makeStyles({
        root: {
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        top: {
            color: "#eef3fd",
        },
        bottom: {
            color: theme.palette.link.dark,
            animationDuration: "550ms",
            position: "absolute",
            left: "calc(50% - 24px / 2)",
        },
    });

    const classesFacebook = useStylesFacebook();

    if (small) {
        return (
            <svg
                version="1.1"
                className={classes.loaderSmall}
                id="L4"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 0 0"
                xmlSpace="preserve">
                <circle
                    fill={smallColor ? theme.palette.primary.main : theme.palette.primary.contrastText}
                    stroke="none"
                    cx="6"
                    cy="50"
                    r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
                </circle>
                <circle
                    fill={smallColor ? theme.palette.primary.main : theme.palette.primary.contrastText}
                    stroke="none"
                    cx="26"
                    cy="50"
                    r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
                </circle>
                <circle
                    fill={smallColor ? theme.palette.primary.main : theme.palette.primary.contrastText}
                    stroke="none"
                    cx="46"
                    cy="50"
                    r="6">
                    <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
                </circle>
            </svg>
        );
    }

    if (smallCircular) {
        return (
            <div className={classesFacebook.root}>
                <CircularProgress
                    variant="determinate"
                    value={100}
                    className={classesFacebook.top}
                    size={24}
                    thickness={4}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    className={classesFacebook.bottom}
                    size={24}
                    thickness={4}
                />
            </div>
        );
    }

    return (
        <div className={loadingContainer}>
            <div className={loadingLoaderClasses}>
                <div className={loadingClasses}></div>
            </div>
        </div>
    );
};

export default withStyles(style)(Loading);
