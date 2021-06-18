import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "./typographyStyle";
//
const Normal = ({...props}) => {
    const {
        classes,
        children,
        centered,
        preWrap,
        white,
        small,
        caption,
        bold,
        normal,
        className,
        onClick,
        color,
        light,
        underline,
        ellipsis,
        hoverable,
        margin,
        noWrap,
        style,
    } = props;
    const normalClasses = classNames({
        [classes.defaultFontStyle]: true,
        [classes.normalText]: true,
        [classes.white]: white,
        [classes.small]: small,
        [classes.caption]: caption,
        [classes.bold]: bold,
        [classes.normal]: normal,
        [classes.light]: light,
        [classes.underline]: underline,
        [classes.ellipsis]: ellipsis,
        [classes.hoverable]: hoverable,
        [classes.margin]: margin,
        [classes.preWrap]: preWrap,
        [classes.preWrap]: centered,
        [classes[color]]: color,
        [classes.noWrap]: noWrap,
        [className]: className,
    });

    return (
        <div onClick={onClick} className={normalClasses} style={style}>
            {children}
        </div>
    );
};

Normal.propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    white: PropTypes.bool,
    small: PropTypes.bool,
    caption: PropTypes.bool,
    bold: PropTypes.bool,
    normal: PropTypes.bool,
    light: PropTypes.bool,
    underline: PropTypes.bool,
    ellipsis: PropTypes.bool,
    hoverable: PropTypes.bool,
    preWrap: PropTypes.bool,
    centered: PropTypes.bool,
    margin: PropTypes.bool,
    noWrap: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "white",
        "success",
        "error",
        "warning",
        "link",
        "contrasted",
        "default",
    ]),
};

export default withStyles(typographyStyle)(Normal);
