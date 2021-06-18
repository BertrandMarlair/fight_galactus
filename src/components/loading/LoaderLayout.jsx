import React from "react";

import {withStyles} from "@material-ui/core";

import style from "./LoadingStyle";
import Loading from "./Loading";

const LoaderLayout = ({classes}) => {
    return (
        <div className={classes.layout}>
            <div className={classes.body}>
                <Loading absolute />
            </div>
        </div>
    );
};

export default withStyles(style)(LoaderLayout);
