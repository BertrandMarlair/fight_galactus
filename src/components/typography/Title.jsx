import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import withStyles from "@material-ui/core/styles/withStyles";

import typographyStyle from "./typographyStyle";

const Title = ({...props}) => {
    const {classes, children, centered, center, className, color, bold, normal, style, small} = props;

    const titleClasses = classNames({
        [classes.defaultFontStyle]: true,
        [classes.title]: true,
        [className]: true,
        [classes[color]]: color,
        [classes.center]: centered,
        [classes.center]: center,
        [classes.bold]: bold,
        [classes.normal]: normal,
        [classes.smaller]: small,
    });

    return (
        <div className={titleClasses} style={style}>
            {children}
        </div>
    );
};

Title.propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    center: PropTypes.bool,
    bold: PropTypes.bool,
    normal: PropTypes.bool,
    small: PropTypes.bool,
    color: PropTypes.oneOf(["primary", "secondary", "white", "success", "error", "warning", "contrasted"]),
};

export default withStyles(typographyStyle)(Title);
