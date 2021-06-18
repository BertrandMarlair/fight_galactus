import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import ErrorStyle from "./ErrorStyle";
import Text from "../typography/Text";
import classNames from "classnames";
import {slugify} from "../../core/utils/misc";

const CustomError = ({errorMessage, noPadding, classes, ...rest}) => {
    const errorClasses = classNames({
        [classes.container]: !noPadding,
    });

    if (errorMessage) {
        if (errorMessage.message) {
            if (errorMessage.message instanceof Array) {
                return (
                    <div className={errorClasses} {...rest}>
                        <Text noWrap color="error">
                            {slugify(errorMessage.message[0].message)}
                        </Text>
                    </div>
                );
            }
            return (
                <div className={errorClasses} {...rest}>
                    <Text noWrap color="error">
                        {slugify(errorMessage.message)}
                    </Text>
                </div>
            );
        } else if (typeof errorMessage === "string") {
            return (
                <div className={errorClasses} {...rest}>
                    <Text noWrap color="error">
                        {slugify(errorMessage)}
                    </Text>
                </div>
            );
        }
    }

    return <Fragment></Fragment>;
};

export default withStyles(ErrorStyle)(CustomError);
