import React from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/styles";
import style from "./BadgeStyle";
import PropTypes from "prop-types";

const Badge = ({children, className, classes, color, marginLeft, placement, small, textColor}) => {
    const badgeClasses = classNames({
        [classes[placement]]: placement,
        [className]: className,
        [classes.badge]: true,
        [classes.marginLeft]: marginLeft,
        [classes.small]: small,
    });

    return (
        <div className={badgeClasses} style={{backgroundColor: color, color: textColor}}>
            {children}
        </div>
    );
};

Badge.propTypes = {
    classes: PropTypes.object.isRequired,
    color: PropTypes.string,
    textColor: PropTypes.string,
    small: PropTypes.bool,
    placement: PropTypes.oneOf(["bottom-end", "bottom-start", "bottom", "top-end", "top-start", "top"]),
    size: PropTypes.oneOf(["big", "small", "smaller"]),
    className: PropTypes.string,
    marginLeft: PropTypes.bool,
};

export default withStyles(style)(Badge);
