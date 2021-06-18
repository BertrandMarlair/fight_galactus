import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "./typographyStyle";

const SmallTitle = ({...props}) => {
    const {
        classes,
        children,
        centered,
        error,
        white,
        big,
        className,
        bold,
        normal,
        small,
        color,
        light,
        italic,
        hoverable,
        margin,
        minWidth,
        preWrap,
        noWrap,
    } = props;
    const normalClasses = classNames({
        [className]: className,
        [classes.defaultFontStyle]: true,
        [classes.smallTitleText]: true,
        [classes.error]: error,
        [classes.white]: white,
        [classes.big]: big,
        [classes.bold]: bold,
        [classes.normal]: normal,
        [classes.light]: light,
        [classes.small]: small,
        [classes.italic]: italic,
        [classes.hoverable]: hoverable,
        [classes.margin]: margin,
        [classes.minWidth]: minWidth,
        [classes.preWrap]: preWrap,
        [classes.preWrap]: centered,
        [classes.noWrap]: noWrap,
        [classes[color]]: color,
    });

    return <div className={normalClasses}>{children}</div>;
};

SmallTitle.propTypes = {
    classes: PropTypes.object.isRequired,
    error: PropTypes.bool,
    white: PropTypes.bool,
    big: PropTypes.bool,
    small: PropTypes.bool,
    bold: PropTypes.bool,
    normal: PropTypes.bool,
    light: PropTypes.bool,
    italic: PropTypes.bool,
    hoverable: PropTypes.bool,
    margin: PropTypes.bool,
    minWidth: PropTypes.bool,
    preWrap: PropTypes.bool,
    noWrap: PropTypes.bool,
    centered: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "secondary", "white", "success", "error", "warning", "contrasted"]),
};

export default withStyles(typographyStyle)(SmallTitle);
