import React from "react";
import style from "./DetailsStyle";
import {withStyles} from "@material-ui/styles";
import Title from "../../../components/typography/Title";

const Details = ({classes}) => {
    return (
        <div className={classes.root}>
            <div className={classes.titleWrapper}>
                <Title className={classes.title}>DETAILS</Title>
            </div>
        </div>
    );
};

export default withStyles(style)(Details);
