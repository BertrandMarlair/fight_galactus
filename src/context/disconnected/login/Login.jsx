import React from "react";
import style from "./LoginStyle";
import {withStyles} from "@material-ui/styles";

const Login = ({classes}) => {
    return <div className={classes.root}>Login Page</div>;
};

export default withStyles(style)(Login);
