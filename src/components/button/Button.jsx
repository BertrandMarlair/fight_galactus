import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import style from "./ButtonStyle";
import Loading from "../loading/Loading";

const CustomButton = (props) => {
    const {
        children,
        classes,
        className,
        muiClasses,
        color,
        round,
        fullWidth,
        loading,
        centered,
        size,
        noMargin,
        blank,
        container,
        noBorder,
        noMinWidth,
        icon,
        iconSmall,
        disabled,
        ...rest
    } = props;

    const btnClasses = classNames({
        [classes.button]: true,
        [classes[color]]: color,
        [classes.round]: round,
        [classes.fullWidth]: fullWidth,
        [classes.centered]: centered,
        [classes.blank]: blank,
        [classes[size]]: size,
        [classes.noMargin]: noMargin,
        [classes.noBorder]: noBorder,
        [classes.icon]: icon,
        [classes.iconSmall]: iconSmall,
        [classes.noMinWidth]: noMinWidth,
        [classes.disabled]: disabled,
        [className]: className,
    });

    const containerClasses = classNames({
        [classes.container]: true,
        [container]: container,
        [classes.fullWidth]: fullWidth,
    });

    return (
        <div className={containerClasses} data-test-id={rest["data-test-id"]}>
            <Button {...rest} classes={muiClasses} className={btnClasses} disabled={disabled}>
                {loading && <Loading button small />}
                {children}
            </Button>
        </div>
    );
};

CustomButton.propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    container: PropTypes.string,
    muiClasses: PropTypes.object,
    round: PropTypes.bool,
    fullWidth: PropTypes.bool,
    noMargin: PropTypes.bool,
    noMinWidth: PropTypes.bool,
    noBorder: PropTypes.bool,
    centered: PropTypes.bool,
    blank: PropTypes.bool,
    icon: PropTypes.bool,
    iconSmall: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    size: PropTypes.oneOf(["sm", "lg"]),
    color: PropTypes.oneOf([
        "primary",
        "lightPrimary",
        "secondary",
        "error",
        "success",
        "warning",
        "disabled",
        "link",
        "white",
        "errorInverted",
        "transparent",
        "successLight",
    ]),
};

export default withStyles(style)(CustomButton);
